export interface CommentType {
    id: string;
    username: string;
    comment: string;
    rating: number;
}

export interface CommentFormData {
    comment: string;
    rating: number;
}