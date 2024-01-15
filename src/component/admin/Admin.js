import { useSelector } from "react-redux";
import c from "./Admin.module.css";
import Login from "./Login";
import React from "react";
import ProjectUpload from "./ProjectUpload";

const Admin = (p) => {
  const { login } = useSelector((s) => s.additionalData);
  const data = useSelector((s) => s.datas);
  console.log(data);
  return (
    <div className={c.wrapper}>
      <h1 className={c.header}>Admin Page</h1>
      {!login.isLogged ? <Login /> : <React.Fragment>
      <div className={c.projectsContainer} >

        {
            data.map((m, i)=><ProjectUpload title={m.name} img={m.projectUriPic} key={i}/>)
        }
      </div>
      </React.Fragment>}
    </div>
  );
};
export default Admin;
