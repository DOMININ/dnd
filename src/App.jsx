import React, { Component } from 'react';
import './App.css'
import Todo from './components/Todo'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

export default class App extends Component {
  render() {
    return (
      <div className="todo">
        <DndProvider backend={HTML5Backend}>
          <Todo />
        </DndProvider>
      </div>
    );
  }
}
