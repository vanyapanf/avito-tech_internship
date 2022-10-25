import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import StoryPage from './pages/StoryPage';

function App() {

  return (
    <div className="wrapper clear">
      <Header /> 
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/story/:id">
          <StoryPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
