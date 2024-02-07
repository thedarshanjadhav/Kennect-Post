import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getPost } from "../redux/postsSlice";


export default function MainLayout(){
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await axios.get('http://localhost:3001/');
                dispatch(getPost(response.data));
            } catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[]);


    return (
        <Outlet />
    )
}