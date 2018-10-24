import React, { Component } from 'react';
import './App.css';

import AddTask from '../components/AddTask';
import DisplayTasks from '../components/DisplayTasks';

class App extends Component {
  state = {
    error: "",
    hasError: false,
    tasks: []
  }

  componentDidCatch(error) {
    this.setState({ error: error, hasError: true });
  }

  componentDidMount() {
    this.updateTasksFromLS();
  }

  addTask = (e) => {
    e.preventDefault();
    let task = document.forms.formData.taskName.value;
    document.forms.formData.taskName.value = "";
    let retrievedTask = this.state.tasks.find(t => t.name === task);
    if (retrievedTask === undefined) {
      task = { name: task, isCompleted: false };
      this.setState(
        {
          tasks: [...this.state.tasks, task] 
        },
        () => this.updateLocalStorage()
      );
    }
  }

  clearAllTasks = (e) => {
    e.preventDefault();
    localStorage.clear();
    this.updateTasksFromLS();
  }

  removeTask = (e) => {
    e.preventDefault();
    let clickedTask = e.target.parentNode.dataset.task;
    
    let retrievedTask = this.state.tasks.find(t => t.name === clickedTask);
    if (retrievedTask === undefined) {
      this.setState({ Error: "Something Went Wrong!", hasError: true });
    }
    else {
      let newListOfTasks = this.state.tasks;
      newListOfTasks.pop(retrievedTask);
      this.setState(
        {
          tasks: [...newListOfTasks]
        },
        () => this.updateLocalStorage()
      );
    }
  }

  toggleComplete = (e) => {
    e.preventDefault();
    let clickedTask = e.target.parentNode.dataset.task;
    
    let retrievedTask = this.state.tasks.find(t => t.name === clickedTask);
    if (retrievedTask === undefined) {
      this.setState({ Error: "Something Went Wrong!", hasError: true });
    }
    else {
      let newListOfTasks = this.state.tasks;
      let task = newListOfTasks.pop(retrievedTask);
      task.isCompleted = !task.isCompleted;
      console.log(task);
      this.setState(
        {
          tasks: [...this.state.tasks, task]
        },
        () => this.updateLocalStorage()
      );
    }
  }

  updateLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  }

  updateTasksFromLS = () => {
    this.setState({ 
      tasks: 
        localStorage.tasks === undefined ? 
          [] : JSON.parse(localStorage.tasks) 
    });
  }

  render() {
    if (this.state.hasError) {
      console.log(this.state.error);
      return <div className="App">Something Went Wrong!</div>
    }
    return (
      <div className="App">
        <header>
          <h1>Just Another TODO App</h1>
        </header>
        <AddTask addTask={this.addTask} clearAllTasks={this.clearAllTasks} />
        <DisplayTasks tasks={this.state.tasks} removeTask={this.removeTask} toggleComplete={this.toggleComplete} />
      </div>
    );
  }
}

export default App;
