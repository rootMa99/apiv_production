import c from "./ServerError.module.css";
import logo from "../../assets/500Server.png";
import logoor from "../../assets/aptiv_logo_rev_orange_rgb.png";


const ServerError = (p) => {
  return (
    <div className={c.wrapper}>
    <div className={c.par}>
        <img src={logoor} alt="logo aptiv" className={c.imgs} />
        <p className={c.message}>We encountered an error from the server</p>
    </div>
      <img src={logo} alt="no connection" className={c.img} />
    </div>
  );
};
export default ServerError;
