# NextJS TypeScript shadcn/ui Template - Ready to Use

A modern, production-ready starter template built with Next.js 14, TypeScript, shadcn/ui components, and built-in protected routes authentication.

![Homepage](https://github.com/user-attachments/assets/7449f583-489b-4f85-81ff-2fb21309b6df)

## ✨ Features

- 🚀 **Next.js 14** with App Router
- 🔷 **TypeScript** for type safety
- 🎨 **shadcn/ui** components for beautiful UI
- 🔐 **Protected routes** with role-based access control
- 📱 **Responsive design** with Tailwind CSS
- 🔄 **Authentication system** with login/logout
- 🎯 **Clean architecture** and organized code structure
- ⚡ **Fast performance** and SEO optimized

## 🖼️ Screenshots

### Homepage
![Homepage](https://github.com/user-attachments/assets/7449f583-489b-4f85-81ff-2fb21309b6df)

### Dashboard
![Dashboard](https://github.com/user-attachments/assets/09e93101-3051-40ff-9f92-2a2980eba652)

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/AbdelrahmanTarek790/NextJSTS-Shadcn-Template.git
   cd NextJSTS-Shadcn-Template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials

Use these credentials to test the authentication system:

- **Admin User**: `admin@example.com` / `admin`
- **Regular User**: `user@example.com` / `password`

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── dashboard/         # Protected dashboard pages
│   ├── login/            # Authentication pages
│   └── globals.css       # Global styles with shadcn/ui
├── components/
│   ├── layouts/          # Layout components
│   │   ├── DashboardLayout.tsx
│   │   ├── Header.tsx
│   │   ├── AppSidebar.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── ui/              # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       ├── dropdown-menu.tsx
│       └── ...
├── context/             # React Context providers
│   └── AuthContext.tsx  # Authentication context
├── lib/
│   └── utils.ts         # Utility functions
└── types/              # TypeScript type definitions
```

## 🛡️ Protected Routes

The template includes a robust authentication system:

- **Public routes**: Homepage, login page
- **Protected routes**: Dashboard and all sub-pages
- **Role-based access**: Admin users see additional navigation options
- **Automatic redirects**: Unauthenticated users are redirected to login

## 🎨 UI Components

Built with [shadcn/ui](https://ui.shadcn.com/) components:

- ✅ Button variants and sizes
- ✅ Form inputs and validation
- ✅ Navigation menus
- ✅ Dropdowns and modals
- ✅ Avatars and user profiles
- ✅ Sidebar navigation
- ✅ Cards and layouts
- ✅ Dark/light mode ready

## 🔧 Configuration

### Adding New UI Components

Use the shadcn/ui CLI to add more components:

```bash
npx shadcn@latest add [component-name]
```

### Customizing Authentication

The authentication system is located in `src/context/AuthContext.tsx`. You can:

- Replace mock authentication with your API
- Add more user roles
- Implement password reset functionality
- Add social login providers

### Styling and Theming

- Edit `src/app/globals.css` for global styles
- Modify `tailwind.config.ts` for custom themes
- Update CSS variables in globals.css for color schemes

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` folder to [Netlify](https://netlify.com)

### Deploy to Other Platforms

The template works with any platform that supports Next.js:
- AWS Amplify
- Railway
- Heroku
- DigitalOcean App Platform

## 🧰 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💡 Support

If you find this template helpful, please consider giving it a star ⭐

---

Built with ❤️ using Next.js, TypeScript, and shadcn/ui
