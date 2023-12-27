import { Box } from "@mui/material";
import { userImageProps } from "types/WidgetsTypes";



const UserImage = ({ image, size = "60px" }: userImageProps) => {
  return (
    <Box width={size} height={size}>
      <img
        width={size}
        height={size}
        style={{
          objectFit: "cover",
          borderRadius: "50%",
        }}
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
