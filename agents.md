# Agent Instructions

- If the `bun` command is not found in `$PATH`, first run `command -v bun`.
- If still unresolved, check common install locations (for example `/opt/homebrew/bin/bun` on Apple Silicon macOS, `/usr/local/bin/bun`, or `~/.bun/bin/bun`).

## Project Stack & Tools

- This is an **Astro project** with **Alpine.js** integration.
- We use the **daisyUI** component library via Tailwind CSS.
- **Skill Requirement**: Prefer the `daisyui` skill when you need implementation details for daisyUI components.

## Component Architecture: `.astro` vs `.svelte`

### Use `.astro` when the component is:

- **Static / server-rendered** — no client-side JS needed (e.g. Footer, Articles, Footprint).
- **Simple scroll/resize listeners** — the JS just toggles classes based on `scrollY` or viewport size, with no internal state to track (e.g. Navbar sticky behavior).
- **CSS-driven interactivity** — hover effects, transitions, and animations that are fully handled by CSS pseudo-classes or Tailwind's `group-[.class]` variants (e.g. Services hover grid).
- **Simple timers with class toggling** — an interval that cycles classes on DOM elements with no user-driven state changes (e.g. Hero word carousel).

### Use `.svelte` (as an Astro island) when the component has:

- **Reactive state that drives the UI** — a variable like `activeIndex` that multiple parts of the template depend on (e.g. Team accordion, Journey carousel).
- **User input → state → DOM updates** — clicks, hovers, or keyboard events that change internal state, which in turn updates text, classes, or visibility across multiple elements.
- **Complex event listener management** — if the `.astro` version needs manual DOM queries (`querySelector`), idempotency guards (`data-init` flags), and cleanup for Astro View Transitions, Svelte eliminates all of that boilerplate.
- **Interactive animations** — animated sections that react to user input with fine-grained reactive updates (e.g. interactive demos, configurators, live counters driving animations).

### Rule of thumb

> If your `<script>` block in an `.astro` file is doing `querySelector` + manual class toggling + state tracking + cleanup guards, you should **prefer using Alpine.js** directly in the markup to keep it simple, clean, and declarative. If the state and interactivity are complex and require advanced reactive patterns, it should be a `.svelte` island instead.

### Svelte 5 Syntax & Features

- **Use Runes**: Always prefer modern Svelte 5 runes syntax (`$props`, `$state`, `$derived`, `$effect`) over the older Svelte 4 syntax (`export let`, `let x = 0`, `$: x = y`). Use the new event handler syntax (`onchange`, `onclick` instead of `on:change`, `on:click`).
- **Lifecycle Effects**: Always prefer the new `$effect` rune over `onMount` for handling side effects and component lifecycles.
- **Built-in Transitions**: For Svelte islands, leverage Svelte's built-in transition directives (e.g., `in:fade`, `out:slide`, from `svelte/transition`) for component-level interactive animations.

### Hydration directives

- Use `client:visible` for below-the-fold interactive components (preferred — lazy hydration).
- Use `client:load` only for above-the-fold components that must be interactive immediately.

### Data & images pattern

When converting to `.svelte`, import and process images in the **Astro parent** (to retain Astro's image optimization), then pass resolved URLs as props:

```astro
---
import Component from '../components/Component.svelte';
import img from '../assets/image.png';
---

<Component imgSrc={img.src} client:visible />
```

### Animations (non-component)

- **Visual-only animations** (scroll-triggered reveals, parallax, timeline sequences): Use **Astro + GSAP/Motion One** — no framework needed.
- **Stateful animations** (user-driven, complex internal state): Use a **Svelte island**.
