import { useSelector } from "react-redux";
import c from "./Admin.module.css";
import Login from "./Login";
import React, { useState } from "react";
import ProjectUpload from "./ProjectUpload";
import admin from "../../assets/admin.png"
import ShiftLeaderAdmin from "./ShiftLeaderAdmin";
import ShiftLeadersAdmin from "./ShitleadersAdmin";
import UploadExcelData from "./UploadExcelData";
import AdminPanel from "./AdminPanel";

const Admin = (p) => {
  const { login } = useSelector((s) => s.additionalData);
  const [rendered, setRendred] = useState({
    excel: false,
    projects: false,
    coordinator: false,
    sl: false,
    admin:false
  });
  const data = useSelector((s) => s.datas);
  console.log(data);
  const excelHandelr = (e) => {
    setRendred({
      excel: true,
      projects: false,
      coordinator: false,
      sl: false,
      admin:false
    });
  };
  const projectsHandelr = (e) => {
    setRendred({
      excel: false,
      projects: true,
      coordinator: false,
      sl: false,
      admin:false
    });
  };
  const coordinatorHandelr = (e) => {
    setRendred({
      excel: false,
      projects: false,
      coordinator: true,
      sl: false,
      admin:false
    });
  };
  const slHandelr = (e) => {
    setRendred({
      excel: false,
      projects: false,
      coordinator: false,
      sl: true,
      admin:false
    });
  };

  const adminHandler=e=>{
    setRendred({
      excel: false,
      projects: false,
      coordinator: false,
      sl: false,
      admin:true
    });
  }
  
  return (
    <div className={c.wrapper}>
      <h1 className={c.header}>Admin Page</h1>
      {!login.isLogged ? (
        <Login />
      ) : (
        <React.Fragment>
          <div className={c.sideBar}>
            <ul className={c.ul}>
              <li
                className={rendered.excel ? c.active : ""}
                onClick={excelHandelr}
              >
                Execl Data
              </li>
              <li
                className={rendered.projects ? c.active : ""}
                onClick={projectsHandelr}
              >
                Projects
              </li>
              <li
                className={rendered.coordinator ? c.active : ""}
                onClick={coordinatorHandelr}
              >
                Coordinators
              </li>
              <li className={rendered.sl ? c.active : ""} onClick={slHandelr}>
                Shift Leaders
              </li>
              <li className={rendered.admin ? c.active : ""} onClick={adminHandler}>
                admin
              </li>
            </ul>
          </div>
          <div className={c.projectsContainer}>
          {
            (!rendered.excel && !rendered.coordinator && !rendered.projects && !rendered.sl && !rendered.admin) && <img src={admin} alt="admin" />
          }
            {rendered.projects &&
              data.map((m, i) => (
                <ProjectUpload title={m.name} img={m.projectUriPic} key={i} />
              ))}
              {
                rendered.coordinator && <ShiftLeaderAdmin data={data} />
              }
              {
                rendered.sl&&<ShiftLeadersAdmin data={data} />
              }

              {
                rendered.excel&&<UploadExcelData />
              }
              {
                rendered.admin&&<AdminPanel />
              }
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
export default Admin;
