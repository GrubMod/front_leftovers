// import axios from 'axios'
import { Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Body from './components/Body'
import './App.css';

function App() {
  return (
    <div className="App"> 
      <Header />
      <Body />
      {/* <Switch>
        
      </Switch> */}
    </div>
  );
}

export default App;
