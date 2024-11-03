import { render, screen, fireEvent, act } from '@testing-library/react';
import ImageSlider from '@/components/ImageSlider/ImageSlider';

describe('ImageSlider Component', () => {
    const images = [
        { id: '1', src: 'image1.jpg', alt: 'Image 1' },
        { id: '2', src: 'image2.jpg', alt: 'Image 2' },
        { id: '3', src: 'image3.jpg', alt: 'Image 3' },
    ];

    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation(
            (cb: FrameRequestCallback): number => {
                cb(0);
                return 0;
            }
        );
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    test('renders the component with images and controls', () => {
        render(<ImageSlider images={images} autoPlay={false} circular={true} />);
        expect(screen.getAllByRole('img')).toHaveLength(5);
        expect(screen.getByTestId('prev-button')).toBeInTheDocument();
        expect(screen.getByTestId('next-button')).toBeInTheDocument();
    });

    test('navigation buttons are not visible when navigationMode is "not-visible"', () => {
        render(<ImageSlider images={images} navigationMode="not-visible" />);
        expect(screen.queryByTestId('prev-button')).not.toBeInTheDocument();
        expect(screen.queryByTestId('next-button')).not.toBeInTheDocument();
    });

    test('adds hover-navigation class when navigationMode is "visible-on-hover"', () => {
        render(<ImageSlider images={images} navigationMode="visible-on-hover" />);
        const sliderContainer = screen.getByTestId('image-slider-content').parentElement;
        expect(sliderContainer).toHaveClass('hover-navigation');
    });

    test('uses custom keySrc and keyAlt props', () => {
        render(<ImageSlider images={images} autoPlay={false} circular={true} />);
        images.forEach((image, index) => {
            expect(screen.getByTestId(`slide-${index + 1}`)).toHaveAttribute('src', image.src);
            expect(screen.getByTestId(`slide-${index + 1}`)).toHaveAttribute('alt', image.alt);
        });
    });

    test('navigates to the next image on next button click', () => {
        render(<ImageSlider images={images} autoPlay={false} circular={true} />);
        fireEvent.click(screen.getByLabelText('Next Slide'));
        expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', 'image2.jpg');
    });

    test('navigates to the previous image on previous button click', () => {
        render(<ImageSlider images={images} autoPlay={false} circular={true} />);
        fireEvent.click(screen.getByLabelText('Previous Slide'));
        expect(screen.getAllByRole('img')[3]).toHaveAttribute('src', 'image3.jpg');
    });

    test('auto-slide moves to the next image automatically', () => {
        render(<ImageSlider images={images} autoPlay={true} autoSlideInterval={1000} circular={true} />);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', 'image2.jpg');
    });

    test('auto-slide stops at the last image when circular is false', () => {
        render(<ImageSlider images={images} autoPlay={true} autoSlideInterval={1000} circular={false} />);
        act(() => {
            jest.advanceTimersByTime(2000);
        });
        expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', 'image3.jpg');

        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', 'image3.jpg');
    });

    test('stops at the last image when circular is false and navigating with next button, with handleTransitionEnd', () => {
        render(<ImageSlider images={images} autoPlay={false} circular={false} />);

        const sliderContent = screen.getByTestId('image-slider-content');

        fireEvent.click(screen.getByLabelText('Next Slide'));
        act(() => {
            fireEvent.transitionEnd(sliderContent);
        });
        expect(screen.getByRole('img', { name: 'Image 2' })).toBeInTheDocument();

        fireEvent.click(screen.getByLabelText('Next Slide'));
        act(() => {
            fireEvent.transitionEnd(sliderContent);
        });
        expect(screen.getByRole('img', { name: 'Image 3' })).toBeInTheDocument();
    });

    test('blurs navigation buttons when navigationMode is "visible-on-hover"', () => {
        render(<ImageSlider images={images} navigationMode="visible-on-hover" />);
        const prevButton = screen.getByTestId('prev-button');
        const nextButton = screen.getByTestId('next-button');

        prevButton.focus();
        expect(document.activeElement).not.toBe(prevButton);

        nextButton.focus();
        expect(document.activeElement).not.toBe(nextButton);
    });

    test('navigates to the next image with Enter key', () => {
        render(<ImageSlider images={images} autoPlay={false} circular={true} />);
        const nextButton = screen.getByTestId('next-button');

        fireEvent.keyDown(nextButton, { key: 'Enter' });
        expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', 'image2.jpg');
    });

    test('navigates to the previous image with Space key', () => {
        render(<ImageSlider images={images} autoPlay={false} circular={true} />);
        const prevButton = screen.getByTestId('prev-button');

        fireEvent.keyDown(prevButton, { key: ' ' });
        expect(screen.getAllByRole('img')[3]).toHaveAttribute('src', 'image3.jpg');
    });

    test('starts auto-slide on hover when autoPlayOnHover is true', () => {
        render(
            <ImageSlider images={images} autoPlay={false} autoPlayOnHover={true} autoSlideInterval={1000} circular={true} />
        );
        const sliderContent = screen.getByTestId('image-slider-content').parentElement!;

        fireEvent.mouseEnter(sliderContent);

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', 'image2.jpg');

        fireEvent.mouseLeave(sliderContent);
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', 'image2.jpg');
    });

    test('prioritizes autoPlayOnHover over autoPlay when both are true and hovered', () => {
        render(
            <ImageSlider images={images} autoPlay={true} autoPlayOnHover={true} autoSlideInterval={1000} circular={true} />
        );
        const sliderContent = screen.getByTestId('image-slider-content').parentElement!;

        fireEvent.mouseEnter(sliderContent);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', 'image2.jpg');

        fireEvent.mouseLeave(sliderContent);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(screen.getAllByRole('img')[3]).toHaveAttribute('src', 'image3.jpg');
    });

    test('handleTransitionEnd correctly updates currentIndex in circular mode', () => {
        render(
            <ImageSlider images={images} autoPlay={false} circular={true} autoSlideInterval={1000} />
        );
        const sliderContent = screen.getByTestId('image-slider-content');

        act(() => {
            fireEvent.transitionEnd(sliderContent);
        });
        expect(screen.getAllByRole('img')[images.length - 1]).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('next-button'));
        act(() => {
            fireEvent.transitionEnd(sliderContent);
        });
        expect(screen.getAllByRole('img')[1]).toBeInTheDocument();
    });

    test('handleTransitionEnd sets currentIndex to last item when currentIndex is 0 in circular mode', () => {
        render(
            <ImageSlider images={images} autoPlay={false} circular={true} />
        );

        const sliderContent = screen.getByTestId('image-slider-content');

        fireEvent.click(screen.getByTestId('prev-button'));
        act(() => {
            fireEvent.transitionEnd(sliderContent);
        });

        expect(sliderContent.style.transition).toBe('none');
        expect(screen.getAllByRole('img')[images.length - 1]).toBeInTheDocument();
    });

    test('handleTransitionEnd sets currentIndex to 1 when currentIndex is the last image in circular mode', () => {
        render(
            <ImageSlider images={images} autoPlay={false} circular={true} />
        );

        const sliderContent = screen.getByTestId('image-slider-content');

        fireEvent.click(screen.getByTestId('prev-button'));
        act(() => {
            fireEvent.transitionEnd(sliderContent);
        });

        images.forEach(() => {
            fireEvent.click(screen.getByTestId('next-button'));
        });

        act(() => {
            fireEvent.transitionEnd(sliderContent);
        });

        expect(sliderContent.style.transition).toBe('none');
        expect(screen.getAllByRole('img')[1]).toBeInTheDocument();
    });

    test('navigates to next slide on left swipe when swipeSupported is true', () => {
        render(<ImageSlider images={images} autoPlay={false} circular={true} />);

        const slider = screen.getByTestId('image-slider-content').parentElement!;

        fireEvent.touchStart(slider, { touches: [{ clientX: 200 }] });
        fireEvent.touchMove(slider, { touches: [{ clientX: 100 }] });
        fireEvent.touchEnd(slider);

        expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', 'image2.jpg');
    });

    test('navigates to previous slide on right swipe when swipeSupported is true', () => {
        render(<ImageSlider images={images} autoPlay={false} circular={true} />);

        const slider = screen.getByTestId('image-slider-content').parentElement!;

        fireEvent.touchStart(slider, { touches: [{ clientX: 100 }] });
        fireEvent.touchMove(slider, { touches: [{ clientX: 200 }] });
        fireEvent.touchEnd(slider);

        expect(screen.getAllByRole('img')[3]).toHaveAttribute('src', 'image3.jpg');
    });

    test('does not navigate when swipe distance is less than touchThreshold', () => {
        render(<ImageSlider images={images} autoPlay={false} circular={true} touchThreshold={100} />);

        const slider = screen.getByTestId('image-slider-content').parentElement!;
        const initialImage = screen.getAllByRole('img')[2].getAttribute('src');

        fireEvent.touchStart(slider, { touches: [{ clientX: 150 }] });
        fireEvent.touchMove(slider, { touches: [{ clientX: 100 }] });
        fireEvent.touchEnd(slider);

        expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', initialImage!);
    });

    test('does not navigate when swipeSupported is false', () => {
        render(<ImageSlider images={images} autoPlay={false} circular={true} swipeSupported={false} />);

        const slider = screen.getByTestId('image-slider-content').parentElement!;
        const initialImage = screen.getAllByRole('img')[2].getAttribute('src');

        fireEvent.touchStart(slider, { touches: [{ clientX: 200 }] });
        fireEvent.touchMove(slider, { touches: [{ clientX: 50 }] });
        fireEvent.touchEnd(slider);

        expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', initialImage!);
    });

    test('respects circular prop when swiping at boundaries', () => {
        render(<ImageSlider images={images} autoPlay={false} circular={false} />);

        const slider = screen.getByTestId('image-slider-content').parentElement!;

        fireEvent.touchStart(slider, { touches: [{ clientX: 200 }] });
        fireEvent.touchMove(slider, { touches: [{ clientX: 50 }] });
        fireEvent.touchEnd(slider);

        fireEvent.touchStart(slider, { touches: [{ clientX: 200 }] });
        fireEvent.touchMove(slider, { touches: [{ clientX: 50 }] });
        fireEvent.touchEnd(slider);

        fireEvent.touchStart(slider, { touches: [{ clientX: 200 }] });
        fireEvent.touchMove(slider, { touches: [{ clientX: 50 }] });
        fireEvent.touchEnd(slider);

        expect(screen.getAllByRole('img')[2]).toHaveAttribute('src', 'image3.jpg');
    });
});
