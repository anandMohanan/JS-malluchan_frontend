import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "urql";
import FileBase from "react-file-base64";
import { MenuBar } from "../components/MenuBar";

const CREATE_POST = `
mutation($body:String!,$photo: String){
    createPost(body:$body,photo:$photo){
        id body createdAt username
    }
}
`;

export default function CreatePost() {
  const [result, setCreatePost] = useMutation(CREATE_POST);
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const [post, setPost] = useState({
    body: "",
    photo: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setCreatePost(post).then((result) => {
      if (result.error) {
        setErrors(result.error.graphQLErrors[0].extensions.errors);
      } else {
        router.push("/");
      }
    });
  };

  return (
    <>
      <MenuBar />
      <form
        onSubmit={handleSubmit}
        className={"bg-grey-lighter min-h-screen flex flex-col"}
      >
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Create Post</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="body"
              placeholder="body"
              value={post.body}
              onChange={(e) => setPost({ ...post, body: e.target.value })}
            />

            <FileBase
              // name="photo"
              type="file"
              value={post.photo}
              multiple={false}
              onDone={({ base64 }) => setPost({ ...post, photo: base64 })}
            />

            <button
              onSubmit={handleSubmit}
              type="submit"
              className="w-full bg-neutral-800 text-zinc-50 text-center py-3 rounded focus:outline-none my-1"
            >
              Create
            </button>
          </div>

          {Object.keys(errors).length > 0 && (
            <ul>
              {Object.values(errors).map((value) => (
                <li className="text-red-600" key={value}>
                  *{value}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </>
  );
}
