'use client';

import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { formatINR } from '@/lib/utils/currency';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
    const { state, dispatch } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleUpdateQuantity = (productId: number, newQuantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity: newQuantity } });
    };

    const handleRemoveItem = (productId: number) => {
        dispatch({ type: 'REMOVE_ITEM', payload: productId });
    };

    const handleCheckout = async () => {
        if (state.items.length === 0) return;

        setIsCheckingOut(true);
        try {
            const checkoutData = {
                items: state.items.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity
                }))
            };

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(checkoutData),
            });

            if (response.ok) {
                const result = await response.json();
                toast.success(`Order placed successfully! Order ID: ${result.orderId}`, {
                    description: `Total: ${formatINR(result.totalAmount || state.total)} • ${result.totalItems} items`,
                    duration: 5000,
                });
                dispatch({ type: 'CLEAR_CART' });
                onClose();
            } else {
                throw new Error('Checkout failed');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            toast.error('Checkout failed. Please try again.', {
                description: 'There was an issue processing your order.',
            });
        } finally {
            setIsCheckingOut(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-300" onClick={onClose}>
            <div
                className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 shadow-2xl animate-in slide-in-from-right-0 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex h-full flex-col">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 bg-gradient-to-r from-primary/5 to-blue-500/5 dark:from-primary/10 dark:to-blue-500/10">
                        <CardTitle className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <ShoppingCart className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <span className="text-xl font-bold">Shopping Cart</span>
                                {state.itemCount > 0 && (
                                    <Badge variant="secondary" className="ml-2 animate-pulse">{state.itemCount}</Badge>
                                )}
                            </div>
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-destructive hover:text-destructive-foreground transition-colors">
                            ×
                        </Button>
                    </CardHeader>

                    <Separator />

                    <CardContent className="flex-1 overflow-y-auto p-4">
                        {state.items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 p-8">
                                <div className="relative">
                                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full flex items-center justify-center">
                                        <ShoppingCart className="h-10 w-10 text-primary/60" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary/20 rounded-full animate-pulse" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Your cart is empty</h3>
                                    <p className="text-slate-500 dark:text-slate-400">Add some amazing products to get started!</p>
                                </div>
                                <Button onClick={onClose} variant="outline" className="mt-4">
                                    Continue Shopping
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {state.items.map((item, index) => (
                                    <Card key={item.product.id} className="p-4 hover:shadow-lg transition-all duration-300 animate-in fade-in-0 slide-in-from-right-4" style={{ animationDelay: `${index * 100}ms` }}>
                                        <div className="flex gap-4">
                                            <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                                                <Image
                                                    src={item.product.imageUrl}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-sm line-clamp-2">{item.product.name}</h4>
                                                <p className="text-sm text-muted-foreground">{formatINR(item.product.price)}</p>

                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>

                                                        <Input
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={(e) => {
                                                                const newQuantity = parseInt(e.target.value) || 1;
                                                                handleUpdateQuantity(item.product.id, newQuantity);
                                                            }}
                                                            className="w-16 h-8 text-center"
                                                            min="1"
                                                        />

                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>

                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleRemoveItem(item.product.id)}
                                                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>

                                                <p className="text-sm font-medium mt-1">
                                                    Total: {formatINR(item.product.price * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>

                    {state.items.length > 0 && (
                        <>
                            <Separator />
                            <CardContent className="p-6 bg-gradient-to-r from-orange-500/5 to-red-500/5 dark:from-orange-500/10 dark:to-red-500/10">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-xl font-bold">
                                        <span className="text-slate-700 dark:text-slate-300">Total:</span>
                                        <span className="text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                            {formatINR(state.total)}
                                        </span>
                                    </div>

                                    <Button
                                        onClick={handleCheckout}
                                        disabled={isCheckingOut}
                                        className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                                        size="lg"
                                    >
                                        {isCheckingOut ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Processing Order...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <ShoppingCart className="h-4 w-4" />
                                                Complete Checkout
                                            </div>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
