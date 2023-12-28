import { useTheme, Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "containers/WidgetWrapper";
import { CustomPalette } from "types/ThemesType";

const AdWidget = () => {
  const { palette } = useTheme<CustomPalette>();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsered
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        height="auto"
        width="100%"
        alt="sponser"
        src="http://localhost:3001/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Cosmo Cosmetics</Typography>
        <Typography color={medium}>cosmocosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} margin="0.5rem 0">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate magni
        perspiciatis, qui odio incidunt debitis ab quibusdam velit. Inventore,
        veniam?
      </Typography>
    </WidgetWrapper>
  );
};

export default AdWidget;
