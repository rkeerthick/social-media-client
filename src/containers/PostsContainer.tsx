/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "components/widgets/PostWidget";
import { postsContainerProps } from "types/WidgetsTypes";
import { userTypes } from "types/StateTypes";
import { useQuery } from "@tanstack/react-query";
import { fetchPostsCond } from "utils/apiFunctions";

const PostsContainer = ({ userId, isProfile = false }: postsContainerProps) => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.token);

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPostsCond(userId, token, isProfile)
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data</p>;
  }

  dispatch(setPosts({ posts: posts }));

  return (
    <>
      {posts.length > 0 &&
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }: any) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
    </>
  );
};
export default PostsContainer;
