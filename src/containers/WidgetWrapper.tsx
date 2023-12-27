import { Box } from "@mui/material";
import { styled } from "@mui/material";
import UseTheme from "../hooks/useTheme";
// import { CustomPalette } from "types/ThemesType";

// const WidgetWrapperComponent = () => {
//   const theme = useTheme<CustomPalette>();

//   const WidgetWrapper: any = styled(Box)<{theme: CustomPalette}>(() => ({
//     padding: "1.5rem 1.5rem 0.75rem 1.5rem",
//     backgroundColor: theme.palette.background.alt,
//     borderRadius: "0.75rem",
//   }));

//   return <WidgetWrapper />;
// };

// export default WidgetWrapperComponent;

const WidgetWrapper = styled(Box)(() => {
  const theme = UseTheme();

  return {
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    backgroundColor: theme.palette.background.alt,
    borderRadius: "0.75rem",
  };
});

export default WidgetWrapper;
