import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularProgressCustom() {
  return (
    <Box sx={{ display: "flex" , justifyContent:"center", height: "50vh"}}>
      <CircularProgress />
    </Box>
  );
}
