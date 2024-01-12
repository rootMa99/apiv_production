import { useState } from "react";
import c from "./Login.module.css";

const Login = (p) => {
  const [cred, setCred] = useState({
    adminName: "",
    adminPassword: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
  };
  const adminNameHandler = (e) => {
    setCred((prev) => ({
        ...prev,
        adminName:e.target.value
    }));
  };
  const passwordHandler = (e) => {
    setCred((prev) => ({
        ...prev,
        adminPassword:e.target.value
    }));
  };

  return (
    <form className={c["Form-container"]} onSubmit={submitHandler}>
      <h2 className={c["login-title"]}> Login </h2>

      <div>
        <div id="error" className={c["error-message"]}></div>
      </div>

      <div className={c["user-container"]}>
        <input
          type="text"
          name="matricule"
          placeholder="Admin Name"
          className={c["username"]}
          onChange={adminNameHandler}
          value={cred.adminName}
        />
      </div>

      <div className={c["password-container"]}>
        <input
          type="password"
          name="password"
          placeholder="Admin Password"
          className={c["userpassword"]}
          onChange={passwordHandler}
          value={cred.adminPassword}
        />
      </div>

      <button className={c["Login"]}>Submmit</button>
    </form>
  );
};

export default Login;
