import React from "react";
import axios from "axios";
import { Routes, Route } from 'react-router-dom';
import Main from "./pages/Main";

function App() {
  const [competitions, setCompetitions] = React.useState([]);
  const [userCompetitions, setUserCompetitions] = React.useState([]);
  const [loaded, setloaded] = React.useState(false);

  React.useEffect(() => {
    (async function () {
      try {
        setloaded(true);
        const competitions = await axios.get('https://647b9749d2e5b6101db174ef.mockapi.io/competitions');
        const userCompetitions = await axios.get('https://647b9749d2e5b6101db174ef.mockapi.io/my-competitions');
        setCompetitions(competitions.data);
        setUserCompetitions(userCompetitions.data);
        setloaded(false);
      } catch (error) {
        setloaded(false);
        alert('При загрузке данных произошла ошибка :(')
      }
    }());
  }, [])

  async function addCompetition(obj) {
    const findItem = userCompetitions.find(competition => competition.parentId === obj.id);

    try {
      if (findItem) {
        axios.delete(`https://647b9749d2e5b6101db174ef.mockapi.io/my-competitions/${findItem.id}`);
        setUserCompetitions(prev => prev.filter(competition => competition.parentId !== obj.parentId));
      } else {
        setUserCompetitions(prev => [...prev, obj]);
        const { data } = await axios.post('https://647b9749d2e5b6101db174ef.mockapi.io/my-competitions', obj);
        setUserCompetitions(prev => prev.map(competition => {
          if (competition.parentId === obj.id) {
            return {
              ...competition,
              id: data.id
            }
          }
          return competition;
        }))
      }
    } catch (error) {
      alert('При запросе возникла ошибка :(')
    }
  }

  function addedToMyCompetitions(id) {
    return userCompetitions.some(competitions => competitions.parentId === id);
  }

  return (
    <Routes>
      <Route path="/eclectium"
        element={<Main
          loaded={loaded}
          competitions={competitions}
          addedToMyCompetitions={addedToMyCompetitions}
          userCompetitions={userCompetitions}
          addCompetition={addCompetition}
        />}
      />
    </Routes>
  );
}

export default App;
