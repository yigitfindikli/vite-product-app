import { useMemo, useState } from 'react';
import Rating from '@/components/Rating/Rating';
import TextArea from '@/components/TextArea/TextArea';
import Button from '@/components/Button/Button';
import styles from './CommentForm.module.css';

interface CommentFormProps {
    onSubmit: (data: { comment: string; rating: number }) => void;
}

export const CommentForm = ({ onSubmit }: CommentFormProps) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = () => {
        if (comment.trim() && rating > 0) {
            onSubmit({
                comment: comment.trim(),
                rating
            });
            setComment('');
            setRating(0);
        }
    };

    const submitDisabled = useMemo(() => {
        return comment.trim() === '' || rating === 0;
    }, [comment, rating]);

    return (
        <div className={styles['comment-form']}>
            <h3>Add a Comment</h3>
            <div className={styles['comment-form-rating-container']}>
                <span>Your Rating: </span>
                <Rating
                    id="new-comment-rating"
                    data-testid="new-comment-rating"
                    value={rating}
                    max={5}
                    interactive={true}
                    onChange={setRating}
                />
            </div>

            <TextArea
                value={comment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                placeholder="Write your comment"
                rows={4}
            />

            <Button
                onClick={handleSubmit}
                disabled={submitDisabled}
                data-testid={`${comment}-${rating}`}
            >
                Submit
            </Button>
        </div>
    );
};
