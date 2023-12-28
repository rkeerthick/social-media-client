import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "components/navbar";
import FriendsListWidget from "components/widgets/FriendsListWidget";
import MyPostWidget from "components/widgets/MyPostWidget";
import PostsContainer from "containers/PostsContainer";
import UserWidgets from "components/widgets/UserWidgets";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const { userId } = useParams();
  const token = useSelector((state: any) => state.token);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

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

          <PostsContainer userId={userId} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
