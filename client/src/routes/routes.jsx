// import RRD
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Posts from "../Pages/Posts";
import CreatePost from "../Pages/CreatePost";
import ShowPost from "../Pages/ShowPost";

export const router = createBrowserRouter([
    {
        element: <MainLayout/>,
        children:[
            {
                path:'/',
                element:<Posts />
            },
            {
                path:'/create',
                element:<CreatePost />
            },
            {
                path:'/:id',
                element:<ShowPost />
            },
          
        ]
    }
])