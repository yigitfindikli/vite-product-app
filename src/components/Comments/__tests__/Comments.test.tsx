import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Comments } from '@/components/Comments/Comments';
import { CommentType } from '@/types/comment';

const mockComments: CommentType[] = [
    {
        id: '1',
        username: 'User1',
        comment: 'First comment',
        rating: 5,
    },
    {
        id: '2',
        username: 'User2',
        comment: 'Second comment',
        rating: 4,
    },
];

describe('Comments Component', () => {
    const mockOnAddComment = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders a list of comments', async () => {
        render(<Comments comments={mockComments} onAddComment={mockOnAddComment} />);

        mockComments.forEach((comment) => {
            expect(screen.getByText(comment.username)).toBeInTheDocument();
            expect(screen.getByText(comment.comment)).toBeInTheDocument();
        });
    });
});
