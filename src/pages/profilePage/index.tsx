import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "components/navbar";
import FriendsListWidget from "components/widgets/FriendsListWidget";
import MyPostWidget from "components/widgets/MyPostWidget";
import PostsContainer from "containers/PostsContainer";
import UserWidgets from "components/widgets/UserWidgets";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "utils/apiFunctions";

const ProfilePage = () => {
  const { userId } = useParams();
  const token = useSelector((state: any) => state.token);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  const userQueryKey = ["user", userId];

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: userQueryKey,
    queryFn : async () => {
      const response = getUserProfile(userId, token);
      return response;
    }
  });

  // useEffect(() => {
  // }, [user]);

  if (userLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidgets userId={userId} picturePath={user.picturePath} />
          <Box margin="2rem 0" />
          <FriendsListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          marginTop={isNonMobileScreen ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box margin="2rem 0" />

          {/* Define the query key for fetching posts */}
          <PostsContainer userId={userId} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
