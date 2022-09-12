import './App.css';
import Landing from './landing/Landing.js';
import Home from './home/Home';
import Detail from './Detail/Detail';
import CreateRecipe from './Create/CreateRecipe';

import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing} />
      <Route exact path='/home' component={Home} />
      <Route  path='/home/:idRecipe' render={({match})=>{
        return <Detail idRecipe={match.params.idRecipe} />
      }} />
      <Route path='/create' component={CreateRecipe} />
    </div>
  );
}

export default App;
