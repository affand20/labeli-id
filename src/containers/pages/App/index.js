import React, { Component } from 'react';
import './App.css';
import Login from '../Login';
import Register from '../Register';
import Dashboard from '../Dashboard';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Labeling from '../Labeling';
import Datasetku from '../Datasetku';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../../../store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import firebase from '../../../config/firebase'


const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore, firebase })),
    reduxFirestore(firebase),
    reactReduxFirebase(firebase, {attachAuthIsReady:true})
  )
);

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user : []
    }
  }

  render() {
        

    return (            
      <Router>        
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={Dashboard} />
          <Route path="/labeli" exact component={Labeling} />
          <Route path="/datasetku" exact component={Datasetku} />
        </Switch>
      </Router>
    );
  }  
}

export default App;
