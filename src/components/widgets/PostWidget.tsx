import React, { useState } from "react";
import { Box, Typography, IconButton, useTheme, Divider } from "@mui/material";
import {
  ChatBubbleOutlineOutlined,
  CommentsDisabled,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { postWidgetProps } from "types/WidgetsTypes";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "containers/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import Friend from "../Friend";
import { CustomPalette } from "types/ThemesType";

const PostWidget = ({
  comments,
  description,
  likes,
  location,
  name,
  picturePath,
  postId,
  postUserId,
  userPicturePath,
}: postWidgetProps) => {
  const [isComments, setIsComments] = useState<boolean>();

  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.token);
  const loggedInUserId = useSelector((state: any) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;


  const { palette } = useTheme<CustomPalette>();
  const primary = palette.primary.main;
  const main = palette.neutral.main;

  
  const patchLikes = async () => {
    const response = await fetch(`http://localhost:3001/post/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });

    const updatedPost = await response.json();
    dispatch(setPost({post: updatedPost}));
  };

  return (
    <WidgetWrapper padding="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        description={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ marginTop: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween marginTop="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLikes}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments((prev) => !prev)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box marginTop="0.5rem">
          {comments.map((comment, index) => (
            <Box key={index}>
              <Divider />
              <Typography
                sx={{ color: main, margin: "0.5rem 0", paddingLeft: "1rem" }}
              >
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
