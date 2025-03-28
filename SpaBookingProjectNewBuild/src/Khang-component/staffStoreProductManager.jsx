"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  Divider,
  useTheme,
} from "@mui/material";
import AdminCalendar from "../admin/AdminCalendar";
import StoreProductManager from "../Khang-component/StoreProductManager";
import PromotionManager from "../Khang-component/PromotionManager.jsx";
import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`staff-tabpanel-${index}`}
      aria-labelledby={`staff-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `staff-tab-${index}`,
    "aria-controls": `staff-tabpanel-${index}`,
  };
}

export default function StaffDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
        >
          Spa Staff Dashboard
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ width: "100%" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="staff dashboard tabs"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Dashboard" {...a11yProps(0)} />
            {/* <Tab label="Calendar" {...a11yProps(1)} /> */}
            <Tab label="Store Product Manager" {...a11yProps(1)} />
            <Tab label="Promotion Manager" {...a11yProps(2)} />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ textAlign: "center", fontSize: "30px" }}>
                  Work distribution schedule
                  </Typography>
                  <AdminCalendar />
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
          {/* <TabPanel value={tabValue} index={1}>
            <AdminCalendar />
          </TabPanel> */}

          <TabPanel value={tabValue} index={1}>
            <StoreProductManager />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <PromotionManager />
          </TabPanel>
        </Box>
      </Paper>
    </Container>
  );
}