# 🎨 VisionGrid UI & Theme Specification Guide

Use this document to replicate the exact look, feel, design system, and component patterns of the **VisionGrid (Pinterest Clone)** interface in any other web project.

---

## 🏛️ Design System Overview

* **Design Aesthetic**: Premium visual discovery layout with clean white backgrounds, high-contrast typography, pill-shaped UI controls, smooth hover transitions, and rounded card geometry.
* **Color Palette**:
  * **Primary Accent**: Royal Blue (`#2563EB` / `bg-blue-600`, `hover:bg-blue-700`, `text-blue-600`)
  * **Focus Ring / Soft Highlights**: Soft Blue (`bg-blue-50`, `text-blue-700`, `focus:ring-blue-100`)
  * **Dark Neutral / Action Controls**: Midnight Black (`bg-black text-white hover:bg-gray-800` / `bg-gray-800`)
  * **Light Neutral Fills**: Slate/Cloud Gray (`bg-gray-100`, `hover:bg-gray-200`, `bg-[#e9e9e9]`)
  * **Borders & Lines**: Hairline Slate (`border-gray-100`, `border-gray-200`)
  * **Destructive Actions**: Soft Crimson (`bg-red-50 text-red-600 hover:bg-red-100`)
* **Typography**:
  * **Brand Logo**: `font-black text-2xl md:text-3xl tracking-tight text-blue-600`
  * **Headings**: `font-bold text-gray-900`
  * **Body / Subtitles**: `text-sm text-gray-700` / `text-xs text-gray-500`
* **Border Radii Guidelines**:
  * **Buttons & Search Inputs**: Fully Pill (`rounded-full`)
  * **Grid Pin Cards**: High Rounding (`rounded-3xl`)
  * **Detail Images & Form Cards**: Rounded Corners (`rounded-2xl` or `rounded-xl`)

---

## 🧩 Core UI Component Blueprints

### 1. Navigation Header (`Header.tsx`)
```tsx
<div className="flex justify-between gap-4 items-center p-4 md:px-6 lg:ml-20 bg-white sticky top-0 z-30 border-b border-gray-100 shadow-xs">
  {/* Logo */}
  <div className="flex items-center cursor-pointer transition shrink-0" onClick={() => router.push('/')}>
    <span className="font-black text-2xl md:text-3xl tracking-tight text-blue-600 hover:text-blue-700 transition">VisionGrid</span>
  </div>

  {/* Nav Links */}
  <div className="flex items-center gap-2">
    <button className="bg-black text-white p-2.5 px-5 rounded-full text-sm font-semibold shrink-0 hidden md:block cursor-pointer hover:bg-gray-800 transition">Home</button>
    <button className="font-semibold p-2.5 px-5 rounded-full text-sm cursor-pointer shrink-0 hover:bg-gray-100 transition">Create</button>
  </div>

  {/* Search Bar */}
  <div className="relative flex-1 max-w-2xl hidden md:flex items-center group">
    <HiSearch className="absolute left-4 text-xl text-gray-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" />
    <input 
      type="text" 
      placeholder="Search visual posts, categories, or keywords..."
      className="w-full bg-gray-100 focus:bg-white text-gray-800 text-sm font-medium pl-11 pr-10 py-2.5 rounded-full outline-none border border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-inner focus:shadow-none" 
    />
  </div>

  {/* Avatar / Sign-in */}
  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2.5 px-6 rounded-full transition cursor-pointer shrink-0 text-sm shadow-sm">
    Login
  </button>
</div>
```

### 2. Desktop Sidebar (`Sidebar.tsx`)
```tsx
<div className="hidden lg:flex flex-col items-center py-6 gap-6 fixed left-0 top-0 h-full w-20 bg-white border-r border-gray-100 z-40">
  <button className="p-3 hover:bg-gray-100 rounded-2xl transition cursor-pointer text-gray-700 hover:text-blue-600" title="Home">
    <HiHome className="text-2xl" />
  </button>
  <button className="p-3 hover:bg-gray-100 rounded-2xl transition cursor-pointer text-gray-700 hover:text-blue-600" title="Create">
    <HiPlus className="text-2xl" />
  </button>
  <div className="flex-1"></div>
  <button className="p-3 hover:bg-gray-100 rounded-2xl transition cursor-pointer text-gray-700 hover:text-blue-600" title="Profile">
    <HiUser className="text-2xl" />
  </button>
</div>
```

### 3. Category Filter Bar (`CategoryFilter.tsx`)
```tsx
<div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar max-w-full">
  {categories.map((cat) => (
    <button
      key={cat}
      className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all cursor-pointer ${
        selectedCategory === cat
          ? "bg-blue-600 text-white shadow-md scale-105"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {cat}
    </button>
  ))}
</div>
```

### 4. Grid Post Card (`PinItem.jsx`)
```jsx
<div className="relative group">
  <div className="relative before:absolute before:h-full before:w-full before:rounded-3xl before:z-10 hover:before:bg-black/30 transition cursor-pointer">
    <img 
      src={image} 
      alt={title} 
      className="rounded-3xl cursor-pointer relative z-0 object-cover w-full h-auto" 
    />
    {isOwner && (
      <button className="absolute top-3 right-3 z-20 bg-white/90 hover:bg-white text-red-600 p-2.5 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 hover:scale-105 cursor-pointer">
        <HiTrash className="text-xl" />
      </button>
    )}
  </div>
  <h2 className="font-bold text-[18px] mb-1 mt-2 line-clamp-2">{title}</h2>
  <UserTag user={user} />
</div>
```

### 5. Detail Page & Actions (`PinInfo.jsx` & `PinActions.jsx`)
```jsx
<div className="flex flex-col h-full">
  <div className="flex items-center justify-between gap-2 mb-4">
    <span className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
      {category}
    </span>
    <button className={`px-6 py-2 rounded-full font-semibold transition cursor-pointer text-sm ${isSaved ? "bg-gray-800 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
      {isSaved ? "✓ Saved" : "Save"}
    </button>
  </div>
  <h2 className="text-2xl font-bold mb-4">{title}</h2>
  
  {/* Like Toggle */}
  <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-full transition cursor-pointer self-start mb-4">
    {liked ? <HiHeart className="text-2xl text-blue-600" /> : <HiOutlineHeart className="text-2xl text-gray-700" />}
    <span className="font-semibold text-sm text-gray-700">{likeCount}</span>
  </button>
</div>
```

---

## 💡 How to apply this UI theme in another project with Antigravity
When creating or styling another application with Antigravity:
1. Place this `UI_STYLE_GUIDE.md` or the `.agents/skills/visiongrid-ui-theme/SKILL.md` folder into the target workspace root.
2. Tell Antigravity: *"Follow the UI style guide in `UI_STYLE_GUIDE.md` for all components and styling."*
