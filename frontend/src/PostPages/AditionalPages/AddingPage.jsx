import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useParams, useNavigate } from 'react-router-dom'

function AddingPage() {

    const navigate = useNavigate();

    setTimeout(() => navigate('/'), 300)

    return (
        <div className='border-solid border-2 border-gray-900 rounded-lg flex flex-col justify-center gap-4 p-12 m-10'>
        <img src="../../load.png" className="self-center animate-spin max-w-96"/>
        <p className="text-xl font-semibold text-center">Post adding...</p>
        </div>
    )

}

export default AddingPage;