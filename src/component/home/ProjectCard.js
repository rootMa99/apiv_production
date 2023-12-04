import c from "./ProjectCard.module.css";
import aptivbg from "../../assets/k9.jpg";
import { useState } from "react";

const ProjectCard = (p) => {
  const [mouseIn, setMouseIn] = useState(false);
  const clickHandler = (e) => {
    console.log("this div clicked", e);
    setMouseIn(true);
  };

  const mouseLeave = (e) => {
    console.log("mouse out");
    setMouseIn(false);
  };

  const classes= mouseIn ? `${c.cardContainer} ${c.dt}`: `${c.cardContainermini}`;
  return (
    <div
      className={c.cardContainers}
      onMouseEnter={clickHandler}
      onMouseLeave={mouseLeave}
    >
      <img src={aptivbg} alt="some backGround" />
        <div className={classes}>
          <h4>K9 HAB</h4>
          <div className={c.efficiency}>
            <div className={c.efficiencyData}>
              <h5>last day</h5>
              <span>47</span>
            </div>
            <div className={c.efficiencyData}>
              <h5>month</h5>
              <span>78</span>
            </div>
            <div className={c.efficiencyData}>
              <h5>year</h5>
              <span>587</span>
            </div>
          </div>
          {mouseIn ? (<div className={c.dataContainer}>
            <div className={`${c.contentData} ${c.hcday}`}>
              <h5>hc/day</h5>
              <span>18</span>
            </div>
            <div className={`${c.contentData} ${c.abday}`}>
              <h5>ab/day</h5>
              <span>7</span>
            </div>
            <div className={`${c.contentData} ${c.tloday}`}>
              <h5>tlo/day</h5>
              <span>26</span>
            </div>
            <div className={`${c.contentData} ${c.dt}`}>
              <h5>dt/day</h5>
              <span>5%</span>
            </div>
          </div>): ""}
        </div>
    </div>
  );
};

export default ProjectCard;
