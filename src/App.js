import React from "react";
import { Routes, Route } from 'react-router-dom';
import Main from "./pages/Main";
import { useDispatch, useSelector } from "react-redux";
import { axiosCustomers } from "./asyncActions/customers";

function App() {
  const dispatch = useDispatch()
  const userCompetitions = useSelector(state => state.myCompetitions);
  const [loaded, setloaded] = React.useState(false);

  React.useEffect(() => {
    dispatch(axiosCustomers(setloaded))
  }, [])

  function addedToMyCompetitions(id) {
    return userCompetitions.some(competitions => competitions.parentId === id);
  }

  return (
    <Routes>
      <Route path="/eclectium"
        element={<Main
          loaded={loaded}
          addedToMyCompetitions={addedToMyCompetitions}
        />}
      />
    </Routes>
  );
}

export default App;
