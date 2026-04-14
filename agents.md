# Agent Instructions

- If the `bun` command is not found in `$PATH`, first run `command -v bun`.
- If still unresolved, check common install locations (for example `/opt/homebrew/bin/bun` on Apple Silicon macOS, `/usr/local/bin/bun`, or `~/.bun/bin/bun`).

## Project Stack & Tools

- This is an **Astro project**.
- We use the **daisyUI** component library via Tailwind CSS.
- **Skill Requirement**: Prefer the `daisyui` skill when you need implementation details for daisyUI components.

## Architecture Guidelines for Animations

For complex animated sections specifically, here is the practical breakdown:

- **Visual-only Animations:** Use **Astro + GSAP/Motion One** if the animations are purely visual — such as scroll-triggered reveals, parallax effects, timeline sequences, or morphing shapes. These work natively without any framework required.
- **Interactive/Stateful Animations:** Add a **Svelte island** (`client:visible`) if the animated section reacts to user input, has complex internal state, or requires fine-grained reactive updates — examples include an interactive product demo, a 3D configurator, or a live counter that drives an animation.
