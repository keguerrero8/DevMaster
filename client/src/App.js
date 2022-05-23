import './App.css';
import { Route, Switch } from "react-router-dom";
import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Diagrams from './components/Diagrams';
import DiagramPage from './components/DiagramPage';
import ProjectsPage from './components/ProjectsPage';
import ChatPage from './components/ChatPage';
import HomePage from './components/HomePage';
import Account from './components/Account';

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
          <HomePage user={user} theme={theme}/>
        </Route>
        <Route exact path="/login">
          <Login setUser={setUser} theme={theme}/>
        </Route>
        <Route exact path="/diagrams">
          <Diagrams user={user} theme={theme}/>
        </Route>
        <Route exact path='/diagrams/:id'>
          <DiagramPage />
        </Route>
        <Route exact path="/projects">
          <ProjectsPage user={user}/>
        </Route> 
        <Route exact path="/chats">
          <ChatPage user={user}/>
        </Route> 
        <Route exact path="/account">
          <Account user={user} setUser={setUser}/>
        </Route>   
      </Switch>
    </>
  );
}

export default App;
