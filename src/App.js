import React from 'react';
import logo from './logo.svg';
import './App.css';
import database from './config/database.js';

class App extends React.Component {
  componentDidMount(){
    // database.post('users').
    //   send({name: 'Joseph Ditton', email: 'something@gmail.com'}).
    //   end((res)=>{
    //     console.log(res);
    //   });

    database.get('users').
      end((res)=>{
        debugger;
      });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
