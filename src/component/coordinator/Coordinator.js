import styles from "./Coordinator.module.css";
import apticlogo from "../../assets/aptiv-logo.svg";
import { useNavigate } from "react-router-dom";
const Coordinator = (p) => {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    p.level === "coordinator" && navigate(`/coordinator/${p.name}`);
    p.level === "shiftLeader" && p.setShiftleader(p.name);
  };

  return (
    <div className={styles["full-card"]} onClick={clickHandler}>
      <div className={styles["full-card-top"]}>
        <div
          className={styles["coordinator-info"]}
          style={
            p.level === "coordinator"
              ? { "line-height": "2rem", "font-weight": 500 }
              : {}
          }
        >
          <div
            className={styles["coordinator-eff"]}
            style={p.level === "coordinator" ? { "font-size": "2rem" } : {}}
          >
            <span>97%</span>
          </div>
          <div
            className={styles["eff-title"]}
            style={p.level === "coordinator" ? { "font-size": "2rem" } : {}}
          >
            <span>eff</span>
          </div>
          <div className={styles["aptiv-log"]}>
            <img src={apticlogo} alt="aptiv" draggable="false" />
          </div>
        </div>
        <div
          className={styles["coordinator-pic"]}
          style={
            p.level === "coordinator" ? { width: "250px", height: "250px" } : {}
          }
        >
          <img src={p.pic} alt="coordinator" draggable="false" />
          <div className={styles["poste-title"]}>
            <span>Coordinator</span>
          </div>
        </div>
      </div>
      <div className={styles["full-card-bottom"]}>
        <div className={styles["coordinator-infos"]}>
          <div
            className={styles["coordinator-name"]}
            style={p.level === "coordinator" ? { "font-size": "2rem" } : {}}
          >
            <span>{p.name !== undefined ? p.name : "hamza Khartaoui"}</span>
          </div>
          <div className={styles["coordinator-features"]}>
            <div
              className={styles["coordinator-features-col"]}
              style={p.level === "coordinator" ? {"padding-bottom":"1rem"} : {}}
            >
              <span>
                <div
                  className={styles["coordinator-feature-value"]}
                  style={
                    p.level === "coordinator" ? { "font-size": "1rem" } : {}
                  }
                >
                  97%
                </div>
                <div
                  className={styles["coord-feature-title"]}
                  style={
                    p.level === "coordinator" ? { "font-size": "1rem" } : {}
                  }
                >
                  effici
                </div>
              </span>
              <span>
                <div
                  className={styles["coordinator-feature-value"]}
                  style={
                    p.level === "coordinator" ? { "font-size": "1rem" } : {}
                  }
                >
                  +3.6
                </div>
                <div
                  className={styles["coord-feature-title"]}
                  style={
                    p.level === "coordinator" ? { "font-size": "1rem" } : {}
                  }
                >
                  gap
                </div>
              </span>
              <span>
                <div
                  className={styles["coordinator-feature-value"]}
                  style={
                    p.level === "coordinator" ? { "font-size": "1rem" } : {}
                  }
                >
                  36
                </div>
                <div
                  className={styles["coord-feature-title"]}
                  style={
                    p.level === "coordinator" ? { "font-size": "1rem" } : {}
                  }
                >
                  hc
                </div>
              </span>
            </div>
            <div
              className={styles["coordinator-features-col"]}
              style={p.level === "coordinator" ? {"padding-bottom":"1rem"} : {}}
            >
              <span>
                <div
                  className={styles["coordinator-feature-value"]}
                  style={
                    p.level === "coordinator" ? { "font-size": "1rem" } : {}
                  }
                >
                  99pc
                </div>
                <div
                  className={styles["coord-feature-title"]}
                  style={
                    p.level === "coordinator" ? { "font-size": "1rem" } : {}
                  }
                >
                  output
                </div>
              </span>
              <span>
                <div
                  className={styles["coordinator-feature-value"]}
                  style={
                    p.level === "coordinator" ? { "font-size": "1rem" } : {}
                  }
                >
                  35min
                </div>
                <div
                  className={styles["coord-feature-title"]}
                  style={
                    p.level === "coordinator" ? { "font-size": "1rem" } : {}
                  }
                >
                  wsd
                </div>
              </span>
              <span>
                <div
                  className={styles["coordinator-feature-value"]}
                  style={
                    p.level === "coordinator" ? { "font-size": "1rem" } : {}
                  }
                >
                  68sh/gr
                </div>
                <div
                  className={styles["coord-feature-title"]}
                  style={
                    p.level === "coordinator" ? { "font-size": "1rem" } : {}
                  }
                >
                  scrap
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coordinator;
