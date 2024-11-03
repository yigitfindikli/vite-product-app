import { CommentType } from '@/types/comment';
import { Comment } from './Comment';
import { CommentForm } from './CommentForm';
import styles from './Comments.module.css';

interface CommentsProps {
    comments: CommentType[];
    onAddComment: (data: { comment: string; rating: number }) => void;
}

export const Comments = ({ comments, onAddComment }: CommentsProps) => {
    return (
        <div className={styles['comments-container']}>
            <h3>Comments & Ratings</h3>
            <ul className={styles['comments-list']}>
                {comments.map((comment, index) => (
                    <Comment key={index} comment={comment} />
                ))}
            </ul>
            <CommentForm onSubmit={onAddComment} />
        </div>
    );
};
