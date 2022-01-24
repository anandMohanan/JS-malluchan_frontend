import { TrashIcon } from "@heroicons/react/outline";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authentication";
import { Like } from "./Like";

const PostCard = ({ posts, loading, impostcard }) => {
  const { user } = useContext(AuthContext);

  const card = impostcard ? (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold underline">Home Page</h1>

      <div
        key={posts.id}
        className="max-w-4xl rounded overflow-hidden shadow-lg"
      >
        <div className="flex p-10">
          <img
            className="w-48 h-48"
            src={
              posts.photo
                ? posts.photo
                : "https://media.giphy.com/media/jjrnhRUomnlycLUwA9/giphy-downsized.gif"
            }
          />
          <div className=" px-6 py-4">
            <div className="font-bold text-xl mb-2">{posts.username}</div>
            <p className="text-gray-700 text-base">{posts.body}</p>
          </div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <button className="bg-red-500 hover:bg-red-700 text-gray-50  py-1 px-2 rounded">
            Comments
          </button>
          <span>{posts.commentCount} </span>
          <span>Created at: {moment(posts.createdAt).fromNow()}</span>

          {user && user.username === posts.username && (
            <TrashIcon className="h-6 w-6" aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold underline">Home Page</h1>

      <div
        key={posts.id}
        className="max-w-4xl rounded overflow-hidden shadow-lg"
      >
        <div className="flex p-10">
          <img
            className="w-48 h-48"
            src={
              posts.photo
                ? posts.photo
                : "https://media.giphy.com/media/jjrnhRUomnlycLUwA9/giphy-downsized.gif"
            }
          />
          <div className=" px-6 py-4">
            <div className="font-bold text-xl mb-2">{posts.username}</div>
            <p className="text-gray-700 text-base">{posts.body}</p>
          </div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <Like user={user} post={posts} />

          <button className="bg-red-500 hover:bg-red-700 text-gray-50  py-1 px-2 rounded">
            Comments
          </button>
          <span>{posts.commentCount} </span>
          <span>Created at: {moment(posts.createdAt).fromNow()}</span>

          {user && user.username === posts.username && (
            <TrashIcon className="h-6 w-6" aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  );
  return card;
};

export default PostCard;
