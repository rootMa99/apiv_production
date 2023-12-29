import "./App.css";
import React, { Suspense, useCallback, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { dataAction } from "./store/DataSlice";
import Home from "./component/Home";
import NavBar from "./component/ui/NavBar";
import ProjectDetails from "./component/projects/ProjectDetails";
import Projects from "./component/home/Projects";
import ShiftLeader from "./component/projects/shitLearderPage/ShiftLeader";
import TeamLeaders from "./component/projects/shitLearderPage/TeamLeaders";
import Crew from "./component/projects/crews/Crew";
import CoordinatorList from "./component/coordinator/CoordinatorList";
import Coordinators from "./component/coordinator/Coordinators";
import Loading from "./component/ui/Loading";

const getData = async (url) => {
  console.log("runing.....")
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

function App() {
  const [loading, setLoading] = useState(true);
  const [dataCome, setDataCome]= useState(false)
  const dispatch = useDispatch();

  const callback = useCallback(async () => {
    setLoading(true);
    const data = await getData("http://localhost:8081/data/projects");

    //dispatch(dataAction.addData(DEMO_DATA));
    dispatch(dataAction.addData(data));
    setDataCome(true);
    setTimeout(()=>{
      setLoading(false);
    }, 500)
  }, [dispatch]);

  useEffect(() => {
    callback();
  }, [callback]);

  return (
    <React.Fragment>
      {loading ? (
        <div className="wrapper">
          <Loading dataCome={dataCome} />
        </div>
      ) : (
        <div className="App">
          <NavBar />
          <Suspense>
            <Routes>
              <Route index path="/" element={<Navigate replace to="/home" />} />
              <Route exact path="/shiftLeader" element={<Loading />} />
              <Route exact path="/coordinator">
                <Route path="" element={<CoordinatorList />} />
                <Route path=":name" element={<Coordinators />} />
              </Route>
              <Route exact path="/home" element={<Home />}>
                <Route path="" element={<Projects />} />
                <Route path="project" element={<ProjectDetails />}>
                  <Route path=":project" element={<ProjectDetails />} />
                </Route>
                <Route
                  path="project/:project/shiftLeader"
                  element={<ShiftLeader />}
                >
                  <Route path=":shitLeader" element={<ShiftLeader />} />
                </Route>
                <Route
                  path="project/:project/shiftLeader/:shitLeader/teamLeader"
                  element={<TeamLeaders />}
                >
                  <Route path=":teamLeader" element={<TeamLeaders />} />
                </Route>
                <Route
                  path="project/:project/shiftLeader/:shitLeader/teamLeader/:teamLeader/crew"
                  element={<Crew />}
                >
                  <Route path=":crew" element={<Crew />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
