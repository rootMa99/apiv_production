import styles from "./Coordinator.module.css";
import apticlogo from "../../assets/aptiv-logo.svg";
import { useNavigate } from "react-router-dom";
const Coordinator = (p) => {

  const Navigate=useNavigate();

  const clickHandler=e=>{

  }

  return (
    
      <div className={styles['full-card']} onClick={clickHandler}>
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
              src={p.pic}
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
              <span>{p.name!==undefined?p.name : 'hamza Khartaoui'}</span>
            </div>
            <div className={styles['coordinator-features']}>
              <div className={styles['coordinator-features-col']}>
                <span>
                  <div className={styles['coordinator-feature-value']}>97%</div>
                  <div className={styles['coord-feature-title']}>effici</div>
                </span>
                <span>
                  <div className={styles['coordinator-feature-value']}>95%</div>
                  <div className={styles['coord-feature-title']}>gap</div>
                </span>
                <span>
                  <div className={styles['coordinator-feature-value']}>94</div>
                  <div className={styles['coord-feature-title']}>hc</div>
                </span>
              </div>
              <div className={styles['coordinator-features-col']}>
                <span>
                  <div className={styles['coordinator-feature-value']}>99</div>
                  <div className={styles['coord-feature-title']}>output</div>
                </span>
                <span>
                  <div className={styles['coordinator-feature-value']}>35</div>
                  <div className={styles['coord-feature-title']}>wsd</div>
                </span>
                <span>
                  <div className={styles['coordinator-feature-value']}>68</div>
                  <div className={styles['coord-feature-title']}>scrap</div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Coordinator;
