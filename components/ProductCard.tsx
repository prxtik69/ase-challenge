'use client';

import { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, ShoppingCart, Check } from 'lucide-react';
import { formatINR } from '@/lib/utils/currency';
import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { state, dispatch } = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const cartItem = state.items.find(item => item.product.id === product.id);
    const quantity = cartItem?.quantity || 0;

    const handleAddToCart = async () => {
        setIsLoading(true);
        // Simulate a brief loading state for better UX
        await new Promise(resolve => setTimeout(resolve, 200));
        dispatch({ type: 'ADD_ITEM', payload: product });
        setIsLoading(false);
    };

    const handleUpdateQuantity = (newQuantity: number) => {
        if (newQuantity <= 0) {
            dispatch({ type: 'REMOVE_ITEM', payload: product.id });
        } else {
            dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: product.id, quantity: newQuantity } });
        }
    };

    return (
        <Card className="group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02] border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
            <CardHeader className="p-0 relative">
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                    {!imageLoaded && (
                        <Skeleton className="w-full h-full" />
                    )}
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className={`object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(true)}
                    />
                    {product.category && (
                        <Badge
                            variant="secondary"
                            className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white hover:bg-white/95 dark:hover:bg-slate-900/95 shadow-lg backdrop-blur-sm border-0"
                        >
                            {product.category}
                        </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            </CardHeader>

            <CardContent className="p-6 space-y-3">
                <h3 className="font-bold text-xl mb-2 line-clamp-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                    {product.name}
                </h3>
                {product.description && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                )}
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        {formatINR(product.price)}
                    </span>
                </div>
            </CardContent>

            <CardFooter className="p-6 pt-0">
                {quantity === 0 ? (
                    <Button
                        onClick={handleAddToCart}
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                        size="lg"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Adding...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <ShoppingCart className="h-4 w-4" />
                                Add to Cart
                            </div>
                        )}
                    </Button>
                ) : (
                    <div className="w-full flex items-stretch gap-2 h-12">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(quantity - 1)}
                            className="flex-1 hover:bg-destructive hover:text-destructive-foreground transition-colors duration-200 h-full"
                        >
                            <Minus className="h-4 w-4" />
                        </Button>

                        <div className="flex-1 flex items-center justify-center gap-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg px-4 border border-orange-200 dark:border-orange-800">
                            <Check className="h-4 w-4 text-orange-600" />
                            <span className="font-semibold text-orange-700 dark:text-orange-300">{quantity} in cart</span>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(quantity + 1)}
                            className="flex-1 hover:bg-orange-600 hover:text-white transition-colors duration-200 h-full"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
