import "./App.css";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { dataAction } from "./store/DataSlice";
import Home from "./component/Home";
import NavBar from "./component/ui/NavBar";
import DEMO_DATA from "./component/DEMO_DATA";
import ProjectDetails from "./component/projects/ProjectDetails";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dataAction.addData(DEMO_DATA));
  }, [dispatch]);

  return (
    <div className="App">
      <NavBar />
      <Suspense>
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/home" />} />
          <Route exact path="/home" element={<Home />}>
            <Route exact path="/home/project">
              <Route path=":project" element={<ProjectDetails />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
