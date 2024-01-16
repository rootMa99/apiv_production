import { useState } from "react";
import c from "./AdminPanel.module.css";
import UploadAdminPic from "./UploadAdminPic";
import ChangePwd from "./ChangePwd";

const AdminPanel = (p) => {
  const [rendered, setRendred] = useState({
    uploadPic: true,
    changePwd: false,
  });

  const clickHandelr = (e) => {
    setRendred({
      uploadPic: true,
      changePwd: false,
    });
  };

  const clickHandelrpwd = (e) => {
    setRendred({
      uploadPic: false,
      changePwd: true,
    });
  };

  return (
    <div className={c.wrapper}>
      <ul className={c.ul}>
        <li
          className={rendered.uploadPic ? c.active : ""}
          onClick={clickHandelr}
        >
          upload pic
        </li>
        <li
          className={rendered.changePwd ? c.active : ""}
          onClick={clickHandelrpwd}
        >
          change password
        </li>
      </ul>

      {rendered.uploadPic && <UploadAdminPic />}
      {rendered.changePwd && <ChangePwd />}
    </div>
  );
};

export default AdminPanel;
