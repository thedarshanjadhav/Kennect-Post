import axios from "axios";
import { useState } from "react"
import { addPost } from "../redux/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreatePost(){
    const [newPost, setnewPost] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(state => state.users.currentUser);

    const handleSubmit= (e)=>{
        e.preventDefault()
        axios.post('https://kennectpostbackend.onrender.com/create', { newPost, user: currentUser })
        .then(res => {
            dispatch(addPost(res.data));
            navigate('/');
        })
        .catch(err => console.log(err));
    }

    return(
        <div className="row mt-3">
            <div className="col-8 offset-2">

                <h2 style={{color: "white"}}>Create a new Post</h2>
                {/* <br /> */}
                <form onSubmit={handleSubmit} >

                <div className="mb-3">
                    <label htmlFor="newPost" className="form-lable" style={{color: "white", fontSize:"20px"}}>Post</label>
                    <textarea 
                    name="newPost" 
                    rows="6"
                    placeholder="Please write a new post..."
                    className="form-control"
                    onChange={(e) => setnewPost(e.target.value)}
                    required
                    ></textarea>
                    
                </div>
                
                <button className="btn btn-light add-btn mt-3">Submit</button>

                </form>

            </div>
        </div>
    )
}