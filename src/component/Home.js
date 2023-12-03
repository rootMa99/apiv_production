import c from "./Home.module.css";
import Efficiency from "./home/Efficiency";

const Home = (p) => {
  return (
    <div className={c.container}>
      <div className={c.content}>
        <Efficiency />
      </div>
    </div>
  );
};

export default Home;
