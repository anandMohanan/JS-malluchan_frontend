import { MenuBar } from "../components/MenuBar";
import {  useQuery } from "urql";
import moment from "moment";

const GET_USER = `
query {
  getUser {
    username
    id
    bio
    createdAt
    email
    photo
    id
  }
}
`;

export default function Profile() {
  const [{ data, fetching, error }] = useQuery({
    query: GET_USER,
  });
  if (fetching) return <h1>loading</h1>;
  if (error) return <h1>error</h1>;
  const user = data.getUser;
 
  const profile = data ? (
    <>
      <MenuBar />
     
      <div class="container mx-auto my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2 ">
         
          <div class="w-full md:w-9/12 mx-2 h-64">
           
            <div class="bg-white p-3 shadow-sm rounded-sm">
              <div class="bg-white p-3 border-t-4 border-green-400">
                <div class="image overflow-hidden">
                  <img
                    class="h-48 w-48 mx-auto"
                    src={
                      user.photo
                        ? user.photo
                        : "https://media.giphy.com/media/2lVtkuOqgKGeA/giphy.gif"
                    }
                    alt=""
                  />
                </div>
                <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
                  {user.username ? user.username : ""}
                </h1>
                <h3 class="text-gray-600 font-lg text-semibold leading-6">
                  {user.bio ? user.bio : "bio"}
                </h3>
                <p class="text-sm text-red-600  hover:text-gray-600 leading-6">
                 
                  Homophobic
                </p>
              </div>
              <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                  <svg
                    class="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span class="tracking-wide">About</span>
              </div>
              <div class="text-gray-700">
                <div class="grid md:grid-cols-2 text-sm">
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">First Name</div>
                    <div class="px-4 py-2">
                      {user.username ? user.username : ""}
                    </div>
                  </div>

                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Gender</div>
                    <div class="px-4 py-2">Trans</div>
                  </div>

                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Email.</div>
                    <div class="px-4 py-2">
                      <a class="text-blue-800" href="mailto:jane@example.com">
                        {user.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
            <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li class="flex items-center py-3">
                <span>Status</span>
                <span class="ml-auto">
                  <span class="bg-green-500 py-1 px-2 rounded text-white text-sm">
                    Active
                  </span>
                </span>
              </li>
              <li class="flex items-center py-3">
                <span>Member since</span>
                <span class="ml-auto">
                  {moment(user.createdAt).format("MM/DD/YY")}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <h1>error</h1>
    </>
  );
  return profile;
}
