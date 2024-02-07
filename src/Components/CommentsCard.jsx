import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import DeleteComment from './DeleteComment';

const CommentsCard = () => {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const { article_id } = useParams();

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'MMMM dd, yyyy HH:mm');
    };

    useEffect(() => {
        if (showComments) {
            axios.get(`https://backend-nc-news-l5zm.onrender.com/api/articles/${article_id}/comments`)
                .then((response) => {
                    setComments(response.data.comments);
                })
                .catch((error) => {
                    console.error('error', error);
                });
        }
    }, [article_id, showComments]);

    const handleComments = () => {
        setShowComments(!showComments);
    };

    const handleDeleteComment = (deletedCommentId) => {
        setComments(comments.filter((comment) => comment.comment_id !== deletedCommentId));
    };

    return (
        <>
            <div className="comments">
                <button onClick={handleComments}>
                    {showComments ? 'Hide comments' : 'Show comments'}
                </button>
                {showComments && (
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment.comment_id}>
                                <p>Author: {comment.author}</p>
                                <p>Created At: {formatDate(comment.created_at)}</p>
                                <p>{comment.body}</p>
                                <p>Votes: {comment.votes}</p>
                                {comment.author === 'tickle122' && (
                                    <DeleteComment
                                        commentId={comment.comment_id}
                                        onDelete={handleDeleteComment}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default CommentsCard;