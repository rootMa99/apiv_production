import c from "./ProjectCard.module.css";

const ProjectCard = (p) => {

    const clickHandler=e=>{
        console.log("this div clicked", e)
    }


  return (
    <div className={c.cardContainer} onClick={clickHandler}>
      <h4>K9 HAB</h4>
      <div className={c.efficiency}>
        <div className={c.efficiencyData}>
          <h5>month</h5>
          <span>78</span>
        </div>
        <div className={c.efficiencyData}>
          <h5>last day</h5>
          <span>78</span>
        </div>
        <div className={c.efficiencyData}>
          <h5>year</h5>
          <span>78</span>
        </div>
      </div>
      <div className={c.dataContainer}>
        <div className={c.contentData}>
          <h5>hc/day</h5>
          <span>78</span>
        </div>
        <div className={c.contentData}>
          <h5>ab/day</h5>
          <span>78</span>
        </div>
        <div className={c.contentData}>
          <h5>tlo/day</h5>
          <span>78</span>
        </div>
        <div className={c.contentData}>
          <h5>dt/day</h5>
          <span>5%</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
