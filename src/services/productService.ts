import { Product } from '@/types/product';

export const mockProducts: Product[] = [
    {
        id: 'air-force-1-07-white',
        name: 'Air Force 1 07',
        price: 100,
        rating: 4.0,
        images: [
            { id: 'air-force-1-07-white-1', src: '/images/products/air-force-white-1.png', alt: 'Image of Product 1 - 1' },
            { id: 'air-force-1-07-white-2', src: '/images/products/air-force-white-2.png', alt: 'Image of Product 1 - 2' },
            { id: 'air-force-1-07-white-3', src: '/images/products/air-force-white-3.png', alt: 'Image of Product 1 - 3' },
            { id: 'air-force-1-07-white-4', src: '/images/products/air-force-white-4.png', alt: 'Image of Product 1 - 4' },
        ],
        description: `The radiance lives on in the Nike Air Force 1 '07, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.


Colour Shown: White/White
Style: CW2288-111
Country/Region of Origin: China, India, Vietnam`,
        arrivalDate: '2024-10-01',
        comments: [
            { id: 'air-force-1-07-white-comment-1', username: 'Alice', comment: 'Great product!', rating: 4 },
            { id: 'air-force-1-07-white-comment-2', username: 'Bob', comment: 'Could be better.', rating: 3 },
        ],
        totalRatings: 2,
    },
    {
        id: 'air-force-1-flyknit-2.0-blue',
        name: 'Air Force 1 Flyknit 2.0',
        price: 200,
        rating: 3.5,
        images: [
            { id: 'air-force-1-flyknit-2.0-blue-1', src: '/images/products/air-force-blue-1.png', alt: 'Image of Product 2 - 1' },
            { id: 'air-force-1-flyknit-2.0-blue-2', src: '/images/products/air-force-blue-2.png', alt: 'Image of Product 2 - 2' },
            { id: 'air-force-1-flyknit-2.0-blue-3', src: '/images/products/air-force-blue-3.jfif', alt: 'Image of Product 2 - 3' },
            { id: 'air-force-1-flyknit-2.0-blue-4', src: '/images/products/air-force-blue-4.png', alt: 'Image of Product 2 - 4' },
        ],
        description: `Inspired by the shoe that's been reigning the courts since 1982, the Nike Air Force 1 Flyknit 2.0 brings back the AF-1 in a lighter-than-ever design.Rocking Flyknit construction with classic AF-1 design lines, it serves up old-school hoops vibes with a featherweight feel.


Colour Shown: White/Pure Platinum/White/Pure Platinum
Style: AV3042-100
Country/Region of Origin: Vietnam`,
        arrivalDate: '2024-10-15',
        comments: [
            { id: 'air-force-1-flyknit-2.0-blue-comment-1', username: 'Charlie', comment: 'Not bad', rating: 4 },
            { id: 'air-force-1-flyknit-2.0-blue-comment-2', username: 'Dave', comment: 'Too expensive.', rating: 3 },
        ],
        totalRatings: 2,
    },
    {
        id: 'air-zoom-spiridon-cage-2-black',
        name: 'Spiridon Cage 2',
        price: 300,
        rating: 5.0,
        images: [
            { id: 'air-zoom-spiridon-cage-2-black-1', src: '/images/products/air-zoom-spiridon-1.png', alt: 'Image of Product 3 - 1' },
            { id: 'air-zoom-spiridon-cage-2-black-2', src: '/images/products/air-zoom-spiridon-2.png', alt: 'Image of Product 3 - 2' },
            { id: 'air-zoom-spiridon-cage-2-black-3', src: '/images/products/air-zoom-spiridon-3.png', alt: 'Image of Product 3 - 3' },
            { id: 'air-zoom-spiridon-cage-2-black-4', src: '/images/products/air-zoom-spiridon-4.png', alt: 'Image of Product 3 - 4' },
        ],
        description: `First released in 2003, the Air Zoom Spiridon Cage 2 is as relevant today as ever. This edition retains the original design lines and signature caged Air Zoom unit wrapped in a glossy finish. A full-length, arched foam midsole delivers a cushioned ride, while the ultra-breezy upper balances mesh textiles with smooth synthetic leather. Meanwhile, durable traction pods on the outsole provide grip and stability. Step into the Cage 2 for a nod to early noughties style.


Colour Shown: Black/Anthracite/Smoke Grey/Black
Style: HM8497-010
Country/Region of Origin: Vietnam`,
        arrivalDate: '2024-10-20',
        comments: [
            { id: '5', username: 'Eve', comment: 'Excellent!', rating: 5 },
        ],
        totalRatings: 1,
    },

    {
        id: 'air-force-1-07-black',
        name: 'Air Force 1 07 Black',
        price: 100,
        rating: 4.0,
        images: [
            { id: 'air-force-1-07-black-1', src: '/images/products/air-force-black-1.png', alt: 'Image of Product 1 - 1' },
            { id: 'air-force-1-07-black-2', src: '/images/products/air-force-black-2.png', alt: 'Image of Product 1 - 2' },
            { id: 'air-force-1-07-black-3', src: '/images/products/air-force-black-3.png', alt: 'Image of Product 1 - 3' },
            { id: 'air-force-1-07-black-4', src: '/images/products/air-force-black-4.png', alt: 'Image of Product 1 - 4' },
        ],
        description: `The radiance lives on in the Nike Air Force 1 '07, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.


Colour Shown: Black/Black
Style: CW2288-111
Country/Region of Origin: China, India, Vietnam`,
        arrivalDate: '2024-10-01',
        comments: [
            { id: 'air-force-1-07-black-comment-1', username: 'Alice', comment: 'Great product!', rating: 4 },
            { id: 'air-force-1-07-black-comment-2', username: 'Bob', comment: 'Could be better.', rating: 3 },
        ],
        totalRatings: 2,
    },
];

export function getProducts(): Promise<Product[]> {
    return new Promise((resolve) => {
        resolve(mockProducts);
    });
}

export function getProductById(id: string): Promise<Product | undefined> {
    const product = mockProducts.find((product) => product.id === id);
    return Promise.resolve(product);
}
