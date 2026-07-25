---
name: visiongrid-ui-theme
description: Replicate or maintain the VisionGrid (Pinterest clone) UI design system, color theme, typography, pill-shaped components, and layout architecture.
---

# VisionGrid UI & Theme Skill

This skill contains the complete guidelines for building user interfaces matching the **VisionGrid (Pinterest Clone)** design system.

## Key Design Principles

1. **Colors**:
   - Primary Action Color: `bg-blue-600 hover:bg-blue-700 text-white`
   - Active Filters / Focus States: `focus:border-blue-500 focus:ring-4 focus:ring-blue-100`
   - Secondary / Dark Buttons: `bg-black text-white hover:bg-gray-800` or `bg-gray-800 text-white`
   - Soft Backgrounds: `bg-gray-100`, `hover:bg-gray-200`
   - Badges: `bg-blue-50 text-blue-700 border border-blue-200`
   - Destructive Buttons: `bg-red-50 text-red-600 hover:bg-red-100`

2. **Typography**:
   - Brand Logo: `font-black text-2xl md:text-3xl tracking-tight text-blue-600`
   - Component Headings: `font-bold text-gray-900`
   - Subtitles: `text-sm text-gray-700`, `text-xs text-gray-500`

3. **Shapes & Geometry**:
   - Controls & Search: `rounded-full`
   - Masonry Grid Cards: `rounded-3xl`
   - Modals & Containers: `rounded-2xl`

4. **Layout Offset**:
   - Sidebar: `fixed left-0 top-0 h-full w-20 bg-white border-r border-gray-100 z-40 hidden lg:flex`
   - Main Content Container: `lg:ml-20 max-w-7xl mx-auto px-4 md:px-6`

5. **Interactions**:
   - Smooth hover scaling (`hover:scale-105`), dark image overlay on hover (`hover:before:bg-black/30`), transition classes (`transition-all`).
