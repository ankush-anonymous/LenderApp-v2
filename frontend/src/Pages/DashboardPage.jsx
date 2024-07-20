import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import LayoutComponent from "../Components/LayoutComponent";
import GridTableComponent from "../Components/GridTableComponent";
import CenterComponent from "../Components/CenterComponent";

const DashboardPage = () => {
  const [page, setPage] = useState("Center");
  return (
    <LayoutComponent setPage={setPage}>
      {page === "Center" ? (
        <CenterComponent />
      ) : page === "Employee" ? (
        <h1>Employee</h1>
      ) : (
        <h1>Something else</h1>
      )}
      {/* 
      <Typography variant="h4" component="div" gutterBottom>
        Dashboard Page
      </Typography>
      <Typography paragraph>
        <GridTableComponent />
      </Typography> */}
    </LayoutComponent>
  );
};

export default DashboardPage;
