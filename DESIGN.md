---
name: M J Cargo Movers
description: Night highway in motion. Navy asphalt stepping to daylight on rounded sheets, a floating header, long-exposure light trails at the foot of night headers, and lane paint in the logo green for the way forward.
colors:
  night: "#0c1a31"
  night-2: "#13274a"
  dusk: "#284474"
  predawn: "#45618f"
  dawn: "#cdd7e6"
  day: "#f3f4f1"
  paper: "#ffffff"
  ink: "#0c1a31"
  ink-2: "#3a4a63"
  lamp: "#f3f4f1"
  lamp-2: "#b9c6da"
  paint: "#579e06"
  paint-hi: "#6cb516"
  alert: "#b42318"
  field-stroke: "#8794a6"
  field-placeholder: "#5f6b7c"
typography:
  display:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 1.6rem + 5.6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 125"
  display-hero:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 4.3vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 125"
  display-hero-narrow:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, calc((100vw - 2.25rem) / 11.6), 3.75rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 112"
  headline-page:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.5rem + 4.4vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.35rem + 2.9vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.2rem + 0.7vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 112"
  sign-title:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 118"
  tagline:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.05rem + 0.9vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.25
    fontVariation: "'wdth' 112"
  lede:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.1875rem, 1.05rem + 0.55vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 700
    lineHeight: 1.4
  caption:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  tag:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.4
  button:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.1
    fontVariation: "'wdth' 108"
rounded:
  marker: "5px"
  panel: "1rem"
  field: "0.875rem"
  photo: "1.5rem"
  sign: "1.75rem"
  sheet: "clamp(1.75rem, 1rem + 3vw, 3.5rem)"
  control: "999px"
spacing:
  frame-phone: "16px"
  frame-tablet: "32px"
  frame-desktop: "48px"
  grid-gap: "32px"
  section: "96px"
  section-lg: "160px"
  sign: "24px"
  sign-lg: "36px"
  header-space: "6.25rem"
  header-space-lg: "7rem"
  runway: "8rem"
  runway-lg: "11rem"
  runway-hero: "8rem"
  runway-hero-xl: "10rem"
  hero-min-height: "clamp(44rem, 100svh, 60rem)"
components:
  button-paint:
    backgroundColor: "{colors.paint}"
    textColor: "{colors.night}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0.85rem 1.4rem"
    height: "3.25rem"
  button-paint-hover:
    backgroundColor: "{colors.paint-hi}"
    textColor: "{colors.night}"
  button-paint-active:
    backgroundColor: "{colors.night}"
    textColor: "{colors.paint}"
  button-ghost-night:
    textColor: "{colors.lamp}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0.85rem 1.4rem"
    height: "3.25rem"
  button-ghost-night-active:
    backgroundColor: "{colors.lamp}"
    textColor: "{colors.night}"
  button-ghost-day:
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0.85rem 1.4rem"
    height: "3.25rem"
  button-ghost-day-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.day}"
  sign:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.lamp}"
    rounded: "{rounded.sign}"
    padding: "{spacing.sign}"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "0.75rem 1rem"
    height: "3.25rem"
  service-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "1rem 3rem 1.1rem 1.1rem"
  service-card-selected:
    backgroundColor: "{colors.night}"
    textColor: "{colors.lamp}"
  header-bar:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.lamp}"
    rounded: "{rounded.sign}"
    height: "5.25rem"
  nav-item:
    textColor: "{colors.lamp-2}"
    rounded: "{rounded.control}"
    padding: "0.5rem 0.875rem"
  nav-item-current:
    backgroundColor: "{colors.lamp}"
    textColor: "{colors.night}"
  photo:
    rounded: "{rounded.photo}"
  service-art:
    backgroundColor: "{colors.night}"
    rounded: "{rounded.photo}"
  request-summary:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.lamp}"
    rounded: "{rounded.panel}"
    padding: "1rem 1.25rem"
  notice:
    backgroundColor: "{colors.dawn}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "1.25rem"
  number-badge:
    backgroundColor: "{colors.night}"
    textColor: "{colors.lamp}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    size: "2rem"
  footer:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.lamp}"
    rounded: "{rounded.sheet}"
  footer-bar:
    backgroundColor: "{colors.night}"
    textColor: "{colors.lamp-2}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "1rem 1.5rem"
---

# Design System: M J Cargo Movers

## Overview

**Creative North Star: "Night Highway in Motion"**

The site is the expressway out of Panvel after dark, moving. A consignment travels it from night asphalt to daylight: grounds step from the logo navy's night through dusk and dawn to paper, and moving down a page, or along the process, means moving toward daylight. The road isn't drawn as a stack of boxes. Each section after the first is a sheet that rides up over the one before on rounded shoulders, so the page reads as one road bending on. Corners are soft everywhere a hand touches: pill controls, rounded fields, rounded sign panels and photographs.

Four road materials carry the expression, and the owner's logo sets their colours. **Lane paint** is the logo's green, reserved for the way forward: the primary action, the dashed route lane and its markers, and the green streaks among the light trails. **Light trails** are long-exposure streaks of headlight white and lane green that run toward a vanishing point in a runway strip at the foot of every night header, below the copy and never behind it. **Gantry signs** are filled navy panels with the white inset border of an Indian highway sign, now on generous rounded corners, used wherever the page asks a question. **Gantry type** is Archivo pushed to 125% width and weight 800, the voice of the overhead sign. Everything else is calm sans text on ink or lamp. The logo, a navy box truck with a green outline and lettering, is placed as supplied and never redrawn. On the home hero the road gets its traveller: an illustrated side-on goods truck in the company's livery (navy cab under an Indian headboard, white box body carrying the logo's navy panel) that drives in from beyond the right edge of the screen along the quote sign's own route and pulls up beside the headline. It is the system's one authored hero motion: an arrival, then a continuous cruise with the road streaming beneath it. The owner has decided to replace the illustration with a cut-out of a side-on photograph of one of the company's own trucks, driving in and parking on the same route; that change is pending the photograph, and the illustration stays until it is supplied.

Depth is mostly tonal: sheets overlap and grounds step. One layer floats: the header, a solid rounded night-2 bar held inside the page gutters, carrying the system's single drop shadow because it really does sit over the content. It is solid, not glass. The density is that of a confident local trade site: big type, generous section spacing (96px on phones, 160px on desktop), few elements per screen. Imagery is sparse and honest, on rounded corners. The owner's own-trucks photograph is the only picture of the fleet. Two credited stock photographs remain, the expressway behind the office band and a warehouse aisle for warehousing, and neither is presented as the company's. Freight forwarding is shown by a credited stock photograph of road freight, likewise not presented as the company's. The home hero carries no photograph: its first screen is night ground and the illustrated truck.

**Key Characteristics:**
- One night-to-day ground ladder on the logo navy's hue; position on that ladder says how far along the road you are.
- Sections overlap as rounded sheets; there are no hard horizontal cuts between grounds except where daylight continues on purpose.
- The logo green appears only on the way forward: primary action, route lane and markers, route arrow, the green light trails, the hero truck's lights, and focus (outline, field halo, caret, selection).
- Only dark text sits on green; white text on green fails contrast.
- Selected and current state is a navy↔lamp inversion, never green.
- Pill controls, rounded fields, 1.75rem road-sign panels with a 2px lamp inset border.
- One floating layer (the header) with one honest shadow; everything else lies on the road.
- Three motions define the world: the hero truck driving in and cruising on its lane, light trails in the night runway, and the process lane painting itself in on scroll.

## Colors

The palette is a night-to-day ground ladder on the logo navy's hue, ending in daylight off-white, with the logo green held back for forward motion.

### Primary
- **Lane Paint Green** (paint): the logo's green. It fills the primary-action button, paints the dashed route lane (horizontal: 8px tall, 36px dash / 24px gap; vertical: 8px wide, 28px dash / 20px gap), the pickup ring and destination marker on the quote starter, the stop markers on the process lane, the arrow in the request summary, about 30% of the streaks in the light trails, and on the hero truck, its headboard lights and the lane and markers under it (the logo's own green on the livery panel is the logo, not paint). It is also the 3px keyboard focus outline, the field focus halo, the text caret and the selection highlight. Text on it is always night (5.2:1). White on green measures 3.3:1 and is not used.
- **Lit Paint** (paint-hi): hover state of the green button only, on fine pointers.

### Neutral (grounds, night to day)
- **Night Asphalt** (night): hero ground and the far fade of the hero road; at 35%, the flat scrim over the office-band photograph; page heads, the 404, the process section's start, the office band, the closing quote section, the mobile menu and quote bar, the footer's bottom bar, the selected service card. The html background, so overscroll stays night.
- **Sign Navy** (night-2): road-sign panel fill, the floating header bar, the footer sheet, the request summary.
- **Logo Navy** (dusk): the logo's own box navy and icon ground. Second stop of the process lane; the map frame's ground on night.
- **Predawn** (predawn): third process stop. Lamp text on it; its secondary text is a one-off lighter blue-grey rather than lamp-2.
- **Dawn** (dawn): fourth process stop, the office-map sketch ground, neutral notices; at 60% opacity, the note panel on the services page.
- **Daylight** (day): default body ground and the main reading ground of day sections.
- **Paper** (paper): the final process stop, the sections that continue straight after it ("why us", "ready"), field fills and resting service cards. The brightest ground, where the road arrives.

### Neutral (text)
- **Ink** (ink): text on day, dawn and paper; the day ghost-button stroke; the field focus stroke; the map pin.
- **Ink Muted** (ink-2): secondary text, ledes and captions on day grounds; field hover stroke.
- **Lamp** (lamp): text and ghost-button strokes on night grounds; the sign's inset border (at 75%); the inverted current-page fill; the white streaks in the light trails.
- **Lamp Muted** (lamp-2): ledes, captions, inactive nav and footer links on night grounds; the hero road's far edge and perspective lines.
- **Field Stroke** (field-stroke) and **Field Placeholder** (field-placeholder): the 2px resting stroke of every input and of the service cards and their tick rings, and the placeholder text. They are literals in the component layer, not theme variables.

### Signal
- **Alert Red** (alert): invalid field stroke and inline error text with its icon. Error notices sit on a pale red tint with ink text.

### Named Rules
**The Lane Paint Rule.** Green marks only the way forward: the one primary action per view, the route lane and its markers, the route arrow, the green streaks in the runway, the hero truck's lights, and focus (outline, field halo, caret, selection). It never marks selected or current state, never fills a secondary action, never decorates a heading, rule, map or icon. The logo raster is the other exception, because the green is the logo's.

**The Dark-on-Green Rule.** Anything set on paint or paint-hi is night. Never put white or lamp text on the green.

**The Night-to-Day Rule.** Grounds come only from the ladder night → night-2 → dusk → predawn → dawn → day → paper. Stepping toward paper means progress. Each section takes one ground across its sheet.

**The Opaque Ramp Rule.** Grounds blend only inside the process lane, and only as opaque ramps through the ladder's own blues (a transparent fade between navy and white would pass through grey). The steps between stops stay crisp so light text never lands on a light ground. Everywhere else a ground meets the next at a sheet's rounded edge. A photo scrim is not a ground blend: night laid over a photograph at an alpha is the sanctioned exception (see The Single-Navy Scrim Rule).

**The Inversion Rule.** Selected, current and pressed states invert: navy becomes lamp and lamp becomes navy (current nav pill = lamp fill with night text; selected service card = night fill with lamp text and a lamp tick; pressed ghost = filled with its stroke colour). The green button inverts to a night fill with green text and a 3px green inset stroke.

## Typography

**Display Font:** Archivo Variable, width axis loaded (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Archivo Variable (same family, normal width)

**Character:** One family on two axes. Pushed to 125% width and weight 800, Archivo is the overhead gantry sign: broad, flat, readable at speed. At normal width and weight 400 it is plain, sturdy reading text. The width axis carries the hierarchy, so no second face is needed.

### Hierarchy
- **Display** (800, 125% width, clamp 2.75rem→6rem, 0.98, −0.025em): the 404 H1, about 9 characters per line.
- **Display hero** (800, 0.98, −0.025em; from 1024px 125% width at clamp(2.75rem, 4.3vw, 4.25rem); below 1024px **display-hero-narrow**, 112% width at clamp(1.75rem, (100vw − 2.25rem) ÷ 11.6, 3.75rem)): the home H1 only. It names the three services one beat per line ("Full truck loads, / warehousing and / freight forwarding."), and each line is held unbroken at every width; below 1024px the size tracks the screen so the longest beat always fits.
- **Headline-page** (800, 125% width, clamp 2.5rem→5.25rem, 0.98): inner-page H1 in the night page head, max 16ch.
- **Headline** (800, 125% width, clamp 2rem→3.75rem, 0.98): section H2s, usually 10–13ch so they break into a stacked sign.
- **Title** (700, 112% width, clamp 1.375rem→1.75rem, 1.15, −0.015em): H3s, process stop names, definition-list terms, form legends, prose H2s.
- **Tagline** (700, 112% width, clamp 1.25rem→1.75rem, 1.25, ink-2): the promise set under each service's H2 on the Services page.
- **Sign title** (800, 118% width, 1.375rem phone / 1.625rem from 640px): the question at the top of a road-sign panel.
- **Lede** (400, clamp 1.1875rem→1.5rem, 1.45): the sentence under a headline, 34–52ch.
- **Body** (400, 1.0625rem phones / 1.125rem from 768px, 1.6): running text. Long-form pages cap at 68ch.
- **Label** (700, 0.9375rem): field labels, the request-summary label, the quote starter's next-step line, the footer bottom bar.
- **Caption** (400, 0.875rem): the map's privacy note.
- **Tag** (600 for "required", 500 for "optional", 0.8125rem, ink-2, lowercase): the tag after a field label. The smallest type.
- **Button** (700, 108% width, 1.0625rem, 1.1): every button.

Headings use balanced wrapping and paragraphs pretty wrapping. Phone numbers are tabular. No text is uppercased or letter-spaced open.

### Named Rules
**The Gantry Voice Rule.** Every headline from H2 up is Archivo at 125% width and weight 800 with tight negative tracking and sub-1 leading. Width is the hierarchy. Do not introduce a second display face.

**The Logo-Not-Type Rule.** The business name is shown as the supplied logo raster, never re-set in live type as a mark. Gantry type is for headlines; the logo's own lettering stays in the image.

## Layout

- **Frame:** one centred column, max 88rem, with equal outer gutters of 16px (respecting safe-area insets) on phones, 32px from 640px, 48px from 1280px. The floating header sits inside the same gutters.
- **Header space:** the header takes no height of its own; the first section pads its top by the header space (6.25rem phones, 7rem from 1024px) plus 2.5–5rem. The home hero pads by the header space plus 2.5rem at every width. Anchor scrolling clears it with 6.5rem scroll padding.
- **Sheets:** every section after the first, and the footer, rides up over the previous section by the sheet radius (1.75rem→3.5rem, fluid) with rounded top shoulders and clipped overflow. A section that must continue the one above seamlessly (the paper section after the process lane) opts out.
- **Grid:** 12 columns from 1024px with a 32px gap. Headline 5–7 columns against copy 4–5 columns pushed to the far edge and bottom-aligned. On the Services page media (5 columns) and copy (6 columns) alternate sides section by section. Peers align rather than stagger: on Home, warehousing and freight forwarding sit as an equal two-column pair under the full-truck-load lead, each a flex column whose paragraph grows to fill so the two go-links line up.
- **Section rhythm:** 96px vertical padding on phones, 144–160px on desktop (quote sections and the Services page's service sections 144px, other content sections 160px). Gaps step through 12, 20, 24, 32, 40, 48, 56px.
- **Runway:** every night header ends in an open strip that holds the light trails; the next sheet rises over its lower edge. Inner page heads and the 404 use 8rem (11rem from 1024px). The home hero carries its foot runway inside the hero box at 8rem (10rem from 1280px), on desktop only; on phones the hero has no runway and the next sheet rises over the quote sign's foot.
- **Home hero (illustrated truck):** night ground, no photograph. On desktop the hero is a column at least clamp(44rem, 100svh, 60rem) tall with its grid centred vertically above the foot runway, 3rem between its two rows. Row one: the H1 across columns 1–8 and the lede in columns 9–12, aligned to the H1's foot. Row two: the quote sign (starting a full truck load quote) in columns 1–5 and the truck in columns 6–12, centred and widened by 1.25rem into the right gutter so the whole drawing stays on screen. Below 1024px the order is headline, lede, truck (full width plus 0.25rem each side on phones, 86% centred from 640px), quote sign, and the grid pads its foot by the sheet radius plus 3.5rem so the sign clears the rising sheet.
- **Full bleed:** the process lane runs full-bleed: on desktop the left gutter continues the first stop's ground and the right gutter the last stop's, so night runs off one edge and daylight off the other.
- **Breakpoints:** 640 / 768 / 1024 / 1280px. Desktop nav and the five-column process appear at 1024px; the mobile quote bar exists below 640px.
- **Phones:** a fixed night quote bar at the bottom carries the green "Get a quote" (plus Call when a number exists). It slides away while any quote-starter sign is on screen, so two primary actions never stack, and it is absent on the contact page. The footer pads its bottom to clear it.

## Elevation & Depth

Depth is tonal and layered, with one floating layer. Sections are sheets that overlap the previous ground on rounded shoulders; a sign panel sits one step brighter (night-2) on night; a photograph sits under a flat 35% night scrim where a sign crosses it (the office band); the process lane brightens stop by stop. The header is the one element that floats over content, and only it casts a shadow, offset downward and soft. Strokes are drawn as inset box-shadows (3px on ghost buttons, 2px on fields) so they never change an element's size; the only outward ring is the 3px green focus halo on fields. The hero truck is an illustration with its own lighting inside it: night falling off down its sides, a soft contact shadow on the road beneath it and a warm headlamp pool ahead. That shadow belongs to the drawing's road, not to the page; the truck lifts nothing off the page.

### Shadow Vocabulary
- **Header float** (`box-shadow: 0 18px 40px -18px rgb(4 10 22 / 0.75)`, plus a 1px lamp ring at 10%): the floating header bar only.
- **Ghost stroke** (`box-shadow: inset 0 0 0 3px <lamp|ink>`): ghost buttons; in green, the pressed primary button.
- **Field stroke** (`box-shadow: inset 0 0 0 2px <field-stroke → ink-2 on hover → ink on focus | alert when invalid>`).
- **Field focus halo** (`box-shadow: inset 0 0 0 2px ink, 0 0 0 3px paint`).
- **Truck contact shadow** (radial, near-black at 75% to transparent, under the truck and each wheel, inside the drawing): moves with the truck because it is cast on the drawn road. Not a page elevation.

### Named Rules
**The One Floating Layer Rule.** Only the header floats, and only it casts a drop shadow. Everything else lies on the road: sheets, signs, photos and panels separate by ground, radius and overlap, never by shadow. The hero truck's contact shadow lies on its own drawn road, inside the illustration.

**The Solid Header Rule.** The floating header is an opaque night-2 bar. No backdrop blur, no glass, no translucency.

**The Single-Navy Scrim Rule.** Where a sign or copy crosses a photograph, legibility comes from one navy (night) laid over it: no second hue, no hue travel, no blur. The office band uses a flat 35% night wash under its sign, leaving the photograph's subject readable. It is a legibility device, not decoration, and is distinct from multi-hue gradient washes, which the system does not use.

## Shapes

Soft geometry throughout, sized to the object. Controls are full pills (999px): buttons, nav items, the footer's bottom bar from 640px, number badges. Fields are gently rounded (0.875rem). Notes, notices, the request summary, service cards, mobile menu items and the footer bar on phones take 1rem. Photographs take 1.5rem. Sign panels, the floating header bar and the map frame take 1.75rem. The sign's inset border is 2px of lamp at 75%, 8px inside the edge, with its radius reduced by the same 8px so the two curves stay concentric. Section sheets round their top shoulders at a fluid 1.75rem→3.5rem.

Route markers keep their own geometry: a circle for the origin and for intermediate process stops, a 5px-cornered square for the destination. The hero truck is a shaded flat illustration on the palette's hue, and its lane ends on the same ring and square; so does the route in the forwarding diagram.

**The Concentric Inset Rule.** An inset border inside a rounded shape takes the outer radius minus its inset, so the corners run parallel.

**The Square Destination Rule.** On every route, the origin is round and the destination is square. Both are green.

## Components

### Buttons
Tactile pills. Press shrinks the button to 97% and inverts its colours.
- **Shape:** full pill (999px), minimum height 52px (44px in the header), padding 0.85rem × 1.4rem, 0.6rem gap to a 16–20px lucide icon.
- **Primary (green):** paint fill, night text. One per view: "Get a quote", "Continue to quote", "Send quote request", and each service's own quote action ("Get a full truck load quote", "Ask about storage space", "Get a freight forwarding quote").
- **Hover / Focus:** on fine pointers only, green lightens to paint-hi and a trailing arrow nudges 3px right (200ms, ease-out). Focus is the global 3px green outline at 3px offset, following the pill's shape. Transitions run 160ms.
- **Pressed:** scale 0.97. Green inverts to a night fill with green text and a 3px green inset stroke. Ghosts fill with their stroke colour.
- **Ghost on night / Ghost on day:** transparent with a 3px inset stroke of lamp (night) or ink (day). Hover adds a 10% lamp or 6% ink wash. Every secondary action: Directions, Show map, the Services page's on-this-page pills, WhatsApp, Copy, Menu.
- **Disabled / sending:** 60% opacity with a progress cursor, plus a spinning loader icon.

### Text links
- **Go link:** bold, underlined at 35% of the current colour, solid on hover, with a trailing arrow that nudges 3px. Ink on day grounds, lamp on night. Used for in-section secondary moves.
- Footer and list links are lamp-2 and go to lamp with an underline on hover.

### Road Sign (signature)
The panel the site uses to ask a question.
- **Fill:** night-2 (night on the office band's photograph), lamp text, 1.75rem corners, padding 24px (36px from 768px).
- **Border:** 2px lamp at 75%, inset 8px, concentric corners: the white frame of an Indian highway sign, softened.
- **Uses:** the quote starter (hero, 404 and every closing quote section), the office card over the expressway photograph, and the "request received" confirmation (with a 48px lamp check badge).

### Quote Starter (signature)
A road sign holding a two-field route: "Pickup from" and "Deliver to", joined on the left by a vertical dashed green lane from a round origin (night-2 dot in a 4px green ring) to a square green destination. Below sit the green "Continue to quote" pill and a lamp-2 line saying what comes next. It carries the full truck load service and submits by GET to the contact form, which preselects that service and prefills the route.

### Process Lane (signature)
Five stops on one road: night, dusk, predawn, dawn, paper, with lamp text on the three dark grounds and ink on the two light ones. On desktop the stops are crisp 20% columns; each carries an opaque vertical ramp through the band's blues, so the band rises out of night at its top and settles through dawn into paper at its bottom and reads as one shape rather than five tiles. The gutters continue the first and last ramps off the page edges. On phones the stops stack and each eases in from the previous ground over its top 2rem. The green lane runs beside the stops on phones and through them on desktop; four round markers lead to a square destination. Where scroll-driven animation is supported and motion is allowed, the lane paints itself in as it scrolls into view and each marker lights (25%→100% opacity, half to full scale) as the paint reaches it. This is the only scroll effect in the system. On Home and Services it is titled "How a truck load is booked", and its steps describe booking a truck load.

### Runway Light Trails (signature)
A canvas in a runway strip at the foot of each night header (on the home hero, desktop only). Streaks of lamp white (about 70%) and lane green (about 30%) travel along nine perspective lanes that converge on a vanishing point beyond the right edge, each a bright core (1.5–3.3px) over a bloom 6px wider at 0.24× its alpha, fading in from its tail. The strip fades in from transparent over its top 30%, so the trails rise out of the night ground. The strip takes its size per placement. 12 streaks on phones, 24 wider. The canvas is decorative, never crosses copy, pauses off screen and in background tabs, and renders one still frame under reduced motion.

### Hero Truck (signature)
The home hero's traveller: an illustrated side-on goods truck facing left, toward the headline, drawn on an 860×420 canvas (src/components/TruckArt.tsx). A navy cab (dusk, shaded top to bottom) under the raked headboard Indian trucks carry, with three paint-green lights on it; a white box body with roof sliver, ribs, rails and corner posts; the logo's navy panel (white MJ, green CARGO MOVERS) painted on its side as livery; a steel tank, battery box, side guard and mudflaps on the chassis; three wheels on steel discs with six hand holes. It is an illustration in the brand's livery, not a portrait of a particular truck: no registration, no fleet claim. The company's real trucks (maroon Ashok Leylands) appear in the owner's photograph elsewhere, not in the hero as built.
- **Livery:** `public/brand/logo-panel.webp`, cut from the supplied logo by `npm run brand`, placed as drawn (never redrawn or re-set). If it fails to load, a plain dusk panel shows in its place.
- **Light:** night falls off down the body's side over the livery too (night at 0 → 28%); a headlamp with a warm (#fff6dc) halo, a soft blurred beam low ahead and a pool on the road; a red tail lamp; near-black contact shadows under the truck and each wheel. Wheel fills are radial so they light the same at any turn.
- **Road:** a night-2 asphalt band whose far edge sits behind the wheels, so they stand on it; faint perspective lines; it fades out toward the copy on the left and runs off the right edge of the screen, where the truck comes from. The 5px paint lane (36/24) runs from a night-filled ring at right (origin) to a 5px-cornered square at left (destination): the quote sign's route markers, in the truck's direction of travel.
- **Motion, arrival:** the script measures the travel at this width (from just past the right edge of the screen to the truck's place: 363px at 390, 670px at 1440, 910px at 1920) and hands it to the keyframes as `--truck-travel`, with the wheel turn that covers it (`--truck-spin` = travel ÷ radius 38 in drawing units, ≈1300–1800°) and a duration (`--truck-dur` = 1100ms + 1.75ms per px, held to 1.7–2.6s). The drive cruises linearly for its first quarter (0.4 of the distance), then brakes evenly into place on an ease-out-quad (cubic-bezier(0.5, 1, 0.89, 1)), whose starting speed matches the cruise. An outer wheel layer rolls counter-clockwise on the identical keyframes, so there is no slip. The body (origin 51% 71%) gives over the road (up to 1.2px, fading out by 60%), dives nose-first to −0.6° over 500ms once braking starts, and settles through +0.28° and −0.08° to level over 900ms.
- **Motion, cruise:** the camera has caught up and travels with the truck, which holds its place beside the headline. One speed of 120 drawing units a second links every part: the lane paint and two faint rows of asphalt marks (one 120-unit pattern) stream right, backward under the truck, between the fixed ring and square in 1s; an inner wheel layer turns counter-clockwise from the first frame, once per 1.99s (2πr/v); the body rides an irregular suspension loop (up to 0.9px, 1.6s). During the arrival the road speeds up from still on an ease-in-quad over `--truck-lane-in` (60 drawing units per second of arrival, half what the cruise covers), reaching exactly the cruise speed as the loop takes over, so the hand-over has no seam. The road edge and perspective lines hold still. Only translate, rotate and opacity animate.
- **When it plays:** with `html.js`, the truck waits off stage until the script decides; if the script never runs it fades in parked after 2s. In a background tab, with the hero off screen, or when the script arrives more than 1.9s after first paint, the arrival is skipped and the truck simply cruises. An IntersectionObserver pauses everything off screen. Under reduced motion the truck is parked and still. Measured at 60fps with no frame over 17ms through arrival and cruise.
- **Pending (owner decision, 2026-10-30):** replace the illustration with a cut-out of a side-on photograph of one of the company's own trucks, animated driving in and parking on the same route. Not built. Until the photograph is supplied the illustration above is the hero truck, and nothing here yet specifies the cut-out.

### Inputs / Fields
- **Style:** paper fill, ink text, 0.875rem corners, a 2px field-stroke inset, minimum height 52px, padding 0.75rem × 1rem, at least 16px text. The caret is green. Selects carry an ink chevron. Textareas start at 8rem and resize vertically.
- **Hover / Focus:** the stroke darkens to ink-2 on hover. On focus it turns ink and gains the 3px green outer halo. The default outline is removed.
- **Error:** a 2px alert stroke, plus an inline 0.9375rem semibold alert message with a 16px alert icon. The focus halo stays green.
- **Labels:** bold, above the field, with a lowercase "required"/"optional" tag. Hints sit between label and field in ink-2.

### Service Picker
The quote form's first question, "What do you need a quote for?": the three services as native radio buttons drawn as cards, stacked on phones and in three columns from 640px.
- **Card:** paper fill; the service's short name in bold at 110% width over a 0.9375rem ink-2 line; 1rem corners; padding 1rem × 1.1rem with 3rem kept clear at right; the field's 2px field-stroke inset. A 22px tick ring (2px field-stroke inset) sits in the top-right corner.
- **Selected:** inverted to night, with a lamp name, a lamp-2 line, and the tick filled lamp with a night check. Never green.
- **Hover / Press / Focus:** on fine pointers only, the stroke darkens to ink-2; press scales the card to 0.98; keyboard focus draws the 3px green outline at 3px offset around the card. Colour, stroke and scale transition over 160ms.
- **Switching:** the chosen service's questions replace the previous set and settle in over 220ms (opacity from 0 and a 6px rise, ease-out); under reduced motion they only fade, over 150ms. Each service asks only its own fields, values shared between services carry across, and a failed submit focuses the first problem in on-screen order. A `?service=` link preselects a card.

### Request Summary
A night-2 panel (1rem corners) at the foot of the quote form that restates the request live in one line, per service. A lamp-2 label names it: "Your request ·" and the service's name. For a truck load or forwarding it reads "Pickup → Delivery" (or "Origin → Destination") in bold at 110% width, the arrow a green arrow icon with a screen-reader-only "to", followed by goods and quantity in lamp-2. For warehousing it reads "Storage" followed by goods, quantity, period and location, with no arrow. The arrow is the only green in running text.

### Service Section
Each service on the Services page is one sheet: the service's name as the gantry H2, its tagline under it, a lede, a short titled list ("Suited to", "Why use storage", "What we arrange") bulleted with 16px ink arrow icons, a dawn-at-60% note on what to tell us, and the service's green quote pill. Media (5 columns) and copy (6 columns) alternate sides: full truck load on day with the own-trucks photograph, warehousing on paper with the warehouse photograph, freight forwarding on day with the freight-forwarding photograph. The same arrow-bulleted list leads full truck load on Home.

### Service Photographs
Warehousing and freight forwarding are each shown by a credited stock photograph in a 4:3 frame with photo corners (object-cover): a warehouse aisle between pallet racks, and a loaded flatbed trailer heading down an Indian expressway (owner's choice, 2026-11-01, replacing a drawn route diagram). On Home they sit side by side as an aligned pair; on Services each is its section's media. Neither is presented as the company's own facility or vehicle, and the forwarding photograph shows road freight only.

### Notices and notes
1rem-cornered panels with ink text: dawn for status, a pale red tint for errors (with an alert icon), and dawn at 60% for the services-page note. Numbered steps on the contact page use 32px night pill badges with lamp tabular numerals.

### Office Map
A click-to-load map in a 1.75rem-cornered 4/3 frame. Until the visitor asks, it shows a token-drawn sketch: a dawn ground, one pale road with a dashed lamp centre line, and a night pin with a lamp dot. No green. A ghost "Show map here" pill and a go-link sit over it, with a 0.875rem ink-2 note that loading shares the visit with Google.

### Navigation
- **Floating header:** sticky and zero-height, a night-2 bar inside the page gutters, 8px below the top (12px from 1024px), 84px tall (92px from 1024px), 1.75rem corners, a 10% lamp ring and the header float shadow. The truck logo sits at left at 68px (76px from 1024px). Desktop links are semibold 0.97rem pills, lamp-2 at rest and lamp on hover; the current page is a lamp pill with night text. The green "Get a quote" pill sits at right, with a ghost phone pill only when a number is published.
- **Mobile:** a ghost "Menu" pill opens a full-screen night panel beneath the header space. Links there are 1.75rem extra-bold at 118% width on 1rem-cornered rows, the current page inverts, and the green quote button plus an optional ghost call button sit at the bottom. Focus is trapped; Escape closes.
- **Page heads:** night ground with the gantry H1 and a lamp-2 lede, ending in the runway. No lane line.
- **Home hero:** the first screen described in Layout: night ground, the three-service H1 across the top with the lede beside it, the quote sign below at left, the hero truck at right, the runway at the foot on desktop.
- **Footer:** a night-2 sheet rising over the closing section, holding the full logo lockup (up to 42rem wide), three columns (office, pages, services; the services column lists the three services, each linking to its section) with bold 112%-width headings, and a night bottom bar that is a pill from 640px and 1rem-cornered on phones.

### Logo
The owner-supplied mark: a navy box truck (the dusk navy) carrying a white "MJ" monogram and green "CARGO MOVERS", drawn in a green outline, with the green tagline "Transporting cargo with care" in the full lockup. Transparent rasters lifted from the supplied file: the truck alone in the header, the full lockup in the footer. Icons are the white MJ monogram on a logo-navy square; the Open Graph card sets the lockup on white beside the owner's own-trucks photograph. Never recoloured, redrawn, outlined or re-set in live type.

### Motion
- **Hero truck:** the system's one authored hero motion (see Hero Truck): a 1.7–2.6s drive-in from beyond the right edge, braking into place, then a continuous cruise on the streaming road; paused off screen, parked and still under reduced motion.
- **Light trails:** continuous while the runway is on screen; still under reduced motion.
- **Service swap:** the quote form's per-service questions settle in over 220ms (opacity and a 6px rise, ease-out); opacity only under reduced motion.
- **Process lane:** paints in on scroll (scroll-driven, linear), static where unsupported or under reduced motion.
- **Entrances:** marked blocks fade up 20px (opacity 600ms, transform 700ms, `cubic-bezier(0.23, 1, 0.32, 1)`), children staggered 70ms up to 280ms. Content is visible without JS; anything on screen at load does not animate.
- **Mobile quote bar:** slides in over 320ms and out over 260ms on `cubic-bezier(0.32, 0.72, 0, 1)`.
- Reduced motion turns off the hero truck's motion, entrances, bar slides, the lane paint-in, the service swap's rise and the spinner.

## Do's and Don'ts

### Do:
- **Do** lay each section after the first as a sheet that rides up over the previous ground on rounded shoulders (fluid 1.75rem→3.5rem), and opt out only where daylight continues on purpose.
- **Do** keep every ground on the night-to-day ladder and let progress move toward paper.
- **Do** reserve the logo green (paint) for the primary action, the route lane and its markers, the request-summary arrow, the green light trails, the hero truck's lights, and focus (outline, field halo, caret, selection).
- **Do** set night text on anything filled green.
- **Do** show selected, current and pressed state by navy↔lamp inversion.
- **Do** use a road-sign panel (night-2, 1.75rem corners, 2px lamp inset border at 75%, 8px in, concentric) when the page asks the visitor something.
- **Do** make every control a pill (999px) at least 52px tall, with strokes drawn as inset rules; fields at 0.875rem corners.
- **Do** round photographs at 1.5rem, and only the inner edge of a photograph that bleeds off the page.
- **Do** end every night header with the runway strip, and keep the light trails inside it (the home hero's runway is desktop-only).
- **Do** make photographs legible under a sign with the single-navy scrim (a flat night wash, leaving the subject readable).
- **Do** keep the hero truck's wheels tied to the distance it covers (turn = travel ÷ radius, on the same keyframes), animate only translate, rotate and opacity, play the entrance once and then cruise at one linked speed (120 drawing units a second: road, wheels and lane-in derive from it), pause it off screen, and park it under reduced motion.
- **Do** set every headline from H2 up in Archivo at 125% width, weight 800, line-height 0.98, −0.025em.
- **Do** make secondary actions ghost pills (3px lamp or ink inset stroke) or go-links in ink or lamp.
- **Do** keep a round origin and a square destination on any route drawing.
- **Do** show warehousing and freight forwarding with credited, realistic stock photographs of road freight and storage, never ports, aircraft or ships.
- **Do** use the supplied logo rasters as they are: truck in the header, full lockup in the footer, the navy panel as the hero truck's livery.
- **Do** credit every third-party photograph in the provenance registry and on the credits page, and say on the credits page which photograph is the company's own.
- **Do** use the owner's own-trucks photograph (720×1280, plates blurred) as the site's proof of the fleet, at moderate sizes only: a 4:5 crop leading full truck load transport on Home ("Three services, one company") and on Services, and beside "Your load, on our trucks" on About, with no caption (the alt text carries the description), and on the Open Graph card.

### Don't:
- **Don't** cut between section grounds with hard horizontal edges; the overlap and shoulders are the seam.
- **Don't** give anything but the floating header a drop shadow, and don't make the header translucent, blurred or glass.
- **Don't** run light trails behind copy, outside a runway strip, or without the off-screen pause and reduced-motion still.
- **Don't** add scroll effects beyond the process lane's paint-in.
- **Don't** blend grounds anywhere except the process lane's opaque ramps, and never fade navy to white through transparency. (A night scrim over a photograph is not a ground blend.)
- **Don't** tint a photo scrim with a second hue, travel it across hues, or blur the photograph behind it.
- **Don't** use green for current or selected state, secondary buttons, headings, icons, dividers, maps or decoration. Outside the forward path, only the logo raster and the hero truck's lights carry green.
- **Don't** let the hero truck cross copy or replay its entrance: it enters once from beyond the right edge and cruises whole within its column, the road moving under it.
- **Don't** put white or lamp text on green.
- **Don't** recolour, redraw or outline the logo, or rebuild it in live type.
- **Don't** add a lane line to page heads or section edges. The lane belongs to the route only.
- **Don't** introduce a second display face, uppercase labels or open letter-spacing.
- **Don't** present stock photographs or the drawn truck as a portrait of the company's own fleet (only the owner's own-trucks photograph shows the fleet), present the warehouse or freight-forwarding photograph as the company's own facility or vehicle, or publish ratings, statistics or testimonials as visual proof.
- **Don't** show or draw part loads, shared trucks or parcels, or illustrate warehousing and forwarding with invented facilities, ports, aircraft or ships.
- **Don't** colour a selected service card green; selection is the night inversion with a lamp tick.
