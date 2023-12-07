import MonthChart from "./MonthChart";
import c from "./ProjectEfficiency.module.css";

const ProjectEfficiency = (p) => {
  return (
    <div className={c.projectEfficiencyContainer}>
      <h4>project efficiency</h4>
      <div className={c.chartContainer}>
        <div className={c.chart}>
          <MonthChart />
        </div>
        <div className={c.chart}>
          <MonthChart />
        </div>
        <div className={c.chart}>
          <MonthChart />
        </div>
      </div>
      <div className={c.chartContainer}>
        <div className={c.chart}>
          <MonthChart />
        </div>
        <div className={c.chart}>
          <MonthChart />
        </div>
        <div className={c.chart}>
          <MonthChart />
        </div>
      </div>
      <div className={c.chartContainer}>
        <div className={c.chart}>
          <MonthChart />
        </div>
        <div className={c.chart}>
          <MonthChart />
        </div>
        <div className={c.chart}>
          <MonthChart />
        </div>
      </div>
      <div className={c.chartContainer}>
        <div className={c.chart}>
          <MonthChart />
        </div>
        <div className={c.chart}>
          <MonthChart />
        </div>
        <div className={c.chart}>
          <MonthChart />
        </div>
      </div>
      <div className={c.chartContainer}>
        <div className={c.chart}>
          <MonthChart />
        </div>
        <div className={c.chart}>
          <MonthChart />
        </div>
        <div className={c.chart}>
          <MonthChart />
        </div>
      </div>
      <div className={c.chartContainer}>
        <div className={c.chart}>
          <MonthChart />
        </div>
        <div className={c.chart}>
          <MonthChart />
        </div>
        <div className={c.chart}>
          <MonthChart />
        </div>
      </div>
    </div>
  );
};

export default ProjectEfficiency;
