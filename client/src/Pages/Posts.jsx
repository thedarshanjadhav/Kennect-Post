import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addUser } from "../redux/usersSlice";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Posts() {
    const [showModal, setShowModal] = useState(true);
    const [userName, setUserName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // posts
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts.map(post => ({
        ...post,
        user: state.users.currentUser[0]?.name || "Unknown User"
    })));

    // filter for Search bar
    const filteredPosts = posts.filter(post =>
        post.newPost.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleUserNameSubmit = async (e) => {
        e.preventDefault();
        setShowModal(false);

        try {
            const response = await axios.post('http://localhost:3001/user', { name: userName });
            dispatch(addUser(response.data.user));
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    return (
        <div className="d-flex bg-primary justify-content-center ">
            <div className="w-50 bg-white rounded p-3 mt-50">
                <h1 className="text-center">Latest Posts</h1>

                {showModal && (
                    <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5">Enter your name</h1>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleUserNameSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="userName" className="form-label">User Name</label>
                                            <input type="text" className="form-control" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {!showModal && (
                    <div className="add-container d-flex justify-content-between mb-1" style={{height:'50px', alignItems:'center'}}>
                        <NavLink to='/create' className="btn btn-primary btn-md add">Add Post</NavLink>
                        <div className="input-group mt-2" style={{ maxWidth: "300px"}}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search posts"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                        </div>
                    </div>
                )}

                {!showModal && filteredPosts.length > 0 ? (
                    filteredPosts.map((item) => (
                        <NavLink to={`/${item.id}`} key={item.id} style={{textDecoration:"none"}}>
                            <div className="card mb-3">
                                <div className="card-body" >
                                    <p className="card-text" style={{ fontSize:"18px" }}>{item?.newPost}</p>
                                    <p className="card-text">Author: {item?.user}</p>
                                </div>
                            </div>
                        </NavLink>
                    ))
                ) : (
                    <h3 className="text-center">No posts found</h3>
                )}
            </div>
        </div>
    );
}
