import "./App.css"
import {Route, Routes } from 'react-router-dom'

import PostList from './PostList/PostList'
import ViewPostPage from "./PostPages/ViewPostPage"
import CratePostPage from "./PostPages/CreatePostPage"
import DeletingPage from "./PostPages/AditionalPages/DeletingPage"
import AddingPage from "./PostPages/AditionalPages/AddingPage"



function App() {
  

  return (
    <>
    <div className="flex justify-center pt-5">
      <p className='text-center text-5xl font-semibold drop-shadow-lg hover:text-pink-600 hover:underline duration-300'>Postyn</p>
    </div>

    <Routes>
      <Route path="/" element={<PostList/>}/>
      <Route path="/view_page/:post_id" element={<ViewPostPage/>}/>
      <Route path="/create_page" element={<CratePostPage/>}/>
      <Route path="/delete_page/:post_id" element={<DeletingPage/>}/>
      <Route path="/add_page/:title" element={<AddingPage/>}/>
    </Routes>
    </>
  )
};

export default App;
