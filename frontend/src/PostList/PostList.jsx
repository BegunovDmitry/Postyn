import { Link, useNavigate } from "react-router-dom";

import PostCard from "../Components/PostCard"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const user_shift = 0

const getPost = (shift) => {
    return axios.get(`http://127.0.0.1:8000/get_posts?shift=${shift}&limit=10`)
}


function PostList() {

    const navigate = useNavigate();

    const { data, isLoading} = useQuery({
        queryKey: ["posts", user_shift],
        queryFn: () => getPost(user_shift),
        select: data => data.data,
    })

    if (isLoading) return(
        <div className="border-solid border-4 border-gray-900 rounded-lg text-xl font-semibold mx-10 mt-5 p-2 flex justify-center"><p>Loading...</p></div>
    );

    return (
    <>
        <div className='p-6'>
            <div className='border-solid border-2 border-gray-900 rounded-lg grid grid-cols-4 gap-4 p-4 py-5'>
                {isLoading
                ? "Loading..."
                : data?.length 
                ? data.map((x) => <PostCard key={x.id} props={x}/>)
                : "Not Found"
                }
            </div>
        </div>
        <Link to="/create_page"><button className='border-solid border-4 border-gray-900 bg-lime-400 rounded-xl text-3xl  font-bold px-10 py-3 fixed inset-x-0 mx-auto bottom-11 max-w-xs hover:bg-pink-500 hover:rounded-3xl duration-300'>Add post</button></Link>
    </>
    )
}

export default PostList;