import { useQuery } from "urql";
import { client, ssrCache } from "../urqlClient";
import { MenuBar } from "./MenuBar";
import PostCard from "./PostCard";

const GET_POSTS_BY_USER = `
query {
  getPostByUser {
    username
    body
    id
    likeCount
    commentCount
    createdAt
    photo
  }
}
`;

export const ProfilePostCard = () => {
  const [result] = useQuery({
    query: GET_POSTS_BY_USER,
  });
  const { data, fetching, error } = result;
  if (fetching) return <h1>loading</h1>;
  if (error) return <h1>error</h1>;

  const posts = data.getPostByUser;
  const impostcard = true;
  return (
    <>
      {posts &&
        posts.map((post) => {
          return (
            <>
              <PostCard posts={post} impostcard={impostcard} />
            </>
          );
        })}
    </>
  );
};

export async function getStaticProps() {
  await client.query(GET_POSTS_BY_USER).toPromise();
  return { props: { urqlState: ssrCache.extractData() } };
}
