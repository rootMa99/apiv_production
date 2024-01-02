import c from "./ServerError.module.css";
import logo from "../../assets/500Server.png";

const ServerError = (p) => {
  return (
    <div className={c.wrapper}>
      <img src={logo} alt="no connection" className={c.img} />
    </div>
  );
};
export default ServerError;
