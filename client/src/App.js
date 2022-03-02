import './App.css';
import { Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './components/Login';
import Diagrams from './components/Diagrams';
import { useEffect, useState } from 'react';
import DiagramPage from './components/DiagramPage';
import ProjectsPage from './components/ProjectsPage';

function App( {theme}) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [])

  return (
    <>
      <NavBar user={user} setUser={setUser}/>
        <Switch>
          <Route exact path="/">
            <h1>Home Page TBD</h1>
          </Route>
          <Route exact path="/login">
            <Login setUser={setUser} theme={theme}/>
          </Route>
          <Route exact path="/diagrams">
            <Diagrams />
          </Route>
          <Route exact path='/diagrams/:id'>
            <DiagramPage />
          </Route>
          <Route exact path="/projects">
            <ProjectsPage user={user}/>
          </Route>  
        </Switch>
    </>
  );
}

export default App;
