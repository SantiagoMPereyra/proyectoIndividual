import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import RecipeCreate from './components/RecipeCreate';
import Details from './components/Details';
import StepByStep from './components/StepByStep';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/recipe/stepByStep/:id" component={StepByStep}/>
        <Route path = '/recipe/:id' component= {Details} />
        <Route path="/recipe" component={RecipeCreate} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
