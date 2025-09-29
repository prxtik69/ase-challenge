import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/data/products';

export async function GET() {
    try {
        const products = getAllProducts();
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}
