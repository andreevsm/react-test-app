import React, { Component } from 'react';

import { generetaRandom, queue, formatDate } from './utils';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { logs: [] };
  }

  componentDidMount() {
    this.taskRunner = queue();
  }

  generateLog = (name, timeout) => `${formatDate(new Date())} : ${name} was pressed with ${timeout}s timeout`;

  addLog = (name, next) => {
    const { logs } = this.state;
    const randomNumber = generetaRandom(1, 10);

    setTimeout(() => {
      this.setState(
        { logs: [...logs, this.generateLog(name, randomNumber)] },
        () => next(),
      );
    }, randomNumber * 1000);
  }

  onAddTaskToQueue = (name) => (
    this.taskRunner.push(next => (name ? this.addLog(name, next) : this.resetLogs(next)))
  );

  resetLogs = next => this.setState({ logs: [] }, () => next());

  render() {
    const { logs } = this.state;

    return (
      <div className="app">
        <div className="app__buttons app__buttons--between">
          <button
            type="button"
            onClick={() => this.onAddTaskToQueue('Button 1')}
            className="app__button"
          >
            Button 1
          </button>
          <button
            type="button"
            onClick={() => this.onAddTaskToQueue('Button 2')}
            className="app__button"
          >
            Button 2
          </button>
          <button
            type="button"
            onClick={() => this.onAddTaskToQueue('Button 3')}
            className="app__button"
          >
            Button 3
          </button>
        </div>
        <div className="app__logs">
          {logs.map(log => (
            <p className="app__log">
              {log}
            </p>
          ))}
        </div>
        <div className="app__buttons app__buttons--end">
          <button
            type="button"
            onClick={() => this.onAddTaskToQueue()}
            className="app__button"
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default App;
