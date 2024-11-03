import { CommentType } from '@/types/comment';
import Rating from '@/components/Rating/Rating';
import styles from './Comment.module.css';

interface CommentProps {
    comment: CommentType;
}

export const Comment = ({ comment }: CommentProps) => {
    return (
        <li className={styles['comment-item']}>
            <div className={styles['comment-item-header']}>
                <strong>{comment.username}</strong>
                <Rating
                    id={`comment-rating-${comment.username}`}
                    value={comment.rating}
                    max={5}
                    interactive={false}
                />
            </div>
            <span className={styles['comment-item-text']}>{comment.comment}</span>
        </li>
    );
};
