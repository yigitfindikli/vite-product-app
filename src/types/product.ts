import { ImgHTMLAttributes } from "react";
import { CommentType } from "./comment";

export interface ProductImage extends ImgHTMLAttributes<HTMLImageElement> {
    id: string;
    src: string;
    alt: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    rating: number;
    images: ProductImage[];
    description: string;
    arrivalDate: string;
    comments: CommentType[];
    totalRatings: number;
}
