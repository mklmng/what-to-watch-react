import React, { Component, Fragment } from 'react';
import Header from './components/layout/Header';
import FilterByWatched from './components/filters/FilterByWatched';
import FilterByRuntime from './components/filters/FilterByRuntime';
import FilmList from './components/films/FilmList';

import './styles/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        theme: 'day',
        runtime: 9999,
        oldestDecade: 1960,
        newestDecade: 2010,
        watched: true,
        genres: []
    };
  }

  handleFilterByWatched = () => this.setState({ watched: !this.state.watched });
  handleFilterByRuntime = (e) => this.setState({ runtime:  parseInt(e.target.value) });    
  
  render(){
    return (
      <Fragment>
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossOrigin="anonymous"
          />
        <Header />
        <div className="container">
          <FilterByWatched handleFilterByWatched={this.handleFilterByWatched} />
          <FilterByRuntime handleFilterByRuntime={this.handleFilterByRuntime} />
          <FilmList 
            watched={this.state.watched}
            runtime={this.state.runtime}
            />
        </div>
      </Fragment>
    );
  }
}

export default App;