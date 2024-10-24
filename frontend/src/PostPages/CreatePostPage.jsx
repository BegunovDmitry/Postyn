import axios from "axios";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";



function CreatePostPage() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("Default");

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (data) => axios.post('http://127.0.0.1:8000/add_post', data)
}); 


    const creatingPage = () => {
        mutation.mutate({
            "title": title,
            "content": content,
            "storage_time__hours": 168
        })
        navigate(`/add_page/${title}`)
    };


    return (
        <div className="">
            <Link to="/"><button className="border-solid border-4 border-gray-900 rounded-xl text-2xl  font-bold px-8 py-2 bottom-11 max-w-xs ml-10 my-5 hover:bg-pink-500 hover:rounded-3xl duration-300">Back</button></Link>
            <button onClick={creatingPage} className="border-solid border-4 border-gray-900 rounded-xl text-2xl  font-bold px-8 py-2 bottom-11 max-w-xs float-right mr-10 my-5 hover:bg-pink-500 hover:rounded-3xl duration-300">Public</button>
            <div className="border-solid border-4 border-gray-900 rounded-lg mx-10 min-w-40 flex flex-col justify-center content-center">
                <textarea value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title..." autoComplete="off" maxLength="100" className="text-7xl w-11/12 h-24 m-4 text-center resize-none whitespace-nowrap overflow-hidden outline-none self-center">

                </textarea>
                <hr className="h-px border-solid border-gray-900 border-2 my-1"/>
                <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="Your post..." autoComplete="off" maxLength="6000" className="text-xl w-11/12 h-96 m-4 resize-none outline-none self-center">

                </textarea>
            </div>
        </div>
    )
}

export default CreatePostPage;