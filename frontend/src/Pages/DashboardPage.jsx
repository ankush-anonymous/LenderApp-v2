import React from "react";
import Typography from "@mui/material/Typography";
import LayoutComponent from "../Components/LayoutComponent";

const DashboardPage = () => {
  return (
    <LayoutComponent>
      <Typography variant="h4" component="div" gutterBottom>
        Dashboard Page
      </Typography>
      <Typography paragraph>
        This is the dashboard content. It will appear between the AppBar and the
        Drawer.
      </Typography>
    </LayoutComponent>
  );
};

export default DashboardPage;
