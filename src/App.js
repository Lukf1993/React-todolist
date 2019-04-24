import React from 'react';
import './App.css';
import AppControl from './components/AppControl';
import Lists from './components/Lists';


class App extends React.Component {
  state = {
    list: []
  }
  addTask = (title) => {
    const newArr = [...this.state.list, {title, status: false, id: Math.floor((Math.random() * 100))}]
    this.setState({
      list: newArr,
    })
  }
  removeItem = (id) => {
    const newArr = this.state.list.filter(item => item.id !== id);
    this.setState({
       list: newArr,
    })
  }
  changeStatus = (id) => {
    const newArr = this.state.list.map((item) => {
      if(item.id === id) {
        return {
          ...item, status: !item.status
        }
      }
      return item
    });
    this.setState({
      list: newArr,
    })
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <AppControl addTask={this.addTask} />
        </header>
        <Lists list={this.state.list} removeItem={this.removeItem} changeStatus={this.changeStatus}/>
      </div>
    )
  }
}

export default App;
