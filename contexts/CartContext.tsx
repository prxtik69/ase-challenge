'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product, CartItem, Cart } from '@/types';
import { toast } from 'sonner';

interface CartState {
    items: CartItem[];
    total: number;
    itemCount: number;
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: Product }
    | { type: 'REMOVE_ITEM'; payload: number }
    | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'LOAD_CART'; payload: CartItem[] };

const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find(item => item.product.id === action.payload.id);

            if (existingItem) {
                const updatedItems = state.items.map(item =>
                    item.product.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                toast.success(`${action.payload.name} quantity updated!`);
                return calculateTotals({ ...state, items: updatedItems });
            }

            const newItem: CartItem = {
                product: action.payload,
                quantity: 1
            };
            toast.success(`${action.payload.name} added to cart!`);
            return calculateTotals({ ...state, items: [...state.items, newItem] });
        }

        case 'REMOVE_ITEM': {
            const itemToRemove = state.items.find(item => item.product.id === action.payload);
            const updatedItems = state.items.filter(item => item.product.id !== action.payload);
            if (itemToRemove) {
                toast.info(`${itemToRemove.product.name} removed from cart`);
            }
            return calculateTotals({ ...state, items: updatedItems });
        }

        case 'UPDATE_QUANTITY': {
            if (action.payload.quantity <= 0) {
                const updatedItems = state.items.filter(item => item.product.id !== action.payload.productId);
                return calculateTotals({ ...state, items: updatedItems });
            }

            const updatedItems = state.items.map(item =>
                item.product.id === action.payload.productId
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
            return calculateTotals({ ...state, items: updatedItems });
        }

        case 'CLEAR_CART':
            toast.success('Cart cleared successfully!');
            return { items: [], total: 0, itemCount: 0 };

        case 'LOAD_CART':
            return calculateTotals({ ...state, items: action.payload });

        default:
            return state;
    }
}

function calculateTotals(state: CartState): CartState {
    const total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    return { ...state, total, itemCount };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, {
        items: [],
        total: 0,
        itemCount: 0
    });

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const cartItems = JSON.parse(savedCart);
                dispatch({ type: 'LOAD_CART', payload: cartItems });
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.items));
    }, [state.items]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
