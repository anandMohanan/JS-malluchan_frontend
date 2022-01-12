import moment from "moment";

export const PostCard = ({ posts, loading }) => {
  console.log(posts);
  const handleLike = () => {
    console.log("clicked like");
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold underline">Home Page</h1>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        posts &&
        posts.map((post) => (
          <div
            key={post.id}
            className="max-w-4xl rounded overflow-hidden shadow-lg"
          >
            <div className="flex p-10">
              <img
                className="w-full h-48"
                src={
                  post.photo
                    ? post.photo
                    : "https://media.giphy.com/media/jjrnhRUomnlycLUwA9/giphy-downsized.gif"
                }
              />
              <div className=" px-6 py-4">
                <div className="font-bold text-xl mb-2">{post.username}</div>
                <p className="text-gray-700 text-base">{post.body}</p>
              </div>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button
                className="bg-red-500 hover:bg-red-700 text-gray-50  py-1 px-2 rounded"
                onClick={handleLike}
              >
                Likes
              </button>
              <span>{post.likeCount}</span>
              <button className="bg-red-500 hover:bg-red-700 text-gray-50  py-1 px-2 rounded">
                Comments
              </button>
              <span>{post.commentCount} </span>
              <span>Created at: {moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
