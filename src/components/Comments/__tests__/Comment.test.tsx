import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CommentType } from '@/types/comment';
import { Comment } from '../Comment';

const mockComment: CommentType = {
    id: '1',
    username: 'TestUser',
    comment: 'This is a test comment',
    rating: 4,
};

describe('Comment Component', () => {
    test('renders comment with username, rating, and text', () => {
        render(<Comment comment={mockComment} />);

        expect(screen.getByText(mockComment.username)).toBeInTheDocument();
        expect(screen.getByText(mockComment.comment)).toBeInTheDocument();
    });
});
