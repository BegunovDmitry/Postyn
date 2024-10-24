import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useParams, useNavigate } from 'react-router-dom'

const getPostById = (post_id) => {
    return axios.get(`http://127.0.0.1:8000/get_post_by_id/?post_id=${post_id}`)
}



function ViewPostPage() {

    let { post_id } = useParams();
    const navigate = useNavigate();

    const {data, isLoading, error} = useQuery({
        queryKey: ["post", post_id],
        queryFn: () => getPostById(post_id),
        select: data => data.data,
    })  

    
    if (isLoading) return(
        <div className="border-solid border-4 border-gray-900 rounded-lg text-xl font-semibold mx-10 mt-5 p-2 flex justify-center"><p>Loading...</p></div>
    );

    if (error) return(
        <div className="border-solid border-4 border-gray-900 rounded-lg text-xl font-semibold mx-10 mt-5 p-2 flex justify-center"><p>Error - {error.message}</p></div>
    );
    

    return (
        <div className="">
            <Link to="/"><button className="border-solid border-4 border-gray-900 rounded-xl text-2xl  font-bold px-8 py-2 bottom-11 max-w-xs ml-10 my-5 hover:bg-pink-500 hover:rounded-3xl duration-300">Back</button></Link>
            <Link to={`/delete_page/${post_id}`}><button className="border-solid border-4 border-gray-900 rounded-xl text-2xl  font-bold px-2 py-2 bottom-11 max-w-xs float-right mr-10 my-5 hover:bg-pink-500 hover:rounded-3xl duration-300">Delete post</button></Link>
            <>
            <div className="border-solid border-4 border-gray-900 rounded-lg mx-10 flex flex-col justify-center content-center">
                <textarea readOnly defaultValue={data.title} className="text-7xl w-11/12 h-28 mt-5 text-center resize-none whitespace-nowrap outline-none self-center ">
                </textarea>
                <hr className="h-px border-solid border-gray-900 border-2"/>
                <textarea readOnly defaultValue={data.content} className="text-xl w-11/12 h-96 m-4 resize-none outline-none self-center">
                </textarea>
             </div>
            </>
        </div>
    )
}

export default ViewPostPage;