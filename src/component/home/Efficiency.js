import c from "./Efficiency.module.css";


const Efficiency=p=>{


    return(
        <div className={c.efficiency}>
          <h3>efficiency</h3>
          <div className={c.efficiencyContent}>
            <div className="">
              <h4>month</h4>
              <div>
                <span>total</span>
                <div>
                  <span>gap</span>
                  <span>target</span>
                </div>
              </div>
            </div>
            <div>
              <h4>year</h4>
              <div>
                <span>total</span>
                <div>
                  <span>gap</span>
                  <span>target</span>
                </div>
              </div>
            </div>
            <div>
              <h4>hc/day</h4>
              <div>
                <span>total</span>
                <div>
                  <span>gap</span>
                  <span>target</span>
                </div>
              </div>
            </div>
            <div>
              <h4>hc/target</h4>
              <div>
                <span>total</span>
                <div>
                  <span>gap</span>
                  <span>target</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Efficiency;