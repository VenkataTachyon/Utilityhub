// This file must be imported in the root layout to configure Font Awesome for Next.js.
// It disables FA's auto CSS injection (which breaks with SSR) and ensures icons
// are rendered as inline SVG from the start — no hydration flash, no gear fallback.
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // We load FA CSS manually via the <link> in layout.tsx
