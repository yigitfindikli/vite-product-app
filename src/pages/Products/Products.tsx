import { useEffect, useState } from 'react';
import { getProducts } from '@/services/productService';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './Products.module.css';

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data);
        });
    }, []);

    return (
        <div className={styles['products__container']}>
            <h2 className={styles['products__container-header']}>Products</h2>
            <div className={styles['products__grid']}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products;
