import { FC } from 'react';
import styles from './ProductCard.module.css';
import { Product } from '@/types/product';
import { useNavigate } from 'react-router-dom';
import ImageSlider from '@/components/ImageSlider/ImageSlider';
import Rating from '@/components/Rating/Rating';
interface ProductCardProps {
    product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <div className={styles['product-card']} data-testid="product-card" onClick={handleClick}>
            <div className={styles['product-card__image-container']}>
                <ImageSlider
                    images={product.images}
                    autoPlayOnHover
                    autoPlay={false}
                    navigationMode="not-visible"
                    autoSlideInterval={1500}
                    circular
                />
            </div>
            <div className={styles['product-card__header']}>
                <div className={styles['product-card__header-left']}>
                    <h3 className={styles['product-card__name']}>
                        {product.name}
                    </h3>
                    <div className={styles['product-card__rating']}>
                        <Rating
                            id="rating"
                            value={product.rating}
                            max={5}
                            interactive={false}
                        />
                        <span className={styles['product-card__rating-count']}>({product.totalRatings})</span>
                    </div>
                </div>

                <p className={styles['product-card__price']}>
                    ${product.price}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
