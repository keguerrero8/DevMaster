import React from "react";
import { NavLink } from "react-router-dom";
import Button from '@mui/material/Button';

function NavBar({ user, setUser }) {

    function handleClick () {
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
    <header>
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/graphs">
        Graphs
      </NavLink>
      <NavLink to="/projects">
        Projects
      </NavLink>
      {user ? 
        <NavLink to="/"><Button variant="outlined" size="small" onClick={handleClick} >Log out</Button></NavLink> :
        <NavLink to="/login">Login</NavLink>
      }
    </header>
  );
}

export default NavBar;