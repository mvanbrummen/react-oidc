import { AuthProvider } from 'oidc-react';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const oidcConfig = {
  onSignIn: user => {
    alert('You just signed in, congratz! Check out the console!');
    // Redirect?
    console.log(user);
  },
  authority: 'https://localhost:9000',  
  clientId: 'foo-app', 
  redirectUri: 'http://127.0.0.1:3000/', 
  responseType: 'id_token', 
  scope: 'openid',
};

export default function App() {
  return (
    <Router>
        <AuthProvider {...oidcConfig}>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </AuthProvider>
    </Router>
  );
  }

  function Home() {
    return (<>
    <h2>Home</h2>
    <Link to='/dashboard'>Go to dashboard</Link>
</>
    )
  }
  function Dashboard() {
    return <h2>Dashboard</h2>;
  }
  