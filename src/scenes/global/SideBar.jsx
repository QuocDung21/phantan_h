import { useState } from "react";
import { Sidebar, Menu, MenuItem , SubMenu} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        // "& .pro-sidebar-inner": {
        //   background: `${colors.primary[400]} !important`,
        // },
        // "& .pro-icon-wrapper": {
        //   backgroundColor: "transparent !important",
        // },
        // "& .pro-inner-item": {
        //   padding: "5px 35px 5px 20px !important",
        // },
        // "& .pro-inner-item:hover": {
        //   color: "#868dfb !important",
        // },
        // "& .pro-menu-item.active": {
        //   color: "#6870fa !important",
        // },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  REACT JS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="70px"
                  height="70px"
                  src={`https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Wandie
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Administrator
                </Typography>
              </Box>
            </Box>
          )}

          {/* Dashbord list items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <MenuItem 
              icon={<HomeOutlinedIcon />}
              component={<Link to="/" />}
              selected={selected}
              setSelected={setSelected}
                > 
              DASSS
            </MenuItem>

            <SubMenu icon={<HomeOutlinedIcon />} label="Products">

            <MenuItem 
             icon={<PeopleOutlinedIcon />}
              component={<Link to="/addproduct" />}
              // selected={selected}
              // setSelected={setSelected}
              > Add Product
              </MenuItem>

            <MenuItem 
             icon={<PeopleOutlinedIcon />}
              component={<Link to="/manage" />}
              // selected={selected}
              // setSelected={setSelected}
              > Manage Product
              </MenuItem>
          </SubMenu>


            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>

            <MenuItem 
              icon={<PeopleOutlinedIcon />}
              component={<Link to="/team" />}
              selected={selected}
              setSelected={setSelected}
                > 
              Teams
            </MenuItem>

            <MenuItem 
              icon={<ContactsOutlinedIcon />}
              component={<Link to="/contact" />}
              selected={selected}
              setSelected={setSelected}
                > 
              Contacts
            </MenuItem>

            <MenuItem 
              icon={<ReceiptOutlinedIcon />}
              component={<Link to="/invoice" />}
              selected={selected}
              setSelected={setSelected}
                > 
              Invoices
              
            </MenuItem>


            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>

            <MenuItem 
              icon={<PersonOutlinedIcon />}
              component={<Link to="/form" />}
              selected={selected}
              setSelected={setSelected}
                > 
              Form
              
            </MenuItem>

            <MenuItem 
              icon={<CalendarTodayOutlinedIcon />}
              component={<Link to="/calendar" />}
              selected={selected}
              setSelected={setSelected}
                > 
              Calendar
              
            </MenuItem>

            <MenuItem 
              icon={<HelpOutlineOutlinedIcon />}
              component={<Link to="/faq" />}
              selected={selected}
              setSelected={setSelected}
                > 
              FAQ
              
            </MenuItem>

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>

            
            <MenuItem 
              icon={<BarChartOutlinedIcon />}
              component={<Link to="/bar" />}
              selected={selected}
              setSelected={setSelected}
                > 
              Bar Chart
              
            </MenuItem>
            <MenuItem 
              icon={<PieChartOutlineOutlinedIcon />}
              component={<Link to="/pie" />}
              selected={selected}
              setSelected={setSelected}
                > 
              Pie Chart
              
            </MenuItem>
            <MenuItem 
              icon={<TimelineOutlinedIcon />}
              component={<Link to="/line" />}
              selected={selected}
              setSelected={setSelected}
                > 
              Line Chart
              
            </MenuItem>

            <MenuItem 
              icon={<MapOutlinedIcon />}
              component={<Link to="/map" />}
              selected={selected}
              setSelected={setSelected}
                > 
             Map
              
            </MenuItem>

          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;