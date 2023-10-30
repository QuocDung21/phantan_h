import { useState } from "react";
import { Sidebar, Menu, MenuItem , SubMenu} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
// import { tokens } from "../../theme";
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
import InventoryIcon from '@mui/icons-material/InventoryOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import TransferWithinAStationOutlinedIcon from '@mui/icons-material/TransferWithinAStationOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import SwitchAccountOutlinedIcon from '@mui/icons-material/SwitchAccountOutlined';




const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box>

    {/*  Start Sidebar */}

      <Sidebar 
      
      collapsed={isCollapsed}>
        <Menu iconShape="square" style={{ backgroundColor:"#6ce4fe", color:"#000000" }}>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "0px 0 20px 0",
              color: "#000000",
              backgroundColor:"#91d7eb"
              
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color="#000000">
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
                  color="#000000"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Wandie
                </Typography>
                <Typography variant="h5" color="#000000">
                  Administrator
                </Typography>
              </Box>
            </Box>
          )}

          {/* Dashbord list items */}
          <Box paddingLeft={isCollapsed ? undefined : "0%"}>
            <MenuItem 
              icon={<HomeOutlinedIcon />}
              component={<Link to="/" />}
              selected={selected}
              setSelected={setSelected}
             

                > 
              Dashboard
            </MenuItem>

            {/* Product categories  */}
            <SubMenu icon={<InventoryIcon />} label="Product Categories">

              <MenuItem 
              icon={<ArrowRightAltIcon />}
                component={<Link to="/add_product_category" />}
                // selected={selected}
                // setSelected={setSelected}
                > Add Category
                </MenuItem>

              <MenuItem 
              icon={<ArrowRightAltIcon />}
                component={<Link to="/view_product_categories" />}
                // selected={selected}
                // setSelected={setSelected}
                > Manage Categories
                </MenuItem>

            </SubMenu>

            {/* Packages  */}
            <SubMenu icon={<Inventory2OutlinedIcon />} label="Packages">

              <MenuItem 
              icon={<ArrowRightAltIcon />}
                component={<Link to="/add_package" />}
                // selected={selected}
                // setSelected={setSelected}
                > Add Package
                </MenuItem>

              <MenuItem 
              icon={<ArrowRightAltIcon />}
                component={<Link to="/view_packages" />}
                // selected={selected}
                // setSelected={setSelected}
                > Manage Packages
                </MenuItem>

            </SubMenu>

             {/* Clients  */}
             <SubMenu icon={<PeopleAltOutlinedIcon />} label="Clients">

                  <MenuItem 
                    icon={<ArrowRightAltIcon />}
                    component={<Link to="/add_client" />}
                    // selected={selected}
                    // setSelected={setSelected}
                    > Add Client
                  </MenuItem>

                  <MenuItem 
                    icon={<ArrowRightAltIcon />}
                    component={<Link to="/view_clients" />}
                    // selected={selected}
                    // setSelected={setSelected}
                    > Manage Clients
                  </MenuItem>

             </SubMenu>

             {/* Sales  */}
             <SubMenu icon={<ShoppingCartCheckoutOutlinedIcon />} label="Sales">

                  <MenuItem 
                    icon={<ArrowRightAltIcon />}
                    component={<Link to="/add_sale" />}
                    // selected={selected}
                    // setSelected={setSelected}
                    > Add Sale
                  </MenuItem>

                  <MenuItem 
                    icon={<ArrowRightAltIcon />}
                    component={<Link to="/view_sales" />}
                    // selected={selected}
                    // setSelected={setSelected}
                    > Manage Sales
                  </MenuItem>

             </SubMenu>

             {/* Hosting Providers  */}
             <SubMenu icon={<CloudUploadOutlinedIcon />} label="Hosting Providers">

                  <MenuItem 
                    icon={<ArrowRightAltIcon />}
                    component={<Link to="/add_hosting_provider" />}
                    // selected={selected}
                    // setSelected={setSelected}
                    > Add Provider
                  </MenuItem>

                  <MenuItem 
                    icon={<ArrowRightAltIcon />}
                    component={<Link to="/view_hosting_providers" />}
                    // selected={selected}
                    // setSelected={setSelected}
                    > Manage Providers
                  </MenuItem>

             </SubMenu>

             {/* Email Reminders  */}
             <SubMenu icon={<MarkEmailUnreadOutlinedIcon />} label="Email Reminders">

                  <MenuItem 
                    icon={<ArrowRightAltIcon />}
                    component={<Link to="/add_email_reminder" />}
                    // selected={selected}
                    // setSelected={setSelected}
                    > Add  Reminder
                  </MenuItem>

                  <MenuItem 
                    icon={<ArrowRightAltIcon />}
                    component={<Link to="/view_email_reminders" />}
                    // selected={selected}
                    // setSelected={setSelected}
                    > Manage Reminders
                  </MenuItem>

             </SubMenu>

             {/* Payments  */}
             <SubMenu icon={<PaidOutlinedIcon />} label="Payments">

                  <MenuItem 
                    icon={<ArrowRightAltIcon />}
                    component={<Link to="/add_payment" />}
                    // selected={selected}
                    // setSelected={setSelected}
                    > Add  Payment
                  </MenuItem>

                  <MenuItem 
                    icon={<ArrowRightAltIcon />}
                    component={<Link to="/view_payments" />}
                    // selected={selected}
                    // setSelected={setSelected}
                    > Manage Payments
                  </MenuItem>

             </SubMenu>

             {/* Documentation  */}
             <SubMenu icon={<ArticleOutlinedIcon />} label="Documention">

                  <MenuItem 
                    icon={<ArrowRightAltIcon />}
                    component={<Link to="/add_invoice" />}
                    // selected={selected}
                    // setSelected={setSelected}
                    > Add  Invoice
                  </MenuItem>

                  <MenuItem 
                    icon={<ArrowRightAltIcon />}
                    component={<Link to="/view_invoices" />}
                    // selected={selected}
                    // setSelected={setSelected}
                    > Manage  Invoices
                  </MenuItem>

                  <MenuItem 
                    icon={<ArrowRightAltIcon />}
                    component={<Link to="/add_quotation" />}
                    // selected={selected}
                    // setSelected={setSelected}
                    > Add Quotation 
                  </MenuItem>

                  <MenuItem 
                    icon={<ArrowRightAltIcon />}
                    component={<Link to="/view_quotations" />}
                    // selected={selected}
                    // setSelected={setSelected}
                    > Manage Quotations
                  </MenuItem>

             </SubMenu>

              {/* Debtors  */}
              <SubMenu icon={<TransferWithinAStationOutlinedIcon />} label="Debtors">

                <MenuItem 
                  icon={<ArrowRightAltIcon />}
                  component={<Link to="/add_debtor" />}
                  // selected={selected}
                  // setSelected={setSelected}
                  > Add  Debtor
                </MenuItem>

                <MenuItem 
                  icon={<ArrowRightAltIcon />}
                  component={<Link to="/view_debtors" />}
                  // selected={selected}
                  // setSelected={setSelected}
                  > Manage Debtors
                </MenuItem>

              </SubMenu>


              {/* Reports  */}
              <SubMenu icon={<FolderOpenOutlinedIcon />} label="Reports">

                <MenuItem 
                  icon={<ArrowRightAltIcon />}
                  component={<Link to="/monthly_reports" />}
                  // selected={selected}
                  // setSelected={setSelected}
                  > Monthly Reports
                </MenuItem>

                <MenuItem 
                  icon={<ArrowRightAltIcon />}
                  component={<Link to="/annual_reports" />}
                  // selected={selected}
                  // setSelected={setSelected}
                  > Annual Reports
                </MenuItem>

              </SubMenu>

            


            <Typography
              variant="h6"
              color="#000000"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Account
            </Typography>

             {/* Roles  */}
             <SubMenu icon={<AdminPanelSettingsOutlinedIcon />} label="Roles">

                <MenuItem 
                  icon={<ArrowRightAltIcon />}
                  component={<Link to="/add_role" />}
                  // selected={selected}
                  // setSelected={setSelected}
                  > Add Role
                </MenuItem>

                <MenuItem 
                  icon={<ArrowRightAltIcon />}
                  component={<Link to="/view_roles" />}
                  // selected={selected}
                  // setSelected={setSelected}
                  > Manage Roles
                </MenuItem>

             </SubMenu>

              {/* Permissions  */}
              <SubMenu icon={<GroupAddOutlinedIcon />} label="Permissions">

                <MenuItem 
                  icon={<ArrowRightAltIcon />}
                  component={<Link to="/add_permission" />}
                  // selected={selected}
                  // setSelected={setSelected}
                  > Add Permission
                </MenuItem>

                <MenuItem 
                  icon={<ArrowRightAltIcon />}
                  component={<Link to="/view_permissions" />}
                  // selected={selected}
                  // setSelected={setSelected}
                  > Manage Permissions
                </MenuItem>

              </SubMenu>

              {/* Users  */}
              <SubMenu icon={<SwitchAccountOutlinedIcon />} label="Users">

                <MenuItem 
                  icon={<ArrowRightAltIcon />}
                  component={<Link to="/add_user" />}
                  // selected={selected}
                  // setSelected={setSelected}
                  > Add User
                </MenuItem>

                <MenuItem 
                  icon={<ArrowRightAltIcon />}
                  component={<Link to="/view_users" />}
                  // selected={selected}
                  // setSelected={setSelected}
                  > Manage Users
                </MenuItem>

              </SubMenu>

           

          </Box>
        </Menu>
      </Sidebar>

      {/* End Sidebar */}
    </Box>
  );
};

export default SideBar;