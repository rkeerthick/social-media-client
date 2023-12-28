import { Box, useTheme, Typography } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "containers/WidgetWrapper";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import { CustomPalette } from "types/ThemesType";
import { friendsListWidgetProps } from "types/WidgetsTypes";

const FriendsListWidget = ({ userId }: friendsListWidgetProps) => {
  const dispatch = useDispatch();
  const { palette } = useTheme<CustomPalette>();
  const token = useSelector((state: any) => state.token);
  const friends = useSelector((state: any) => state.user.friends);
  const dummy = useSelector((state: any) => state.user);

  console.log(friends, "friends");

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/user/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends(data));
  };

  useEffect(() => {
    getFriends();
  }, []);

  console.log(dummy, "friends");

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ marginBottom: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend: any) => (
          <Friend
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            description={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendsListWidget;
