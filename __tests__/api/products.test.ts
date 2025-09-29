import { GET } from '@/app/api/products/route';
import { NextRequest } from 'next/server';

describe('/api/products', () => {
    it('should return a list of products', async () => {
        const response = await GET();
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
    });

    it('should return products with required fields', async () => {
        const response = await GET();
        const data = await response.json();

        expect(response.status).toBe(200);

        data.forEach((product: any) => {
            expect(product).toHaveProperty('id');
            expect(product).toHaveProperty('name');
            expect(product).toHaveProperty('price');
            expect(product).toHaveProperty('imageUrl');
            expect(typeof product.id).toBe('number');
            expect(typeof product.name).toBe('string');
            expect(typeof product.price).toBe('number');
            expect(typeof product.imageUrl).toBe('string');
        });
    });

    it('should return products with valid data types', async () => {
        const response = await GET();
        const data = await response.json();

        expect(response.status).toBe(200);

        data.forEach((product: any) => {
            expect(product.id).toBeGreaterThan(0);
            expect(product.name.length).toBeGreaterThan(0);
            expect(product.price).toBeGreaterThan(0);
            expect(product.imageUrl).toMatch(/^https?:\/\/.+/);
        });
    });

    it('should return at least 5 products', async () => {
        const response = await GET();
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.length).toBeGreaterThanOrEqual(5);
    });
});
