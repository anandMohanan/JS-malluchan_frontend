import moment from "moment";
import Image from "next/image";

export const PostCard = ({ posts, loading }) => {
  console.log(posts);
  const handleLike = () => {
    console.log("clicked like");
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold underline">Home Page</h1>
      {/* console.log(posts); */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> */}
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        posts &&
        posts.map((post) => (
          <div
            key={post.id}
            className="max-w-4xl rounded overflow-hidden shadow-lg"
          >
            {/* <Image
              layout="fill"
              class="w-full"
              src="https://media.giphy.com/media/r0oM8RTsdAdELsKwGB/giphy.png"
            /> */}
            <div className="flex p-10">
              <img
                className="w-full h-48"
                src="https://media.giphy.com/media/jjrnhRUomnlycLUwA9/giphy-downsized.gif"
              />
              <div className=" px-6 py-4">
                <div className="font-bold text-xl mb-2">{post.username}</div>
                <p className="text-gray-700 text-base">
                  A paragraph is a series of related sentences developing a
                  central idea, called the topic. Try to think about paragraphs
                  in terms of thematic unity: a paragraph is a sentence or a
                  group of sentences that supports one central, unified idea.
                  Paragraphs add one idea at a time to your broader argument.
                </p>
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
