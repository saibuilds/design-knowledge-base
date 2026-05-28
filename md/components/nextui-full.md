# NextUI — Full Component Reference

> Scraped: 2026-05-28T13:53:25.628Z
> Total: 12

---

## accordion
> Source: https://nextui.org/docs/components/accordion
> Dependencies: @heroui/react

```tsx
import { Accordion } from '@heroui/react';
export default () => (
  <Accordion>
    <Accordion.Item>
      <Accordion.Heading>
        <Accordion.Trigger>
          <Accordion.Indicator />
        </Accordion.Trigger>
      </Accordion.Heading>
      <Accordion.Panel>
        <Accordion.Body/>
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
)
```

---

## autocomplete
> Source: https://nextui.org/docs/components/autocomplete
> Dependencies: @heroui/react

```tsx
import {Autocomplete, SearchField, ListBox} from "@heroui/react";
function CustomAutocomplete() {
  return (
    <Autocomplete className="w-full">
      <Label>State</Label>
      <Autocomplete.Trigger className="rounded-lg border bg-surface p-2">
        <Autocomplete.Value />
        <Autocomplete.ClearButton />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter>
          <SearchField>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search..." />
            </SearchField.Group>
          </SearchField>
          <ListBox>
            <ListBox.Item id="1" textValue="Item 1" className="hover:bg-surface-secondary">
              Item 1
            </ListBox.Item>
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  );
}
```

---

## chip
> Source: https://nextui.org/docs/components/chip
> Dependencies: @heroui/react

```tsx
import {Chip} from '@heroui/react';
function CustomChip() {
  return (
    <Chip className="rounded-full px-4 py-2 font-bold">
      <Chip.Label className="text-lg uppercase">
        Custom Styled
      </Chip.Label>
    </Chip>
  );
}
```

---

## date-picker
> Source: https://nextui.org/docs/components/date-picker
> Dependencies: @heroui/react

```tsx
import {Calendar, DateField, DatePicker, Label} from '@heroui/react';
export default () => (
  <DatePicker>
    <Label />
    <DateField.Group>
      <DateField.Input>
        {(segment) => <DateField.Segment segment={segment} />}
      </DateField.Input>
      <DateField.Suffix>
        <DatePicker.Trigger>
          <DatePicker.TriggerIndicator />
        </DatePicker.Trigger>
      </DateField.Suffix>
    </DateField.Group>
    <DatePicker.Popover>
      <Calendar aria-label="Choose date">
        <Calendar.Header>
          <Calendar.YearPickerTrigger>
            <Calendar.YearPickerTriggerHeading />
            <Calendar.YearPickerTriggerIndicator />
          </Calendar.YearPickerTrigger>
          <Calendar.NavButton slot="previous" />
          <Calendar.NavButton slot="next" />
        </Calendar.Header>
        <Calendar.Grid>
          <Calendar.GridHeader>
            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
        </Calendar.Grid>
      </Calendar>
    </DatePicker.Popover>
  </DatePicker>
)
```

---

## date-range-picker
> Source: https://nextui.org/docs/components/date-range-picker
> Dependencies: @heroui/react

```tsx
import {DateField, DateRangePicker, Label, RangeCalendar} from '@heroui/react';
export default () => (
  <DateRangePicker>
    <Label />
    <DateField.Group>
      <DateField.InputContainer>
        <DateField.Input slot="start">
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateRangePicker.RangeSeparator />
        <DateField.Input slot="end">
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
      </DateField.InputContainer>
      <DateField.Suffix>
        <DateRangePicker.Trigger>
          <DateRangePicker.TriggerIndicator />
        </DateRangePicker.Trigger>
      </DateField.Suffix>
    </DateField.Group>
    <DateRangePicker.Popover>
      <RangeCalendar aria-label="Choose trip dates">
        <RangeCalendar.Header>
          <RangeCalendar.YearPickerTrigger>
            <RangeCalendar.YearPickerTriggerHeading />
            <RangeCalendar.YearPickerTriggerIndicator />
          </RangeCalendar.YearPickerTrigger>
          <RangeCalendar.NavButton slot="previous" />
          <RangeCalendar.NavButton slot="next" />
        </RangeCalendar.Header>
        <RangeCalendar.Grid>
          <RangeCalendar.GridHeader>
            {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
          </RangeCalendar.GridHeader>
          <RangeCalendar.GridBody>{(date) => <RangeCalendar.Cell date={date} />}</RangeCalendar.GridBody>
        </RangeCalendar.Grid>
      </RangeCalendar>
    </DateRangePicker.Popover>
  </DateRangePicker>
)
```

---

## drawer
> Source: https://nextui.org/docs/components/drawer
> Dependencies: @heroui/react

```tsx
import { Drawer, Button } from "@heroui/react";
function CustomDrawer() {
  return (
    <Drawer>
      <Button>Open Drawer</Button>
      <Drawer.Backdrop className="bg-black/80">
        <Drawer.Content>
          <Drawer.Dialog className="bg-linear-to-br from-purple-500 to-pink-500 text-white">
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Custom Styled Drawer</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <p>This drawer has custom styling applied via Tailwind classes.</p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button slot="close">Close</Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
```

---

## dropdown
> Source: https://nextui.org/docs/components/dropdown
> Dependencies: @heroui/react

```tsx
import { Dropdown, Button, Label } from '@heroui/react';
<Dropdown>
  <Button aria-label="Menu" variant="secondary">
    Share
  </Button>
  <Dropdown.Popover>
    <Dropdown.Menu onAction={(key) => alert(`Selected: ${key}`)}>
      <Dropdown.Item id="copy-link" textValue="Copy Link">
        <Label>Copy Link</Label>
      </Dropdown.Item>
      <Dropdown.SubmenuTrigger>
        <Dropdown.Item id="share" textValue="Share">
          <Label>Other</Label>
          <Dropdown.SubmenuIndicator />
        </Dropdown.Item>
        <Dropdown.Popover>
          <Dropdown.Menu>
            <Dropdown.Item id="whatsapp" textValue="WhatsApp">
              <Label>WhatsApp</Label>
            </Dropdown.Item>
            <Dropdown.Item id="telegram" textValue="Telegram">
              <Label>Telegram</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown.SubmenuTrigger>
    </Dropdown.Menu>
  </Dropdown.Popover>
</Dropdown>
```

---

## input
> Source: https://nextui.org/docs/components/input

```tsx
@layer components {
  .input {
    @apply rounded-lg border border-border bgsurface px-4 py-2 text-sm shadow-sm transition-colors;
    &:hover,
    &[data-hovered="true"] {
      @apply bg-surface-secondary border-border/80;
    }
    &:focus-visible,
    &[data-focus-visible="true"] {
      @apply border-primary ring-2 ring-primary/20;
    }
    &[data-invalid="true"] {
      @apply border-danger bg-danger-50/10 text-danger;
    }
  }
}
```

---

## kbd
> Source: https://nextui.org/docs/components/kbd
> Dependencies: @heroui/react

```tsx
import { Kbd } from "@heroui/react";
function CustomKbd() {
  return (
    <Kbd className="bg-gray-100 dark:bg-gray-800">
      <Kbd.Content>K</Kbd.Content>
    </Kbd>
  );
}
```

---

## link
> Source: https://nextui.org/docs/components/link
> Dependencies: next/link

```tsx
import NextLink from 'next/link';
// Apply classes directly with Tailwind utilities
export default function Demo() {
  return (
    <NextLink href="/about" className="link underline-offset-2">
      About Page
    </NextLink>
  );
}
// Or with a native anchor
export default function NativeLink() {
  return (
    <a href="/about" className="link underline decoration-primary underline-offset-4">
      About Page
      <Link.Icon className="link__icon" />
    </a>
  );
}
```

---

## modal
> Source: https://nextui.org/docs/components/modal
> Dependencies: @heroui/react

```tsx
import {Modal, Button} from "@heroui/react";
function CustomModal() {
  return (
    <Modal>
      <Button>Open Modal</Button>
      <Modal.Backdrop className="bg-black/80">
        <Modal.Container className="items-start pt-20">
          <Modal.Dialog className="bg-linear-to-br from-purple-500 to-pink-500 text-white">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Custom Styled Modal</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>This modal has custom styling applied via Tailwind classes</p>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close">Close</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
```

---

## pagination
> Source: https://nextui.org/docs/components/pagination
> Dependencies: @heroui/react

```tsx
import { Pagination } from '@heroui/react';
export default () => (
  <Pagination>
    <Pagination.Summary>Showing 1-10 of 100 results</Pagination.Summary>
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.Previous>
          <Pagination.PreviousIcon />
          <span>Previous</span>
        </Pagination.Previous>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link isActive>1</Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Ellipsis />
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link>10</Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Next>
          <span>Next</span>
          <Pagination.NextIcon />
        </Pagination.Next>
      </Pagination.Item>
    </Pagination.Content>
  </Pagination>
);
```

---

