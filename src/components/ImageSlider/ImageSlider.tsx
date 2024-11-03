import { useState, useCallback, useEffect, useRef, useMemo, ImgHTMLAttributes } from 'react';
import styles from './ImageSlider.module.css';
import Button from '../Button/Button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
type NavigationMode = 'not-visible' | 'visible' | 'visible-on-hover';

interface Image extends ImgHTMLAttributes<HTMLImageElement> {
    copykey?: string | undefined | null;
}


interface ImageSliderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Array of images to display in the slider */
    images: Image[];
    /** Whether to auto-play the slider */
    autoPlay?: boolean;
    /** Whether to enable infinite circular navigation */
    circular?: boolean;
    /** Interval between auto-slides in milliseconds */
    autoSlideInterval?: number;
    /** Controls visibility of navigation buttons */
    navigationMode?: NavigationMode;
    /** Whether to enable auto-play only on hover */
    autoPlayOnHover?: boolean;
    /** Props to apply to all images */
    generalImageProps?: ImgHTMLAttributes<HTMLImageElement>;
    /** Props to apply to the content container */
    contentProps?: React.HTMLAttributes<HTMLDivElement>;
    /** Minimum swipe distance to trigger slide change */
    touchThreshold?: number;
    /** Enable touch/swipe support for mobile devices */
    swipeSupported?: boolean;
}

/**
 * ImageSlider component displays a series of images in a slider.
 * It supports auto-play, circular navigation, and customizable image and content props.
 */
const ImageSlider = ({
    images,
    autoPlay = true,
    circular = true,
    autoSlideInterval = 3000,
    navigationMode = 'visible',
    autoPlayOnHover = false,
    generalImageProps,
    contentProps,
    touchThreshold = 50,
    swipeSupported = true,
    ...rest
}: ImageSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(circular ? 1 : 0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const autoSlideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const sliderContentRef = useRef<HTMLDivElement | null>(null);
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    const imageArray = useMemo(() => {
        return circular
            ? [
                { ...images[images.length - 1], copykey: 'lastcopy' },
                ...images,
                { ...images[0], copykey: 'firstcopy' },
            ]
            : images;
    }, [circular, images]);

    const getImageKey = (image: Image, index: number): string => {
        return image.copykey ?? `default-${index}`;
    };

    const goToSlide = useCallback(
        (index: number) => {
            if (isTransitioning) return;
            setCurrentIndex(index);
            setIsTransitioning(true);
        },
        [isTransitioning]
    );

    const goToNextSlide = useCallback(() => {
        goToSlide(currentIndex + 1);
    }, [goToSlide, currentIndex]);

    const goToPreviousSlide = useCallback(() => {
        goToSlide(currentIndex - 1);
    }, [goToSlide, currentIndex]);

    const startAutoSlide = useCallback(() => {
        if (autoSlideTimeout.current) clearTimeout(autoSlideTimeout.current);
        autoSlideTimeout.current = setTimeout(goToNextSlide, autoSlideInterval);
    }, [autoSlideInterval, goToNextSlide]);

    const resetAutoSlide = useCallback(() => {
        if (autoSlideTimeout.current) clearTimeout(autoSlideTimeout.current);
        if (autoPlay || (autoPlayOnHover && isHovered)) startAutoSlide();
    }, [autoPlay, autoPlayOnHover, isHovered, startAutoSlide]);

    useEffect(() => {
        const sliderContent = sliderContentRef.current;

        const handleTransitionEnd = () => {
            setIsTransitioning(false);

            if (!circular) return;

            if (currentIndex === 0) {
                sliderContent!.style.transition = 'none';
                setCurrentIndex(imageArray.length - 2);
            } else if (currentIndex === imageArray.length - 1) {
                sliderContent!.style.transition = 'none';
                setCurrentIndex(1);
            }

            requestAnimationFrame(() => {
                sliderContent!.style.transition = '';
                resetAutoSlide();
            });
        };

        sliderContent?.addEventListener('transitionend', handleTransitionEnd);
        return () => {
            sliderContent?.removeEventListener('transitionend', handleTransitionEnd);
        };
    }, [currentIndex, imageArray.length, circular, resetAutoSlide]);

    useEffect(() => {
        resetAutoSlide();
        return () => {
            if (autoSlideTimeout.current) clearTimeout(autoSlideTimeout.current);
        };
    }, [resetAutoSlide]);

    const showPrevButton = useMemo(() => circular || currentIndex > 0, [circular, currentIndex]);
    const showNextButton = useMemo(() => circular || currentIndex < images.length - 1, [circular, currentIndex, images.length]);


    const handleButtonFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
        if (navigationMode === 'visible-on-hover') {
            e.currentTarget.blur();
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (!swipeSupported) return;
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!swipeSupported) return;
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!swipeSupported) return;

        const touchDiff = touchStartX.current - touchEndX.current;

        if (Math.abs(touchDiff) > touchThreshold) {
            if (touchDiff > 0 && showNextButton) {
                goToNextSlide();
            } else if (touchDiff < 0 && showPrevButton) {
                goToPreviousSlide();
            }
        }
    };

    return (
        <div
            className={`${styles['image-slider']} ${circular ? styles['image-slider--circular'] : ''} ${navigationMode === 'visible-on-hover' ? styles['hover-navigation'] : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            {...rest}
        >
            <div
                ref={sliderContentRef}
                className={styles['image-slider__content']}
                data-testid="image-slider-content"
                data-is-transitioning={isTransitioning}
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: isTransitioning ? 'transform 0.5s ease' : 'none',
                }}
                {...contentProps}
            >
                {imageArray.map((image, index) => (
                    <img
                        {...generalImageProps}
                        {...image}
                        key={getImageKey(image, index)}
                        data-testid={`slide-${index}`}
                        className={styles['image-slider__image']}
                    />
                ))}
            </div>

            {navigationMode !== 'not-visible' && (<div className={styles['image-slider__controls']} data-testid="image-slider-controls">
                {showPrevButton && (
                    <Button
                        tabIndex={navigationMode === 'visible-on-hover' ? -1 : 0}
                        onClick={goToPreviousSlide}
                        onFocus={handleButtonFocus}
                        aria-label="Previous Slide"
                        circle
                        layout='plain'
                        variant='secondary'
                        icon={<ChevronLeftIcon />}
                        className={`${styles['image-slider__button']} ${styles['image-slider__button--prev']}`}
                        data-testid="prev-button"
                    />

                )}
                {showNextButton && (
                    <Button
                        tabIndex={navigationMode === 'visible-on-hover' ? -1 : 0}
                        onClick={goToNextSlide}
                        onFocus={handleButtonFocus}
                        aria-label="Next Slide"
                        circle
                        layout='plain'
                        variant='secondary'
                        icon={<ChevronRightIcon />}
                        className={`${styles['image-slider__button']} ${styles['image-slider__button--next']}`}
                        data-testid="next-button"
                    />
                )}
            </div>
            )}
        </div>
    );
};

export default ImageSlider;
