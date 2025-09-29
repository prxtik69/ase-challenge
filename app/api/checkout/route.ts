import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '@/lib/data/products';
import { formatINR } from '@/lib/utils/currency';
import { handleAPIError, validateCartItems, APIError } from '@/lib/utils/error-handling';

export interface CartItem {
    productId: number;
    quantity: number;
}

export interface CheckoutRequest {
    items: CartItem[];
}

export async function POST(request: NextRequest) {
    try {
        const body: CheckoutRequest = await request.json();

        // Validate the request
        const validation = validateCartItems(body.items);
        if (!validation.isValid) {
            throw new APIError(validation.error || 'Invalid cart items', 400);
        }

        // Calculate total amount and items
        const totalItems = body.items.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = body.items.reduce((sum, item) => {
            const product = getProductById(item.productId);
            if (!product) {
                throw new APIError(`Product with ID ${item.productId} not found`, 404);
            }
            return sum + (product.price * item.quantity);
        }, 0);

        // Log the order to console
        console.log('=== NEW ORDER ===');
        console.log('Timestamp:', new Date().toISOString());
        console.log('Items:', body.items);
        console.log('Total items:', totalItems);
        console.log('Total amount:', formatINR(totalAmount));
        console.log('================');

        // Return success response
        return NextResponse.json({
            success: true,
            message: 'Order placed successfully!',
            orderId: `ORD-${Date.now()}`,
            totalItems,
            totalAmount
        });

    } catch (error) {
        const { message, statusCode } = handleAPIError(error);
        console.error('Checkout error:', error);
        return NextResponse.json(
            { error: message },
            { status: statusCode }
        );
    }
}
