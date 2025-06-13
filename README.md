# 🚀 Cyber-Punk 3D Portfolio

A cutting-edge, interactive 3D portfolio website built with Next.js 14, React Three Fiber, and modern web technologies. Experience a futuristic cyber-punk aesthetic with an explorable 3D room interface.

![Cyber Portfolio Preview](public/preview.gif)

## ✨ Features

### 🎮 Interactive 3D Experience
- **Explorable Room**: Navigate through a cyber-punk themed 3D environment
- **Interactive Props**: Click on laptop, drone, and door for different content sections
- **Dynamic Camera**: Smooth camera movements and transitions
- **Progressive Loading**: Optimized loading with cyber-themed spinner

### 🎨 Modern UI/UX
- **Cyber-Punk Aesthetic**: Neon colors, glowing effects, and futuristic styling
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Accessibility**: Keyboard navigation and reduced motion support
- **Performance Optimized**: 60fps on mobile devices

### 🛠️ Technical Excellence
- **Next.js 14**: Server components and app router
- **React Three Fiber**: Declarative 3D graphics
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **GSAP**: Smooth animations
- **Framer Motion**: UI animations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cyber-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🎯 Customization Guide

### 📝 Personal Information

**1. Update Your Name and Title**
```typescript
// app/page.tsx - Line 60
const ABOUT_DATA = {
  name: "YOUR NAME", // Replace with your name
  title: "Full-Stack Developer & AI Engineer", // Your title
  // ... rest of data
};
```

**2. Update Navigation Header**
```typescript
// app/page.tsx - Line 381
<motion.h1>
  YOUR NAME {/* Replace with your name */}
</motion.h1>
```

### 💼 Projects Section

**1. Add Your Projects**
```typescript
// app/page.tsx - Line 20
const PROJECTS = [
  {
    id: 1,
    title: "Your Project Name",
    description: "Project description",
    tech: ["React", "Python", "AI"], // Technologies used
    link: "https://github.com/yourusername/project", // Project link
    image: "/project-image.png" // Project image
  },
  // Add more projects...
];
```

**2. Update GitHub Link**
```typescript
// app/page.tsx - Line 246
href="https://github.com/yourusername" // Your GitHub profile
```

### 👤 About Section

**1. Update Bio and Skills**
```typescript
// app/page.tsx - Line 60
const ABOUT_DATA = {
  bio: "Your personal bio here...",
  skills: [
    "Your", "Tech", "Stack"
  ],
  stats: [
    { label: "Years Experience", value: "X+" },
    // Update your stats
  ]
};
```

**2. Update Contact Email**
```typescript
// app/page.tsx - Line 321
href="mailto:your.email@example.com" // Your email
```

### 📄 Resume

**1. Add Your Resume PDF**
- Replace `public/resume.pdf` with your actual resume
- Keep the same filename or update the path in:
```typescript
// app/components/3d/Room.tsx - Line 179
window.open('/your-resume.pdf', '_blank');
```

### 🎨 Styling & Colors

**1. Cyber-Punk Color Palette**
```typescript
// app/components/3d/Room.tsx - Line 28
const COLORS = {
  primary: '#00ffff',    // Cyan - Change to your preference
  secondary: '#ff00ff',  // Magenta
  accent: '#ffff00',     // Yellow
  neon: '#00ff41',       // Matrix green
  warning: '#ff3333',    // Red
};
```

**2. Tailwind Classes**
Customize colors throughout the components using Tailwind classes:
- `text-cyan-400` for text colors
- `border-cyan-400` for borders
- `bg-cyan-400` for backgrounds

### 🖼️ Assets

**1. Add Custom Fonts**
```bash
# Add fonts to public/fonts/
public/fonts/cyber-font.woff
```

**2. Add Images**
```bash
# Add project images to public/
public/project1.png
public/project2.png
```

## 📱 Performance Optimization

### Mobile Performance
- Reduced polygon count for mobile devices
- Disabled anti-aliasing for better performance
- Limited device pixel ratio to 1.5x max
- Progressive loading with suspense

### Accessibility
- Respects `prefers-reduced-motion`
- Keyboard navigation support
- WebGL fallback for unsupported browsers
- Screen reader friendly

## 🛠️ Development

### Project Structure
```
app/
├── components/
│   └── 3d/
│       ├── Room.tsx       # Main 3D scene
│       ├── Laptop.tsx     # Projects component
│       ├── Drone.tsx      # About component
│       └── Door.tsx       # Resume component
├── page.tsx               # Main portfolio page
└── layout.tsx             # Root layout

public/
├── resume.pdf             # Your resume
└── fonts/                 # Custom fonts
```

### Key Components

**Room.tsx**: Main 3D environment with lighting, interactive objects, and camera controls

**ModalsContainer**: Handles UI overlays outside the 3D canvas to avoid Three.js conflicts

**UIOverlay**: Navigation and help system

### Technologies Used

- **Next.js 14**: React framework with app router
- **React Three Fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers for R3F
- **GSAP**: Animation library
- **Framer Motion**: React animation library
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type safety

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Other Platforms
```bash
npm run build
npm start
```

## 🐛 Troubleshooting

### Common Issues

**1. "next: command not found"**
```bash
npm install --legacy-peer-deps
```

**2. WebGL not working**
- The site includes a fallback for browsers without WebGL support
- Check browser compatibility

**3. Performance issues**
- Reduce the number of particles in the scene
- Lower the shadow quality
- Disable animations for slower devices

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

If you have questions or need help customizing, feel free to open an issue or reach out!

---

**Made with ❤️ and cutting-edge web technologies**

*Transform your portfolio into a cyber-punk experience* 🌆
