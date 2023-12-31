import { Box, useMediaQuery } from "@mui/material";
import Navbar from "components/navbar";
import AdWidget from "components/widgets/AdWidget";
import FriendsListWidget from "components/widgets/FriendsListWidget";
import MyPostWidget from "components/widgets/MyPostWidget";
import UserWidgets from "components/widgets/UserWidgets";
import PostsContainer from "containers/PostsContainer";
import React from "react";
import { useSelector } from "react-redux";


const HomePage = () => {

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const user = useSelector((state: any) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidgets userId={user._id} picturePath={user.picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          marginTop={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <PostsContainer userId={user._id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="27%" >
            <AdWidget />
            <Box margin="2rem 0">
              <FriendsListWidget userId={user._id} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
