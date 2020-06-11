import React, { Component } from 'react';
import Header from './components/layout/Header';
import FilterByWatched from './components/filters/FilterByWatched';
import FilterByRuntime from './components/filters/FilterByRuntime';
import FilterbyDecade from './components/filters/FilterByDecade';
import FilmList from './components/films/FilmList';

import './styles/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        nightTheme: false,
        runtime: 9999,
        oldestDecade: 1960,
        newestDecade: 2010,
        watched: true,
        genres: [],
    };
  }

  switchTheme = () => this.setState({nightTheme: !this.state.nightTheme }); 
  handleFilterByWatched = () => this.setState({ watched: !this.state.watched });
  handleFilterByRuntime = (e) => this.setState({ runtime:  parseInt(e.target.value) }); 
  handleFilterByDecade = (e) => {
    const decade = parseInt(e.target.value);
    const selectedIndex = e.target.selectedIndex;

    if (e.target.id === "oldest-decade"){
      if (decade > this.state.newestDecade){
        this.setState({ 
          oldestDecade: decade,
          newestDecade: decade
        })
        document.querySelector("#newest-decade").selectedIndex = selectedIndex;
      } else {
        this.setState({
          oldestDecade: decade,
        })
      }
    }

    if (e.target.id === "newest-decade"){
      if (e.target.value >= this.state.oldestDecade){
        this.setState({ 
          newestDecade: decade
        })
      } else {
        this.setState({
          newestDecade: this.state.oldestDecade
        })
        document.querySelector("#newest-decade").selectedIndex = document.querySelector("#oldest-decade").selectedIndex;
      }
    }
  }   
  
  render(){
    return (
      <div id="full-wrapper" className={`${this.state.nightTheme && 'dark'}`}>
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossOrigin="anonymous"
          />
        <Header
          nightTheme={this.state.nightTheme}
          switchTheme={this.switchTheme}
        />
        <div className="container">
          <FilterByWatched handleFilterByWatched={this.handleFilterByWatched} />
          <FilterByRuntime handleFilterByRuntime={this.handleFilterByRuntime} />
          <FilterbyDecade handleFilterByDecade={this.handleFilterByDecade} />
          <FilmList 
            watched={this.state.watched}
            runtime={this.state.runtime}
            oldestDecade={this.state.oldestDecade}
            newestDecade={this.state.newestDecade}
            />
        </div>
      </div>
    );
  }
}

export default App;