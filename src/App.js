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

const getData = async (url) => {
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
  const dispatch = useDispatch();

  const callback = useCallback(async () => {
    setLoading(true);
    const data = await getData("http://localhost:8081/data/projects");

    //dispatch(dataAction.addData(DEMO_DATA));
    dispatch(dataAction.addData(data));
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    callback();
  }, [callback]);

  return (
    <React.Fragment>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <div className="App">
          <NavBar />
          <Suspense>
            <Routes>
              <Route index path="/" element={<Navigate replace to="/home" />} />
              <Route exact path="/home" element={<Home />}>
                <Route path="" element={<Projects />} />
                <Route path="project" element={<ProjectDetails />}>
                  <Route path=":project" element={<ProjectDetails />} />
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
