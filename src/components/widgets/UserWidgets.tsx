import { Box, Typography, useTheme, Divider } from "@mui/material";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapperComponent from "containers/WidgetWrapper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userWidgetsTypes } from "types/WidgetsTypes";
import { useEffect, useState } from "react";
import { userTypes } from "types/StateTypes";
import { CustomPalette } from "types/ThemesType";
import twitterLogo from "../../assets/twitter.png";
import linkedinLogo from "../../assets/linkedin.png";

const UserWidgets = ({ userId, picturePath }: userWidgetsTypes) => {
  const [user, setUser] = useState<userTypes | null>(null);
  const { palette } = useTheme<CustomPalette>();
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  console.log(user, 'user')

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
    _id,
  } = user;

  return (
    <WidgetWrapperComponent>
      {/* First Row */}
      <FlexBetween
        gap="0.5px"
        paddingBottom="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "*&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length}</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />

      {/* Second Row */}
      <Box padding="1rem 0">
        <Box
          display="flex"
          alignItems="center"
          gap="1rem"
          marginBottom="0.5rem"
        >
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          gap="1rem"
          marginBottom="0.5rem"
        >
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      {/* Thrid Row */}
      <Box padding="1rem 0">
        <FlexBetween marginBottom="0.5rem">
          <Typography color={medium}>Who viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween marginBottom="0.5rem">
          <Typography color={medium}>Impressions of you post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      {/* Fourth Row */}
      <Box padding="1rem 0">
        <Typography
          fontSize="1rem"
          marginBottom="1rem"
          color={main}
          fontWeight="500"
        >
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem" marginBottom="0.5rem">
          <FlexBetween gap="1rem">
            <img src={twitterLogo} alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Networks</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src={linkedinLogo} alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapperComponent>
  );
};

export default UserWidgets;
