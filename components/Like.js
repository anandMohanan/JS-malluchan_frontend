import { ArrowCircleUpIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { useMutation } from "urql";

const LIKE_POST = `
  mutation ($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export function Like({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);
  const [result, LikePost] = useMutation(LIKE_POST);

  const variables = {
    postId: id,
  };

  function LikeCallback(e) {
    e.preventDefault();

    LikePost(variables).then((result) => {
      if (result.error) {
        console.log(result.error);
      }
    });
  }

  const likeButton = user ? (
    liked ? (
      <button onClick={LikeCallback}>
        <ArrowCircleUpIcon
          className="h-6 w-50 text-red-500"
          aria-hidden="true"
        />
      </button>
    ) : (
      <button onClick={LikeCallback}>
        <ArrowCircleUpIcon
          className="h-6 w-6 text-zinc-900"
          aria-hidden="true"
        />
      </button>
    )
  ) : (
    <a href="/login">
      {" "}
      <ArrowCircleUpIcon className="h-6 w-50 bg-green-800" aria-hidden="true" />
    </a>
  );
  return (
    <>
      {likeButton}
      {likeCount}
    </>
  );
}
