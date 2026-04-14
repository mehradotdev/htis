# Agent Instructions

- If the `bun` command is not found in the typical system path (`$PATH`), look for the executable natively in the Homebrew installation directory (e.g., `/opt/homebrew/bin/bun`).

## Project Stack & Tools
- This is an **Astro project**.
- We use the **daisyUI** component library via Tailwind CSS. 
- **Skill Requirement**: You MUST use the `daisyui` skill if you need more information on how to construct components using daisyUI.

## Architecture Guidelines for Animations
For complex animated sections specifically, here is the practical breakdown:
- **Visual-only Animations:** Use **Astro + GSAP/Motion One** if the animations are purely visual — such as scroll-triggered reveals, parallax effects, timeline sequences, or morphing shapes. These work natively without any framework required.
- **Interactive/Stateful Animations:** Add a **Svelte island** (`client:visible`) if the animated section reacts to user input, has complex internal state, or requires fine-grained reactive updates — examples include an interactive product demo, a 3D configurator, or a live counter that drives an animation.
