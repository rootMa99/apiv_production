import { useState } from "react";
import c from "./Login.module.css";
import { useSelector } from "react-redux";

const getData = async (uri, body, jwtToken) => {
  try {
    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const ChangePwd = (p) => {
  const [cred, setCred] = useState({
    adminPasswordi: "",
    adminPasswordii: "",
  });
  const [match, setMatch] = useState(true);
  const { login } = useSelector((s) => s.additionalData);
  const submitHandler = async (e) => {
    e.preventDefault();
    const jwtToken = login.token;
    if (
      cred.adminPasswordi.trim() === "" ||
      cred.adminPasswordii.trim() ||
      !match
    ) {
      console.log("not submmit");
      return;
    }

    const body = {
      password: cred.adminPasswordi,
    };
    try {
      const data = await getData(
        "http://localhost:8081/auth/signin",
        body,
        jwtToken
      );
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const passwordiHandler = (e) => {
    setCred((prev) => ({
      ...prev,
      adminPasswordi: e.target.value,
    }));
    if (cred.adminPasswordii === e.target.value) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  };
  const passwordiiHandler = (e) => {
    setCred((prev) => ({
      ...prev,
      adminPasswordii: e.target.value,
    }));
    if (cred.adminPasswordi === e.target.value) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  };

  return (
    <form className={c["Form-container"]} onSubmit={submitHandler}>
      <h2 className={c["login-title"]}> Change Password </h2>
      <div className={c["user-container"]}>
        <input
          type="password"
          name="matricule"
          placeholder="New Password"
          className={c["username"]}
          onChange={passwordiHandler}
          value={cred.adminPasswordi}
        />
      </div>

      <div className={c["password-container"]}>
        {!match && (
          <p className={c.pargErr}>
            The passwords you entered do not match. Please try again.
          </p>
        )}
        <input
          type="password"
          name="password"
          placeholder="Please re-enter your password"
          className={c["userpassword"]}
          onChange={passwordiiHandler}
          value={cred.adminPasswordii}
          style={!match ? { border: "3px solid red" } : {}}
        />
      </div>

      <button className={c["Login"]}>Submmit</button>
    </form>
  );
};

export default ChangePwd;
