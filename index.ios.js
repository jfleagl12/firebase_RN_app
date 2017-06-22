import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

const env = require('./config/environment')

import Firestack from 'react-native-firestack'
import { FirestackModule } from 'react-native-firestack'

// Redux setup
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

const firestack = new Firestack(env.firestack);
const inst = new FirestackModule('events', {firestack})

let reducers = {
  events: inst.reducer
}
const middleware = applyMiddleware(thunk);
const store = createStore(combineReducers(reducers), {}, middleware)

// firestack.setStore(store);
inst.setStore(store); // important

class firestackDemo extends Component {
  componentWillMount() { 
    inst.listen(); 
  }

  render() {
    const {events} = this.props;
    const items = events.items;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Event count: {items.length}
        </Text>
      </View>
    );
  }
}

const ConnectedfirestackDemo = connect(state => {
  return {
    events: state.events
  }
})(firestackDemo)

class RootComponent extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedfirestackDemo />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('firestackDemo', () => RootComponent)