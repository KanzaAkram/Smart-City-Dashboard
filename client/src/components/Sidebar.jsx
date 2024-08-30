/* eslint-disable react/prop-types */
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
// import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
// import {
//   SettingsOutlined,
//   ChevronLeft,
//   ChevronRightOutlined,
//   HomeOutlined,
//   LocalParkingOutlined,
//   CommuteOutlined,
//   DeleteOutlineOutlined,
//   WavesOutlined,
//   OfflineBoltOutlined,
//   AirOutlined,
//   CloudOutlined,
//   WaterDropOutlined,
//   AdminPanelSettingsOutlined,
//   Co2Outlined,
//   TrafficOutlined,
// } from "@mui/icons-material";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import FlexBetween from "./FlexBetween";
// import profileImage from "@/assets/avatar.svg";

// const navItems = [
//   {
//     text: "Dashboard",
//     icon: <HomeOutlined />,
//   },
//   {
//     text: "Environment Monitoring",
//     icon: null,
//   },
//   {
//     text: "Air Quality",
//     icon: <AirOutlined />,
//   },
//   {
//     text: "Weather",
//     icon: <CloudOutlined />,
//   },
//   {
//     text: "CO2 Emissions",
//     icon: <Co2Outlined />,
//   },
//   {
//     text: "Traffic and Transportation",
//     icon: null,
//   },
//   {
//     text: "Traffic Flow",
//     icon: <TrafficOutlined />,
//   },
//   {
//     text: "Public Transport",
//     icon: <CommuteOutlined />,
//   },
//   {
//     text: "Parking Availability",
//     icon: <LocalParkingOutlined />,
//   },
//   {
//     text: "Utilities and Energy",
//     icon: null,
//   },
//   {
//     text: "Energy Consumption",
//     icon: <OfflineBoltOutlined />,
//   },
//   {
//     text: "Water Usage",
//     icon: <WaterDropOutlined />,
//   },
//   {
//     text: "Waste Management",
//     icon: <DeleteOutlineOutlined />,
//   },
// ];

import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  DeleteOutlined,
  WaterDropOutlined,
  OfflineBoltOutlined,
  AirOutlined,
  LocalParkingOutlined,
  CloudOutlined,
  CommuteOutlined,
  AdminPanelSettingsOutlined,
  Co2Outlined,
  TrafficOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "@/assets/avatar.svg";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Environment Monitoring",
    icon: null,
  },
  {
    text: "Air Quality",
    icon: <AirOutlined />,
  },
  {
    text: "Weather",
    icon: <CloudOutlined />,
  },
  {
    text: "CO2 Emissions",
    icon: <Co2Outlined />,
  },
  {
    text: "Traffic and Transportation",
    icon: null,
  },
  {
    text: "Traffic Flow",
    icon: <TrafficOutlined />,
  },
  {
        text: "Public Transport",
        icon: <CommuteOutlined />,
      },
      {
        text: "Parking Availability",
        icon: <LocalParkingOutlined />,
      },
      {
        text: "Utilities and Energy",
        icon: null,
      },
      {
        text: "Energy Consumption",
        icon: <OfflineBoltOutlined />,
      },
      {
        text: "Water Usage",
        icon: <WaterDropOutlined />,
      },
      {
        text: "Waste Management",
        icon: <DeleteOutlined />,
      },
    ];
    

function Sidebar({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%" sx={{ overflowY: "scroll" }}>
            <Box m="1.5rem 2rem 1.5rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box
                  display="flex"
                  alignItems="center"
                  gap="0.5rem"
                  width="fit-content"
                >
                  <Typography variant="h4" fontWeight="bold">
                    Smart City Dashboard
                  </Typography>
                  {!isNonMobile && (
                    <IconButton
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                      <ChevronLeft />
                    </IconButton>
                  )}
                </Box>
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: "2.25rem 0 1rem 2rem" }}
                      color={theme.palette.secondary[300]}
                    >
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[200]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.secondary[900]
                            : theme.palette.secondary[100],
                        "&:hover": {
                          backgroundColor:
                            active === lcText
                              ? theme.palette.secondary[200]
                              : "",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box>
            <Divider />
            <FlexBetween
              textTransform="none"
              gap="1rem"
              m="1.5rem 2rem 1.5rem 3rem"
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}

export default Sidebar;
