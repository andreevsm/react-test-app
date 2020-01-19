import React, { PureComponent } from 'react';

import { generetaRandom, createQueue, formatDate } from './utils';

import './App.css';

class App extends PureComponent {
  constructor() {
    super();
    this.state = { logs: [] };
    this.taskRunner = createQueue();
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
    this.taskRunner.push(next => (this.addLog(name, next)))
  );

  resetLogs = () => this.taskRunner.push(next => this.setState({ logs: [] }, () => next()))

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
          {logs.map((log, index) => (
            <p key={index.toString()} className="app__log">
              {log}
            </p>
          ))}
        </div>
        <div className="app__buttons app__buttons--end">
          <button
            type="button"
            onClick={() => this.resetLogs()}
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
