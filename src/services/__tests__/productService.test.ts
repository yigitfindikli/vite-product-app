import { getProducts, getProductById, mockProducts } from '../productService';

describe('Product Service', () => {

    test('getProducts returns the full list of products', async () => {
        const products = await getProducts();
        expect(products).toEqual(mockProducts);
    });

    test('getProductById returns the correct product for a valid ID', async () => {
        const product = await getProductById('air-force-1-07-white');
        expect(product).toEqual(mockProducts[0]);
    });

    test('getProductById returns undefined for an invalid ID', async () => {
        const product = await getProductById('invalid-id');
        expect(product).toBeUndefined();
    });
});
