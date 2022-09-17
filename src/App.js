import logo from './logo.svg';
import './App.css';
import InputField from './components/inputField';
import LandingPageIllustration from './components/landingPageIllustration';
import CallToActionButton from './components/callToActionButton';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LandingPage from './screens/LandingPage'
import UserChoicePage from './screens/userChoicePage';
import ParentHomePage from './screens/parentHomePage';
import EditChildInfoPage from './screens/editChildInfoPage';


function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route path="/temp">
          <LandingPage/>
        </Route>
        <Route path="/choice">
          <UserChoicePage/>
        </Route>
        <Route path="/s">
          <ParentHomePage/>
        </Route>
        <Route path="/">
          <EditChildInfoPage/>
        </Route>
      </Switch>
      {/* <header className="App-header">
        <h1>Kids E-Wallet</h1>
        <h2 className={"App-description"}>Control what your kids<br/>consume at school</h2>
        <CallToActionButton/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <LandingPageIllustration/>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
    </Router>
  );
}

export default App;
