'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { Cart } from '@/components/Cart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const { state } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-slate-900 dark:via-orange-900/20 dark:to-red-900/20">
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-orange-200/50 dark:border-orange-700/50 sticky top-0 z-40 shadow-lg shadow-orange-200/20 dark:shadow-orange-900/20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent">
                VertoMart
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Your premium Indian shopping destination
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => setCartOpen(true)}
              className="relative group hover:bg-orange-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg border-orange-200 hover:border-orange-600"
            >
              <ShoppingCart className="h-5 w-5 mr-2 group-hover:animate-bounce" />
              <span className="font-semibold">Cart</span>
              {state.itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs font-bold animate-pulse bg-orange-600"
                >
                  {state.itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16">

      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">Loading amazing products...</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Please wait while we prepare your shopping experience</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 text-white py-8 mt-16">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">

              <h3 className="text-2xl font-bold">VertoMart</h3>
            </div>
            <p className="text-orange-100 text-lg">
              Developed by <span className="font-bold text-white">Pratik Deshpande</span> for ASE Challenge
            </p>


          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
