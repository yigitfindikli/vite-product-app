import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '@/services/productService';
import { Product } from '@/types/product';
import Rating from '@/components/Rating/Rating';
import ImageSlider from '@/components/ImageSlider/ImageSlider';
import { Tab, TabView } from '@/components/TabView/TabView';
import Button from '@/components/Button/Button';
import styles from './ProductDetail.module.css';
import { Comments } from '@/components/Comments/Comments';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { User } from '@/types/auth';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (id) {
            getProductById(id).then((data) => {
                if (data) {
                    setProduct(data);
                } else {
                    navigate('/products');
                }
            });
        }
    }, [id, navigate]);

    const handleAddComment = (data: { comment: string; rating: number }) => {
        const newComment = {
            id: new Date().getTime().toString(),
            username: (user as User).username,
            comment: data.comment,
            rating: data.rating
        };

        if (product) {
            setProduct({
                ...product,
                comments: [...product.comments, newComment]
            });
        }
    };

    const averageRating = useMemo(() => {
        return product?.comments.length
            ? (
                product.comments.reduce((sum, c) => sum + c.rating, 0) / product.comments.length
            ).toFixed(1)
            : 'N/A';
    }, [product?.comments]);

    if (!product) {
        return null;
    }

    return (
        <div className={styles['product-detail-page']}>
            <div className={styles['product-detail-page__header']}>
                <Button variant="secondary" data-testid="back-to-products-button" layout="outlined" icon={<ArrowLeftIcon />} onClick={() => navigate('/products')} />
                <h2>Back to Products</h2>
            </div>
            <div className={styles['product-detail-page__product-card']}>
                <div className={styles['product-detail-page__product-card-image']}>
                    <ImageSlider
                        images={product.images}
                        autoPlay={false}
                        circular={true}
                        autoPlayOnHover={false}
                        navigationMode="visible-on-hover"
                    />
                </div>

                <div className={styles['product-detail-page__product-card-info']}>
                    <div className={styles['product-detail-page__product-card-info-header']}>
                        <div className={styles['product-detail-page__product-card-info-header-top']}>
                            <div className={styles['product-detail-page__product-card-info-header-left']}>
                                <h2>{product.name}</h2>
                                <div className={styles['product-detail-page__product-card-info-header-rating']}>
                                    <Rating
                                        id="product-rating"
                                        value={+averageRating}
                                        max={5}
                                        interactive={false}
                                    />
                                    <span>({averageRating})</span>
                                </div>
                            </div>
                            <span className={styles['product-detail-page__product-card-info-header-price']}>
                                ${product.price}
                            </span>
                        </div>
                        <span className={styles['product-detail-page__product-card-info-header-arrival-date']}>
                            Arrival Date:{' '}
                            <span>
                                {new Date(
                                    product.arrivalDate
                                ).toLocaleDateString('en-US')}
                            </span>
                        </span>
                    </div>
                    <TabView>
                        <Tab label="Details" id="details">
                            <div className={styles['product-detail-page__details-container']}>
                                <h3>Product Details</h3>
                                <p>{product?.description}</p>
                            </div>
                        </Tab>
                        <Tab label="Comments & Ratings" id="comments">
                            <Comments comments={product.comments} onAddComment={handleAddComment} />
                        </Tab>
                    </TabView>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
