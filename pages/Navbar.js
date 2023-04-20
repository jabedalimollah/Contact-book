import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="navbar" style={NavbarStyle}>
        <h4 style={NavbarTitle}>Contact Book</h4>
      </div>
    </>
  );
};
const NavbarStyle = {
  width: "100%",
  height: "50px",
  backgroundColor: "black",
  // position: "fixed",
};
const NavbarTitle = {
  marginLeft: "10px",
  fontWeight: "bold",
};
export default Navbar;
