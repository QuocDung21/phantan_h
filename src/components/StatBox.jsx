import { Box, Typography, useTheme } from "@mui/material";
// import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase, icon_details }) => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {/* {icon} */}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "white" }}
          >
            {title}
          </Typography>
        </Box>
        {/* <Box>
          <ProgressCircle progress={progress} />
        </Box> */}
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: "white" }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: "yellow" }}
        >
          {icon_details}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;