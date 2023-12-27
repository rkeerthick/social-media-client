import React from "react";
import { Box, Typography, IconButton, useTheme, Divider } from "@mui/material";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { postWidgetProps } from "types/WidgetsTypes";

const PostWidget = ({
  comment,
  description,
  likes,
  location,
  name,
  picturePath,
  postId,
  postUserId,
  userPicturePath,
}: postWidgetProps) => {
  return <div>PostWidget</div>;
};

export default PostWidget;
