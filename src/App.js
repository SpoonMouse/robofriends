import React, { Component } from 'react';
import Cardlist from './components/Cardlist/cardlist'
import SearchBox from './components/SearchBox/searchbox';
import Scroll from './components/Scroll/scroll'
import ErrorBoundry from './components/ErrorBoundry/error';

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> response.json())
      .then(users => {
          this.setState({ robots: users })})};

    onSearchChange = (e) => {
      this.setState({searchfield: e.target.value})
  }

  render() {
    const { robots, searchfield } = this.state ;
    const filteredRobots=robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })
     return !robots.length ? 
        <h1>Loading</h1> :
       (
    <div className="App tc">
      <h1>RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            <ErrorBoundry>
              <Cardlist robots={filteredRobots}/>
            </ErrorBoundry>
          </Scroll>
    </div>
      );
}
}



export default App;
