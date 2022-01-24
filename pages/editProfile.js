import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "urql";
import FileBase from "react-file-base64";
import { MenuBar } from "../components/MenuBar";

const SET_DETAILS = `
mutation($photo: String,$bio: String){
    setDetails(photo: $photo,bio: $bio){
        bio
        photo
    }
}
`;

export default function Edit() {
  const [result, setDetails] = useMutation(SET_DETAILS);
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const [data, setData] = useState({
    photo: "",
    bio: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setDetails(data).then((result) => {
      if (result.error) {
        console.log("RESULT ERROR", result.error);
        setErrors(result.error.graphQLErrors[0].extensions.errors);
      } else {
        router.push("/profile");
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
            <h1 className="mb-8 text-3xl text-center">Edit Profile</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="bio"
              placeholder="Bio"
              value={data.bio}
              onChange={(e) => setData({ ...data, bio: e.target.value })}
            />

            <FileBase
              name="photo"
              type="file"
              value={data.photo}
              multiple={false}
              onDone={({ base64 }) => setData({ ...data, photo: base64 })}
            />

            <button
              onSubmit={handleSubmit}
              type="submit"
              className="w-full bg-neutral-800 text-zinc-50 text-center py-3 rounded focus:outline-none my-1"
            >
              Change
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
