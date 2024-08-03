import React, { useEffect } from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSidebarStatus, setSidebarOff } from "../../store/sidebarSlice";

import {
  fetchAsyncCategories,
  getAllCategories,
} from "../../store/categorySlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOn = useSelector(getSidebarStatus);
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    if (isSidebarOn) {
      dispatch(fetchAsyncCategories());
    }

    return () => {};
  }, [isSidebarOn]);

  return (
    <aside className={`sidebar ${isSidebarOn ? "hide-sidebar" : ""}`}>
      <button
        type="button"
        className="sidebar-hide-btn"
        onClick={() => dispatch(setSidebarOff())}
      >
        <i className="fas fa-times"></i>
      </button>

      <div className="sidebar-cnt">
        <div className="cat-title fs-17 text-uppercse fw-6 ls-h1">
          All Categories
        </div>
        <ul className="cat-list">
          {categories.map(({ name }) => (
            <li key={name} onClick={() => dispatch(setSidebarOff())}>
              <Link className="cat-list-link text-capitalizeC" to={`category/${name}`}>
                {name.replace("-", " ")}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
