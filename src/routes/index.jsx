import { Route, Routes } from "react-router-dom";
import Home from "../views/home";
import PostIndex from "../views/posts";
import PostCreate from "../views/posts/create";
import PostEdit from "../views/posts/edit";
import Login from "../views/pages/login";

function RoutesIndex(){
    return(
        <Routes>
            

            <Route path="/home" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/posts" element={<PostIndex />} />

            <Route path="/posts/create" element={<PostCreate />} />

            <Route path="/posts/edit/:id" element={<PostEdit />} />
        </Routes>
    )
}

export default RoutesIndex