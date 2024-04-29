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
import ServerError from "./component/ui/ServerError";
import Admin from "./component/admin/Admin";
import Comparison from "./component/comparison/Comparison";
// import { getstartAndendDate } from "./component/hooks/chart2excel";

const getData = async (url) => {
  console.log("runing.....");
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
    return "error";
  }
};

function App() {
  // const {date} = useSelector((s) => s.additionalData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dataCome, setDataCome] = useState(false);
  const dispatch = useDispatch();
  // const {startYear, endYear}=getstartAndendDate(date);
  // console.log(date, startYear, endYear)

  const callback = useCallback(async () => {
    setLoading(true);
    const data = await getData(`http://10.236.148.13:8081/data/projects`);
    console.log(data);
    //dispatch(dataAction.addData(DEMO_DATA));
    if (data !== "error") {
      dispatch(dataAction.addData(data));
    } else {
      setError(true);
    }
    setDataCome(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
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
        <React.Fragment>
          {error ? (
            <ServerError />
          ) : (
            <div className="App">
              <NavBar />
              <Suspense>
                <Routes>
                  <Route
                    index
                    path="/"
                    element={<Navigate replace to="/home" />}
                  />
                  <Route exact path="/shiftLeader" element={<Loading />} />
                  <Route exact path="/coordinator">
                    <Route path="" element={<CoordinatorList />} />
                    <Route path=":name" element={<Coordinators />} />
                  </Route>
                  <Route exact path="/home" element={<Home />}>
                    <Route path="" element={<Projects />} />
                    <Route path="comparison" element={<Comparison />} />
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
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<Navigate replace to="/home" />} />
                </Routes>
              </Suspense>
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default App;
