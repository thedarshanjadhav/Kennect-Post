import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment } from "../redux/commentsSlice";
import { getSinglePost } from "../redux/postsSlice";

export default function ShowPost() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Fetch single post data 
        axios.get(`https://kennectpostbackend.onrender.com/${id}`)
            .then(res => {
                console.log('Received single post data:', res.data.singlePost);
                dispatch(getSinglePost(res.data.singlePost));
            })
            .catch(err => console.error('Error fetching single post:', err));

        // Fetch comments for the post
        axios.get(`https://kennectpostbackend.onrender.com/${id}/comments`)
            .then(res => {
                console.log('Received comments:', res.data.comments);
                setComments(res.data.comments);
            })
            .catch(err => console.error('Error fetching comments:', err));
    }, [dispatch, id]);

    const post = useSelector(state => state.posts.singlePost);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Add comment
            const commentResponse = await axios.post(`https://kennectpostbackend.onrender.com/${id}/comments`, { newComment });
            dispatch(addComment(commentResponse.data));
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <div className="d-flex bg-primary justify-content-center">
            <div className="w-50 bg-white rounded p-3 mt-50">
                <h2>Your Post</h2>

                <div className="card mb-3" style={{ border: 'none' }}>
                    <div className="card-body border-none">
                        <p className="card-text" style={{ fontSize:"20px" }}>{post?.newPost}</p>
                        <p className="card-text">Author: {post?.user?.name}</p>
                    </div>
                </div>

                {/* Comments */}
                <div className="col-12 offset-0 mb-3">
                    <hr />
                    <h5>Leave a comment</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 mt-3">
                            <label htmlFor="comment[new-comment]" className="form-lable">Comments</label>
                            <textarea
                                name="comment[new-comment]"
                                id="comment"
                                rows="1"
                                className="form-control"
                                onChange={(e) => setNewComment(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button className="btn btn-outline-dark">Submit</button>
                    </form>
                </div>

                {/* Show comments */}
                <div className="mb-3 mt-3">
                    <h5>All Comments</h5>
                    <ul>
                        {comments?.map(comment => (
                            <li key={comment._id}>{comment.newComment} </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
