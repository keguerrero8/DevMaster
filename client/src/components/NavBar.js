import React, { useState } from "react";
import { AppBar, Box, Toolbar, Typography, Menu, Container, IconButton, Avatar, Button, Tooltip, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from "react-router-dom";


const NavBar = ({ user, setUser }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleLogOutClick () {
    fetch("/logout", {
        method: "DELETE"
    })
    .then((r) => {
        if (r.ok) {
            setUser(null)
        }
    })
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            DevMaster
          </Typography>

         <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><NavLink style={{color: "black", textDecoration: "none"}} to="/">Home</NavLink></Typography>
                </MenuItem>
                {user ? 
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center"><NavLink style={{color: "black", textDecoration: "none"}} to="/diagrams">Diagrams</NavLink></Typography>
                    </MenuItem>
                : null }
                {user ? 
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center"><NavLink style={{color: "black", textDecoration: "none"}} to="/projects">Projects</NavLink></Typography>
                    </MenuItem>
                : null }
            </Menu>
          </Box>
          <Typography
            variant="h6" 
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            DevMaster
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
             <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#14a37f', display: 'block' }}
              >
                <NavLink style={{color: "#14a37f", textDecoration: "none"}} to="/">Home</NavLink>
             </Button>
             {user ? 
             <>
                <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: '#14a37f', display: 'block' }}
                >
                    <NavLink style={{color: "#14a37f", textDecoration: "none"}} to="/diagrams">Diagrams</NavLink>
                </Button>
                <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: '#14a37f', display: 'block' }}
                >
                    <NavLink style={{color: "#14a37f", textDecoration: "none"}} to="/projects">Projects</NavLink>
                </Button>
             </>
             : null}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
             {user ? 
             <>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src={user.avatar} />
                    </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center"><NavLink style={{color: "black", textDecoration: "none"}} to="/account" >Account</NavLink></Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center"><NavLink style={{color: "black", textDecoration: "none"}} to="/" onClick={handleLogOutClick}>Log out</NavLink></Typography>
                    </MenuItem>
                </Menu>             
             </> : 
            <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
                <NavLink style={{color: "#14a37f", textDecoration: "none"}} to="/login">Login</NavLink>
            </Button>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
