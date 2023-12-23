import styles from "./Coordinator.module.css";
import hamzaKhartaoui from "../../assets/hamzaKhartaoui.png";
import apticlogo from "../../assets/aptiv-logo.svg";
const Coordinator = () => {
  return (
    
      <div className={styles['full-card']}>
        <div className={styles['full-card-top']}>
          <div className={styles['coordinator-info']}>
            <div className={styles['coordinator-eff']}>
              <span>97%</span>
            </div>
            <div className={styles['eff-title']}>
              <span>eff</span>
            </div>
            <div className={styles['aptiv-log']}>
              <img
                src={apticlogo}
                alt="aptiv"
                draggable="false"
              />
            </div>
          </div>
          <div className={styles['coordinator-pic']}>
            <img
              src={hamzaKhartaoui}
              alt="coordinator"
              draggable="false"
            />
            <div className={styles['poste-title']}>
              <span>Coordinator</span>
            </div>
          </div>
        </div>
        <div className={styles['full-card-bottom']}>
          <div className={styles['coordinator-infos']}>
            <div className={styles['coordinator-name']}>
              <span>hamza Khartaoui</span>
            </div>
            <div className={styles['coordinator-features']}>
              <div className={styles['coordinator-features-col']}>
                <span>
                  <div className={styles['coordinator-feature-value']}>97%</div>
                  <div className={styles['coord-feature-title']}>eff</div>
                </span>
                <span>
                  <div className={styles['coordinator-feature-value']}>95%</div>
                  <div className={styles['coord-feature-title']}>SHO</div>
                </span>
                <span>
                  <div className={styles['coordinator-feature-value']}>94</div>
                  <div className={styles['coord-feature-title']}>PAS</div>
                </span>
              </div>
              <div className={styles['coordinator-features-col']}>
                <span>
                  <div className={styles['coordinator-feature-value']}>99</div>
                  <div className={styles['coord-feature-title']}>DRI</div>
                </span>
                <span>
                  <div className={styles['coordinator-feature-value']}>35</div>
                  <div className={styles['coord-feature-title']}>DEF</div>
                </span>
                <span>
                  <div className={styles['coordinator-feature-value']}>68</div>
                  <div className={styles['coord-feature-title']}>PHY</div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Coordinator;
