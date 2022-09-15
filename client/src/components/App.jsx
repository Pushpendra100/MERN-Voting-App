import React, { Component } from 'react';
import {call} from '../services/api';

class App extends Component{

  async componentDidMount(){
    const result = await call('post','auth/login',{
        username:'username',
        password:'password'
      })
    console.log(result);                   
  };


  render(){
    return <div>App works</div>
  }
};

export default App;