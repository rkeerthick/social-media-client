import React, { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  IconButton,
  Divider,
  InputBase,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "containers/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { CustomPalette } from "types/ThemesType";
import { myPostWidgetProps } from "types/WidgetsTypes";
import { addPost } from "utils/apiFunctions";

const MyPostWidget = ({ picturePath }: myPostWidgetProps) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [posts, setPosts] = useState<string>("");
  const { palette } = useTheme<CustomPalette>();
  const { _id } = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.token);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const queryClient = useQueryClient();

  // Define the query key for fetching posts
  const queryKey: any = isImage ? ["userPosts", _id] : "posts";

  // Fetch posts query
  const { data } = useQuery({
    queryKey: ["Fetch Posts"],
    queryFn: async () => {
      const response = await fetch(
        isImage
          ? `http://localhost:3001/post/${_id}/posts`
          : "http://localhost:3001/post",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.json();
    },
  });

  // Define the post mutation
  const postMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", posts);
      if (isImage) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }
      const response = addPost(formData, token);
      dispatch(setPost({ post: data }));
        setPosts("");
        setImage(null);
      return response;
    },

    // onSuccess: (data) => {
    //   // Invalidate and refetch the posts query
    //   queryClient.invalidateQueries(queryKey);
    //   dispatch(setPost({ post: data }));
    //   setPosts("");
    //   setImage(null);
    // },
  });

  const handlePost = () => {
    postMutation.mutate();
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          value={posts}
          placeholder="What's on your mind..."
          onChange={(e: any) => setPosts(e.target.value)}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          borderRadius="5px"
          border={`1px solid ${medium}`}
          marginTop="1rem"
          padding="1rem"
        >
          <Dropzone
            multiple={false}
            onDrop={(acceptedFiles) => {
              setImage(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  padding="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => {
                      setImage(null);
                    }}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBetween>
        <FlexBetween onClick={() => setIsImage((prev) => !prev)} gap="0.25px">
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{
              "&:hover": {
                color: medium,
                cursor: "pointer",
              },
            }}
          >
            Image
          </Typography>
        </FlexBetween>
        {isNonMobileScreen ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: medium }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: medium }} />
              <Typography color={mediumMain}>Attach</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: medium }} />
              <Typography color={mediumMain}>Mic</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}
        <Button
          disabled={!posts}
          onClick={() => handlePost()}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          Post
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
