import './App.css';
import { Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';

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
      <Container maxWidth="xs" sx={{textAlign: "center"}}>
        <Switch>
          <Route exact path="/">
            <h1>Hello World</h1>
          </Route>
          <Route exact path="/login">
            <Login setUser={setUser} theme={theme}/>
          </Route>
        </Switch>
      </Container>
    </>
  );
}

export default App;
