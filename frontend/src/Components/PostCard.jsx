import { Link } from "react-router-dom";

function PostCard(props) {
    return (
      <Link to={`/view_page/${props.props.id}`} >
        <div className="border-solid border-2 border-gray-900 rounded-lg transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-pink-400 duration-200">
          <p className='text-center text-3xl font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis px-3'>{props.props.title}</p>
          <hr className="h-px border-solid border-gray-900 border-1 my-1"/>
          <p className='text-center text-s font-normal p-2 overflow-hidden overflow-ellipsis max-h-36 mx-3 my-1'>{props.props.content}</p>
        </div>
      </Link>
    )
}

export default PostCard;