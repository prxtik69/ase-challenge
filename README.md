# VertoMart - A Modern E-commerce Experience

Hey there! 👋 This is **VertoMart**, a sleek e-commerce platform I built for the ASE Challenge. It's not just another shopping site - it's a carefully crafted experience that showcases modern web development practices.

## What Makes This Special? ✨

I've put a lot of thought into making this feel like a real product, not just a demo. Here's what I'm particularly proud of:

### 🛒 **Smart Shopping Experience**

- **Dynamic Cart Management**: The "Add to Cart" button actually changes to show quantities - no more guessing what's in your cart!
- **Persistent Shopping**: Your cart survives page refreshes (thanks to localStorage)
- **Smooth Animations**: Everything feels fluid and responsive
- **Real-time Updates**: Cart badge updates instantly as you shop

### 🎨 **Beautiful Indian Design**

- **Authentic Products**: Real Indian brands like Boat, Noise, Fabindia, and traditional crafts
- **INR Pricing**: Proper Indian currency formatting (₹1,23,456 style)
- **Warm Color Palette**: Orange, red, and yellow gradients that feel welcoming
- **Mobile-First**: Looks great on any device

### 🏗️ **Clean Architecture**

I've organized this project properly - no hardcoded values scattered around:

- **Centralized Data**: All products in one place (`lib/data/products.ts`)
- **Utility Functions**: Currency formatting, error handling, and validation
- **Type Safety**: Full TypeScript coverage with proper interfaces
- **Error Handling**: Graceful error management throughout

## Tech Stack That Actually Works 🚀

- **Next.js 15**: Latest features with App Router
- **TypeScript**: Type safety everywhere
- **ShadCN UI**: Beautiful, accessible components
- **Tailwind CSS**: Utility-first styling
- **React Context**: Clean state management
- **Jest**: Proper testing setup

## Getting Started (It's Easy!) 🛠️

```bash
# Clone and install
git clone <your-repo>
cd verto-challenge
npm install

# Start developing
npm run dev

# Open http://localhost:3000 and start shopping!
```

## Project Structure (How I Organized It) 📁

```
verto-challenge/
├── app/                    # Next.js 15 App Router
│   ├── api/               # Clean API endpoints
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx          # Main shopping page
├── components/            # Reusable UI components
│   ├── ui/               # ShadCN components
│   ├── ProductCard.tsx   # Product display
│   └── Cart.tsx          # Shopping cart modal
├── lib/                   # Business logic
│   ├── data/             # Product data layer
│   └── utils/            # Utility functions
├── contexts/              # React Context for state
└── types/                # TypeScript definitions
```

## API Design (Clean & Simple) 🔧

### Products Endpoint

```typescript
GET / api / products;
// Returns: Array of products with proper error handling
```

### Checkout Endpoint

```typescript
POST / api / checkout;
// Body: { items: [{ productId: number, quantity: number }] }
// Returns: { success: true, orderId: string, totalAmount: number }
```

## Testing (Because Quality Matters) 🧪

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode for development
```

I've included tests for the products API to ensure reliability.

## Deployment Ready 🚀

This is production-ready! Deploy to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- Any Node.js hosting platform

```bash
npm run build    # Build for production
npm start        # Start production server
```

## The Developer Behind This 👨‍💻

**Pratik Deshpande** - Built this for the ASE Challenge

I wanted to create something that demonstrates not just technical skills, but also attention to user experience and code quality. Every component, every utility function, and every API endpoint was designed with maintainability in mind.

## Why This Approach? 🤔

Instead of just making it work, I focused on:

- **Maintainable Code**: Easy to extend and modify
- **User Experience**: Smooth interactions and clear feedback
- **Developer Experience**: Clean APIs and proper error handling
- **Real-world Patterns**: How I'd structure a production application

This isn't just a coding challenge submission - it's a showcase of how I approach real-world problems with clean, scalable solutions.

---

_Built by Pratik for ASE Challenge and lots of coffee ☕_
