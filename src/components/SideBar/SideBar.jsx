import React, { useContext, useState } from "react";
import { AuthContext } from '../../Context/AuthContext'
import { Link } from "react-router-dom";
import {
  FaBook,
  FaUser,
  FaPenNib,
  FaBuilding,
  FaHandHolding,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import "./SideBar.css";

function SideBar() {
  const { user } = useContext(AuthContext);
  const [hoverItem, setHoverItem] = useState(null);

  const { role } = user;

  return (
    <div className= "sidebar" >
      
      {/* Books */}
      {role === "ADMIN" && (
        <div
          className="sidebar-item"
          onMouseEnter={() => setHoverItem("books")}
          onMouseLeave={() => setHoverItem(null)}
        >
          <span className="sidebar-link">
            <FaBook /> Books
          </span>
          {hoverItem === "books" && (
            <div className="dropdown-menu">
              <Link to="books/all" className="dropdown-item">
                All
              </Link>
              <Link to="add-book" className="dropdown-item">
                Add
              </Link>
              <Link to="books/res" className="dropdown-item">
                Reserved
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Members */}
      {role === "ADMIN" && (
        <div
          className="sidebar-item"
          onMouseEnter={() => setHoverItem("members")}
          onMouseLeave={() => setHoverItem(null)}
        >
          <span className="sidebar-link">
            <FaUser /> Members
          </span>
          {hoverItem === "members" && (
            <div className="dropdown-menu">
              <Link to="members?from=member" className="dropdown-item">
                All
              </Link>
              <Link to="mem-req?from=user" className="dropdown-item">
                Requests
              </Link>
            </div>
          )}
        </div>
      )}


      {/* Authors */}
      {role === "ADMIN" && (
        <div
          className="sidebar-item"
          onMouseEnter={() => setHoverItem("authors")}
          onMouseLeave={() => setHoverItem(null)}
        >
          <span className="sidebar-link">
            <FaPenNib /> Authors
          </span>
          {hoverItem === "authors" && (
            <div className="dropdown-menu">
              <Link to="authors" className="dropdown-item">
                All
              </Link>
              <Link to="add-author" className="dropdown-item">
                Add
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Publishers */}
      {role === "ADMIN" && (
        <div
          className="sidebar-item"
          onMouseEnter={() => setHoverItem("publishers")}
          onMouseLeave={() => setHoverItem(null)}
        >
          <span className="sidebar-link">
            <FaBuilding /> Publishers
          </span>
          {hoverItem === "publishers" && (
            <div className="dropdown-menu">
              <Link to="publishers" className="dropdown-item">
                All
              </Link>
              <Link to="add-publisher" className="dropdown-item">
                Add
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Reports */}
      {role === "ADMIN" && (
        <div
          className="sidebar-item"
          onMouseEnter={() => setHoverItem("reports")}
          onMouseLeave={() => setHoverItem(null)}
        >
          <span className="sidebar-link">
            <FaHandHolding /> Reports
          </span>
          {hoverItem === "reports" && (
            <div className="dropdown-menu">
              <Link to="borrow-reports" className="dropdown-item">
                Borrow
              </Link>
              <Link to="due-reports" className="dropdown-item">
                Dues
              </Link>
              <Link to="all-records" className="dropdown-item">
                All Records
              </Link>
              <Link to="discard-books" className="dropdown-item">
                Discard Books
              </Link>
              <Link to="return" className="dropdown-item">
                Return
              </Link>
            </div>
          )}
        </div>
      )}
      
    </div>
  );
}

export default SideBar;
