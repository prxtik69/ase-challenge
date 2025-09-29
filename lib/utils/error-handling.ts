/**
 * Custom error class for API errors
 */
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Handles API errors and returns appropriate responses
 */
export function handleAPIError(error: unknown): { message: string; statusCode: number } {
  if (error instanceof APIError) {
    return {
      message: error.message,
      statusCode: error.statusCode
    };
  }

  if (error instanceof Error) {
    console.error('Unexpected error:', error);
    return {
      message: 'Internal server error',
      statusCode: 500
    };
  }

  return {
    message: 'Unknown error occurred',
    statusCode: 500
  };
}

/**
 * Interface for cart item validation
 */
interface CartItemInput {
  productId?: unknown;
  quantity?: unknown;
}

/**
 * Validates cart items
 */
export function validateCartItems(items: unknown): { isValid: boolean; error?: string } {
  if (!Array.isArray(items)) {
    return { isValid: false, error: 'Items must be an array' };
  }

  if (items.length === 0) {
    return { isValid: false, error: 'Cart cannot be empty' };
  }

  for (const item of items) {
    const cartItem = item as CartItemInput;
    if (!cartItem.productId || typeof cartItem.productId !== 'number') {
      return { isValid: false, error: 'Invalid product ID' };
    }
    if (!cartItem.quantity || typeof cartItem.quantity !== 'number' || cartItem.quantity <= 0) {
      return { isValid: false, error: 'Invalid quantity' };
    }
  }

  return { isValid: true };
}
