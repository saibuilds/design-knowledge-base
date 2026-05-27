"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const NEIGHBOURHOODS = [
  "Etobicoke",
  "Scarborough",
  "North York",
  "Mississauga",
  "Vaughan",
  "Brampton",
  "Downtown",
  "Midtown",
];

interface OrbLabel {
  text: string;
  theta: number; // polar angle from top
  phi: number;   // azimuthal angle
  x: number;
  y: number;
  z: number;
  screenX: number;
  screenY: number;
  scale: number;
  alpha: number;
}

interface NeighbourhoodOrb3DProps {
  onSelect?: (neighbourhood: string | null) => void;
  selected?: string | null;
  className?: string;
}

export default function NeighbourhoodOrb3D({
  onSelect,
  selected,
  className = "",
}: NeighbourhoodOrb3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rotationRef = useRef({ y: 0, x: 0.25 });
  const dragRef = useRef({ dragging: false, lastX: 0, lastY: 0 });
  const labelsRef = useRef<OrbLabel[]>([]);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [localSelected, setLocalSelected] = useState<string | null>(selected ?? null);

  const RADIUS = 130;
  const AUTO_SPIN = 0.004;

  const buildLabels = useCallback((): OrbLabel[] => {
    return NEIGHBOURHOODS.map((text, i) => {
      const phi = (i / NEIGHBOURHOODS.length) * Math.PI * 2;
      const theta = (Math.PI / (NEIGHBOURHOODS.length + 1)) * (i % 4 + 1.5);
      const thetaAlt = i % 2 === 0 ? theta : Math.PI - theta;
      return {
        text,
        theta: thetaAlt,
        phi,
        x: 0, y: 0, z: 0,
        screenX: 0, screenY: 0,
        scale: 1,
        alpha: 1,
      };
    });
  }, []);

  useEffect(() => {
    labelsRef.current = buildLabels();
  }, [buildLabels]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const getCenter = () => ({ cx: canvas.width / 2, cy: canvas.height / 2 });

    let hovered: string | null = null;

    const project = (x: number, y: number, z: number) => {
      const fov = 350;
      const scale = fov / (fov + z + RADIUS * 0.5);
      const { cx, cy } = getCenter();
      return {
        sx: cx + x * scale,
        sy: cy + y * scale,
        scale,
        z,
      };
    };

    const draw = () => {
      if (!dragRef.current.dragging) {
        rotationRef.current.y += AUTO_SPIN;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Orb glow
      const { cx, cy } = getCenter();
      const grd = ctx.createRadialGradient(cx, cy, 10, cx, cy, RADIUS * 1.1);
      grd.addColorStop(0, "rgba(201,169,110,0.07)");
      grd.addColorStop(0.6, "rgba(201,169,110,0.03)");
      grd.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, RADIUS * 1.1, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Wireframe sphere rings
      ctx.strokeStyle = "rgba(201,169,110,0.08)";
      ctx.lineWidth = 0.8;
      for (let lat = -60; lat <= 60; lat += 30) {
        const r = RADIUS * Math.cos((lat * Math.PI) / 180);
        const yOff = RADIUS * Math.sin((lat * Math.PI) / 180);
        ctx.beginPath();
        ctx.ellipse(cx, cy + yOff, r, r * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Rotate and project labels
      const ry = rotationRef.current.y;
      const rx = rotationRef.current.x;

      const projected = labelsRef.current.map((lbl) => {
        const sinT = Math.sin(lbl.theta);
        const cosT = Math.cos(lbl.theta);
        const sinP = Math.sin(lbl.phi + ry);
        const cosP = Math.cos(lbl.phi + ry);
        const sinRX = Math.sin(rx);
        const cosRX = Math.cos(rx);

        let x = RADIUS * sinT * sinP;
        let y = RADIUS * cosT;
        let z = RADIUS * sinT * cosP;

        // Apply X rotation
        const y2 = y * cosRX - z * sinRX;
        const z2 = y * sinRX + z * cosRX;

        const proj = project(x, y2, z2);
        return { ...lbl, screenX: proj.sx, screenY: proj.sy, scale: proj.scale, z: z2 };
      });

      // Sort by z (back to front)
      projected.sort((a, b) => a.z - b.z);

      for (const lbl of projected) {
        const isFront = lbl.z > -RADIUS * 0.1;
        const alpha = isFront ? Math.min(1, (lbl.z / RADIUS + 1) * 0.8) : 0.12;
        const isSelected = lbl.text === localSelected;
        const isHov = lbl.text === hovered;
        const fontSize = Math.max(9, Math.min(15, 12 * lbl.scale));

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.font = `${isSelected ? "700" : isHov ? "600" : "400"} ${fontSize}px 'Inter', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (isSelected) {
          ctx.fillStyle = "#c9a96e";
          ctx.shadowColor = "#c9a96e";
          ctx.shadowBlur = 12;
        } else if (isHov) {
          ctx.fillStyle = "#e8c98a";
          ctx.shadowColor = "rgba(201,169,110,0.6)";
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = isFront ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)";
          ctx.shadowBlur = 0;
        }

        ctx.fillText(lbl.text, lbl.screenX, lbl.screenY);

        // Dot marker
        ctx.beginPath();
        ctx.arc(lbl.screenX, lbl.screenY + fontSize * 0.8, 2 * lbl.scale, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? "#c9a96e" : "rgba(201,169,110,0.4)";
        ctx.shadowBlur = 0;
        ctx.fill();

        ctx.restore();
      }

      labelsRef.current = projected;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    // Mouse/touch events
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (dragRef.current.dragging) {
        const dx = e.clientX - dragRef.current.lastX;
        const dy = e.clientY - dragRef.current.lastY;
        rotationRef.current.y += dx * 0.01;
        rotationRef.current.x += dy * 0.005;
        rotationRef.current.x = Math.max(-0.8, Math.min(0.8, rotationRef.current.x));
        dragRef.current.lastX = e.clientX;
        dragRef.current.lastY = e.clientY;
        return;
      }

      let found: string | null = null;
      for (const lbl of labelsRef.current) {
        const dist = Math.hypot(mx - lbl.screenX, my - lbl.screenY);
        if (dist < 30) { found = lbl.text; break; }
      }
      hovered = found;
      setHoveredLabel(found);
      canvas.style.cursor = found ? "pointer" : "grab";
    };

    const onMouseDown = (e: MouseEvent) => {
      dragRef.current = { dragging: true, lastX: e.clientX, lastY: e.clientY };
      canvas.style.cursor = "grabbing";
    };

    const onMouseUp = () => {
      dragRef.current.dragging = false;
      canvas.style.cursor = "grab";
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (const lbl of labelsRef.current) {
        const dist = Math.hypot(mx - lbl.screenX, my - lbl.screenY);
        if (dist < 30) {
          const next = lbl.text === localSelected ? null : lbl.text;
          setLocalSelected(next);
          onSelect?.(next);
          return;
        }
      }
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("click", onClick);
    canvas.style.cursor = "grab";

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("click", onClick);
      ro.disconnect();
    };
  }, [localSelected, onSelect]);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: 340, display: "block", background: "transparent" }}
      />
      <motion.p
        className="text-center text-xs text-gray-500 mt-2"
        animate={{ opacity: hoveredLabel ? 1 : 0.4 }}
      >
        {hoveredLabel
          ? `Click to filter by ${hoveredLabel}`
          : localSelected
          ? `Filtering: ${localSelected} — click again to clear`
          : "Drag to rotate · Click a neighbourhood to filter"}
      </motion.p>
    </div>
  );
}
