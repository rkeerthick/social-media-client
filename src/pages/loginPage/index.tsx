import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from './Form';
import { CustomPalette } from "types/ThemesType";

const LoginPage = () => {
  const theme = useTheme<CustomPalette>();
  const isNonMobileScreens = useMediaQuery("min-width: 1000px");
  return (
    <Box>
      <Box
        width="100%"
        bgcolor={theme.palette.background.alt}
        padding="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Social Media
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "95%"}
        padding="2rem"
        margin="2rem auto"
        borderRadius="1.5rem"
        bgcolor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{marginBottom: "1.5rem"}}>
          Welcome to Social Media!
        </Typography>
      <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
