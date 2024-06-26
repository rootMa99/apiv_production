import styles from "./Coordinator.module.css";
import apticlogo from "../../assets/aptiv-logo.svg";
import { useNavigate } from "react-router-dom";
import {
  coordinatorEfficiency,
  getScrap,
  getdatacal,
} from "../hooks/coordinatorDataFilters";
const Coordinator = (p) => {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    if (p.flags) {
      p.clickhHandler();
      return;
    }
    if (p.flagss) {
      p.clickhHandler();
      return;
    }
    if (p.flag) {
      p.clickhHandler();
      return;
    }
    p.level === "coordinator" && navigate(`/coordinator/${p.name}`);
    p.level === "shiftLeader" && p.setShiftleader(p.name);
    p.level === "teamleader" && p.setShiftleaderi(p.name);
  };
  let efficiency;
  let effi = { act: 0, target: 0, gap: 0 };
  let output = 0;
  let hc = 0;
  let wsd = 0;
  let scrap = 0;

  efficiency = coordinatorEfficiency(p.data, p.type.value, p.level);
  effi.act =
    efficiency.totalPaidH !== 0
      ? ((efficiency.totalProdH / efficiency.totalPaidH) * 100).toFixed(0)
      : 0;
  effi.target =
    efficiency.totalPaidHT !== 0
      ? ((efficiency.totalProdHT / efficiency.totalPaidHT) * 100).toFixed(0)
      : 0;
  effi.gap = (effi.act - effi.target).toFixed(0);
  output = getdatacal(p.data, p.type.value, "output", p.level);
  hc = getdatacal(p.data, p.type.value, "hc", p.level);
  wsd = getdatacal(p.data, p.type.value, "wsd", p.level);
  scrap = getScrap(p.data, p.type.value, p.level).toFixed(0);

  return (
    <div
      className={styles["full-card"]}
      onClick={clickHandler}
      style={
        p.level === "coordinator" || p.level === "fa" ? { width: "20rem" } : {}
      }
    >
      <div className={styles["full-card-top"]}>
        <div
          className={styles["coordinator-info"]}
          style={
            p.level === "coordinator" || p.level === "fa"
              ? { lineHeight: "2rem", fontWeight: 500 }
              : {}
          }
        >
          <div
            className={styles["coordinator-eff"]}
            style={
              p.level === "coordinator" || p.level === "fa"
                ? { fontSize: "2rem" }
                : {}
            }
          >
            <span>{effi.act}%</span>
          </div>
          <div
            className={styles["eff-title"]}
            style={
              p.level === "coordinator" || p.level === "fa"
                ? { fontSize: "2rem" }
                : {}
            }
          >
            <span>eff</span>
          </div>
          <div
            className={styles["aptiv-log"]}
            style={
              p.level === "coordinator" || p.level === "fa"
                ? { width: "6rem", height: "3rem" }
                : {}
            }
          >
            <img src={apticlogo} alt="aptiv" draggable="false" />
          </div>
        </div>
        <div
          className={styles["coordinator-pic"]}
          style={
            p.level === "coordinator" || p.level === "fa"
              ? { width: "250px", height: "250px" }
              : {}
          }
        >
          {p.pic !== null && (
            <img src={p.pic} alt={p.level} draggable="false" />
          )}
          <div className={styles["poste-title"]}>
            <span>{p.level}</span>
          </div>
        </div>
      </div>
      <div className={styles["full-card-bottom"]}>
        <div className={styles["coordinator-infos"]}>
          <div
            className={styles["coordinator-name"]}
            style={
              p.level === "coordinator" || p.level === "fa"
                ? { fontSize: "2rem" }
                : {}
            }
          >
            <span>{p.name !== undefined ? p.name : "hamza Khartaoui"}</span>
          </div>
          <div className={styles["coordinator-features"]}>
            <div
              className={styles["coordinator-features-col"]}
              style={
                p.level === "coordinator" || p.level === "fa"
                  ? { paddingBottom: "1rem" }
                  : {}
              }
            >
              <span>
                <div
                  className={styles["coordinator-feature-value"]}
                  style={
                    p.level === "coordinator" || p.level === "fa"
                      ? { fontSize: "1rem" }
                      : {}
                  }
                >
                  {effi.act}%
                </div>
                <div
                  className={styles["coord-feature-title"]}
                  style={
                    p.level === "coordinator" || p.level === "fa"
                      ? { fontSize: "1rem" }
                      : {}
                  }
                >
                  eff
                </div>
              </span>
              <span>
                <div
                  className={styles["coordinator-feature-value"]}
                  style={
                    p.level === "coordinator" || p.level === "fa"
                      ? { fontSize: "1rem" }
                      : {}
                  }
                >
                  {effi.gap}%
                </div>
                <div
                  className={styles["coord-feature-title"]}
                  style={
                    p.level === "coordinator" || p.level === "fa"
                      ? { fontSize: "1rem" }
                      : {}
                  }
                >
                  gap
                </div>
              </span>
              <span>
                <div
                  className={styles["coordinator-feature-value"]}
                  style={
                    p.level === "coordinator" || p.level === "fa"
                      ? { fontSize: "1rem" }
                      : {}
                  }
                >
                  {hc.toFixed(0)}
                </div>
                <div
                  className={styles["coord-feature-title"]}
                  style={
                    p.level === "coordinator" || p.level === "fa"
                      ? { fontSize: "1rem" }
                      : {}
                  }
                >
                  hc
                </div>
              </span>
            </div>
            <div
              className={styles["coordinator-features-col"]}
              style={
                p.level === "coordinator" || p.level === "fa"
                  ? { paddingBottom: "1rem" }
                  : {}
              }
            >
              <span>
                <div
                  className={styles["coordinator-feature-value"]}
                  style={
                    p.level === "coordinator" || p.level === "fa"
                      ? { fontSize: "1rem" }
                      : {}
                  }
                >
                  {output.toFixed(0)}pc
                </div>
                <div
                  className={styles["coord-feature-title"]}
                  style={
                    p.level === "coordinator" || p.level === "fa"
                      ? { fontSize: "1rem" }
                      : {}
                  }
                >
                  output
                </div>
              </span>
              <span>
                <div
                  className={styles["coordinator-feature-value"]}
                  style={
                    p.level === "coordinator" || p.level === "fa"
                      ? { fontSize: "1rem" }
                      : {}
                  }
                >
                  {wsd.toFixed(0)}min
                </div>
                <div
                  className={styles["coord-feature-title"]}
                  style={
                    p.level === "coordinator" || p.level === "fa"
                      ? { fontSize: "1rem" }
                      : {}
                  }
                >
                  wsd
                </div>
              </span>
              <span>
                <div
                  className={styles["coordinator-feature-value"]}
                  style={
                    p.level === "coordinator" || p.level === "fa"
                      ? { fontSize: "1rem" }
                      : {}
                  }
                >
                  {scrap}s/gr
                </div>
                <div
                  className={styles["coord-feature-title"]}
                  style={
                    p.level === "coordinator" || p.level === "fa"
                      ? { fontSize: "1rem" }
                      : {}
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
