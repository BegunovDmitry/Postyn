import axios from "axios";

import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from 'react-router-dom'

const deletePostById = (post_id) => {
    const res = axios.delete(`http://127.0.0.1:8000/delete_post?post_id=${post_id}`);
    return {res}
}

function DeletingPage() {

    let { post_id } = useParams();
    const navigate = useNavigate();

    const {isLoading, isSuccess} = useQuery({
        queryKey: ["delete_post", post_id],
        queryFn: () => deletePostById(post_id),
    })  


    if (isSuccess) setTimeout(() => navigate('/'), 300);
    
    return (
        <div className='border-solid border-2 border-gray-900 rounded-lg flex flex-col justify-center gap-4 p-12 m-10'>
        <img src="../../load.png" className="self-center animate-spin max-w-96"/>
        <p className="text-xl font-semibold text-center">Post deleting...</p>
        </div>
    )
}

export default DeletingPage;