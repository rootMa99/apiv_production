import c from "./Home.module.css";
import Efficiency from "./home/Efficiency";
import Projects from "./home/Projects";

const Home = (p) => {
  return (
    <div className={c.container}>
      <div className={c.content}>
        <Efficiency />
        <Projects />
      </div>
    </div>
  );
};

export default Home;
