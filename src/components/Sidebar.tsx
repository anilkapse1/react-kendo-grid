import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "cyan" : "white",
    textDecoration: "none",
  });

  return (
    <nav
      style={{
        width: "200px",
        background: "#282c34",
        color: "white",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h2>KENDO</h2>
      <NavLink to="/" style={linkStyle} end>
        Kendo1
      </NavLink>
      <NavLink to="/kendo1" style={linkStyle}>
        Kendo2
      </NavLink>
      <NavLink to="/kendo2" style={linkStyle}>
        Kendo2
      </NavLink>
    </nav>
  );
};

export default Sidebar;
