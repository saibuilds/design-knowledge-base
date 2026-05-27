#!/usr/bin/env node
/**
 * Design KB Refresher
 * Run: npm run refresh
 * Fetches latest component lists from registries and updates MD files.
 * Respects rate limits (1.1s between requests).
 */

const https = require('https')
const fs = require('fs')
const path = require('path')

const MD_DIR = path.join(__dirname, '..')
const DELAY = 1100

const args = process.argv.slice(2)
const onlyFilter = args.find(a => a.startsWith('--only='))?.split('=')[1]

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

function fetch(url) {
  return new Promise((resolve, reject) => {
    const opts = { headers: { 'User-Agent': 'design-kb-refresher/1.0', 'Accept': 'application/json' } }
    https.get(url, opts, (res) => {
      if ([301, 302].includes(res.statusCode)) return fetch(res.headers.location).then(resolve).catch(reject)
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => resolve({ status: res.statusCode, body: data }))
    }).on('error', reject)
  })
}

/**
 * Check MagicUI registry for new components
 */
async function refreshMagicUI() {
  console.log('\n[MagicUI] Checking for new components...')
  try {
    const { body } = await fetch('https://magicui.design/r/index.json')
    const registry = JSON.parse(body)
    const names = registry.map(c => c.name).sort()

    const installList = names.map(n => `npx shadcn@latest add "https://magicui.design/r/${n}"`).join('\n')

    const mdPath = path.join(MD_DIR, 'components', 'magicui.md')
    const current = fs.readFileSync(mdPath, 'utf8')
    const updated = current.replace(
      /## Install\n```bash[\s\S]*?```/,
      `## Install\n\`\`\`bash\n# All ${names.length} components:\n${installList}\n\`\`\``
    )
    if (updated !== current) {
      fs.writeFileSync(mdPath, updated)
      console.log(`  [MagicUI] Updated: found ${names.length} components`)
    } else {
      console.log(`  [MagicUI] Up to date (${names.length} components)`)
    }
  } catch (e) {
    console.error('  [MagicUI] Error:', e.message)
  }
}

/**
 * Check Aceternity registry for new components
 */
async function refreshAceternity() {
  console.log('\n[Aceternity] Checking registry...')
  await sleep(DELAY)
  try {
    const { body } = await fetch('https://ui.aceternity.com/registry/index.json')
    const registry = JSON.parse(body)
    console.log(`  [Aceternity] Found ${registry.length} components`)
  } catch (e) {
    console.error('  [Aceternity] Error:', e.message)
  }
}

/**
 * Log last updated timestamp to each MD file header
 */
async function updateTimestamps() {
  console.log('\n[Timestamps] Updating last-refreshed dates...')
  const now = new Date().toISOString().split('T')[0]

  const mdFiles = findMdFiles(MD_DIR)
  let updated = 0
  for (const file of mdFiles) {
    if (file.includes('scraper')) continue
    const content = fs.readFileSync(file, 'utf8')
    if (content.startsWith('# ') && !content.includes('_Last refreshed:')) {
      const firstLine = content.split('\n')[0]
      const newContent = `${firstLine}\n_Last refreshed: ${now}_\n\n` + content.slice(firstLine.length + 1)
      fs.writeFileSync(file, newContent)
      updated++
    }
  }
  console.log(`  Updated ${updated} files`)
}

function findMdFiles(dir) {
  const results = []
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name)
    if (f.isDirectory() && f.name !== 'node_modules') results.push(...findMdFiles(full))
    else if (f.name.endsWith('.md')) results.push(full)
  }
  return results
}

/**
 * Generate/update the master index
 */
async function generateIndex() {
  console.log('\n[Index] Generating README.md...')
  const now = new Date().toISOString().split('T')[0]

  const sections = {
    components: ['21st-dev', 'magicui', 'aceternity', 'shadcn', 'tailwind-blocks'],
    animations: ['gsap', 'framer-motion', 'lenis', 'locomotive'],
    '3d': ['spline', 'r3f', 'shaders'],
    'reference-sites/agencies': ['lusion', 'active-theory'],
    'reference-sites/industry': ['real-estate', 'construction', 'saas'],
    frameworks: ['nextjs', 'supabase'],
    'assets/icons': ['lucide-phosphor'],
    'assets/fonts': ['pairings'],
    'assets/colors': ['palettes'],
  }

  let readme = `# Web Design Knowledge Base\n_Updated: ${now}_\n\n`
  readme += `> Local design library for Claude Code. Reference with: \`~/web-design-knowledge/md/[file].md\`\n\n`
  readme += `## Quick Usage\n\`\`\`\nBuild a real estate hero for MottaKitchen. Reference:\n- md/reference-sites/industry/construction.md for layout patterns\n- md/components/magicui.md for animated components  \n- md/animations/gsap.md for scroll animations\n- md/3d/spline.md for hero 3D scene\n\`\`\`\n\n`

  for (const [section, files] of Object.entries(sections)) {
    readme += `## ${section.replace(/-/g, ' ').replace(/\//g, ' › ')}\n`
    for (const f of files) {
      const filePath = path.join(MD_DIR, section, `${f}.md`)
      if (fs.existsSync(filePath)) {
        const firstLine = fs.readFileSync(filePath, 'utf8').split('\n')[0].replace('# ', '')
        readme += `- [${f}](./${section}/${f}.md) — ${firstLine}\n`
      }
    }
    readme += '\n'
  }

  readme += `## Refresh\n\`\`\`bash\nnpm run refresh  # Update all\nnpm run refresh:components  # Components only\n\`\`\`\n`

  fs.writeFileSync(path.join(MD_DIR, 'README.md'), readme)
  console.log('  README.md updated')
}

async function main() {
  console.log('Design KB Refresher — starting...')
  console.log(`Filter: ${onlyFilter || 'all'}`)

  if (!onlyFilter || onlyFilter === 'components') {
    await refreshMagicUI()
    await sleep(DELAY * 2)
    await refreshAceternity()
    await sleep(DELAY)
  }

  await generateIndex()
  // await updateTimestamps()  // uncomment to add last-refreshed to all files

  console.log('\n✓ Done!')
}

main().catch(console.error)
