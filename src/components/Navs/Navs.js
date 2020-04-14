import React from "react";
import { Link } from "react-router-dom";

export default function Navs() {
  return (
    <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-light">
      <Link className="navbar-brand" to="/">
        Navbar
      </Link>
      <Link className="nav-link" style={{color: "#FFF"}} to="/radio-page">Bài tập Radio 2020/04/08</Link>
    </nav>
  );
}
