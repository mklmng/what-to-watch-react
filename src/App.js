import React, { Component, Fragment } from 'react';
import axios from 'axios';
import FilmOverlay from './components/films/FilmOverlay';
import Header from './components/layout/Header';
import Searchbox from './components/layout/Searchbox';
import FilterByRuntime from './components/filters/FilterByRuntime';
import FilterByDecade from './components/filters/FilterByDecade';
import FilterByGenre from './components/filters/FilterByGenre';
import FilterByWatched from './components/filters/FilterByWatched';
import Spinner from 'react-bootstrap/Spinner';
import FilmCard from './components/films/FilmCard';
import Footer from './components/layout/Footer';

import './styles/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        filterTriggered: false,
        runtime: 0,
        selectedYear: 0,
        selectedDirector: '',
        oldestDecade: 0,
        newestDecade: 0,
        hideWatched: false,
        genres: [],
        mainGenres: ["action" , "comedy" , "drama" , "horror" , "sci-fi"],
        extraGenres: [],
        films: [],
        filteredFilms: [],
        searchText: '',
        suggestedFilms: [],
        loading: true,
        overlay: false,
        trailer: "",
        goToFilms: false,
        activeFilter: ''
    };

    this.resultsRef = React.createRef();  
  }
  
  componentDidMount() {
    if (this.state.films.length < 1){
      this.setState({ loading: true }, () => {
        axios.get('https://gist.githubusercontent.com/mklmng/fa894dc9c86dfed34e45063adcf1b73e/raw/eab13d0cb818951da46c78ee18d07f904814015b/Films.json')
        .then(response => {
            let maxRuntime = parseInt(Math.max.apply(0, response.data.map(film => film.runtime)));  
            let filmYears = response.data.map(film => film.year);
            let oldestDecade = Math.floor(Math.min.apply(0, filmYears) / 10) * 10;
            let newestDecade = Math.floor(Math.max.apply(0, filmYears) / 10) * 10;
            let extraGenres = [...this.state.extraGenres];

            if (!extraGenres.length){
              response.data.forEach(film => {
                film.genres.forEach(genre => {
                  if (!extraGenres.includes(genre) && !this.state.mainGenres.includes(genre)){
                    extraGenres.push(genre);
                  }
                });
              })
              extraGenres.sort();
            }          

            this.setState({ 
              loading: false,
              runtime: maxRuntime,
              oldestDecade: oldestDecade,
              newestDecade: newestDecade,
              extraGenres: extraGenres,
              films: response.data,
              filteredFilms: response.data
            })
        })
        .catch(error => {
            this.setState({ loading: false })
        });
      });
    } else {
      this.setState({ films: this.state.films })
    }
  }   

  toggleWatched = () => { this.setState({ watched: !this.state.watched })};
  showFilter = filterName => this.setState({ activeFilter: filterName });
  handleFilterByYear = y => this.setState({selectedYear: parseInt(y), filterTriggered: true });
  handleFilterByDirector = d => this.setState({selectedDirector: d, selectedYear: 0, filterTriggered: true });
  handleFilterByWatched = () => this.setState(prevstate => ({ hideWatched: !prevstate.hideWatched, filterTriggered: true}));
  handleFilterByRuntime = e => this.setState({ runtime: parseInt(e.target.value), filterTriggered: true }); 
  handleFilterByDecade = (e) => {
    const decade = parseInt(e.target.value);
    const selectedIndex = e.target.selectedIndex;

    if (e.target.id === "oldest-decade"){
      if (decade > this.state.newestDecade){
        this.setState({ 
          oldestDecade: decade,
          newestDecade: decade,
          filterTriggered: true,
          selectedYear: 0,
        })
        document.querySelector("#newest-decade").selectedIndex = selectedIndex;
      } else {
        this.setState({
          oldestDecade: decade,
          filterTriggered: true,
          selectedYear: 0,
        })
      }
    }

    if (e.target.id === "newest-decade"){
      if (e.target.value >= this.state.oldestDecade){
        this.setState({ 
          newestDecade: decade,
          filterTriggered: true,
          selectedYear: 0,
        })
      } else {
        this.setState({
          newestDecade: this.state.oldestDecade,
          filterTriggered: true,
          selectedYear: 0,
        })
        document.querySelector("#newest-decade").selectedIndex = document.querySelector("#oldest-decade").selectedIndex;
      }
    }
  }   

  scrollToSection = (ref) => {
    this.setState({ goToFilms: !this.state.goToFilms });

    if (this.state.goToFilms){
        window.scrollTo(0,0)
      } else {
        let elementCoordinates = ref.current.getBoundingClientRect();
        window.scrollTo(0, Math.round(elementCoordinates.y));
    }
  }

  handleFilterByGenre = (e) => {
    let genre = "";
    typeof e === "string" ? genre = e : genre = e.target.value

    if (!this.state.genres.includes(genre)){
      this.setState({
        genres: [...this.state.genres, genre],
        filterTriggered: true,
        selectedDirector: ''
      })
    } else {
        let genres = [...this.state.genres];
        let index = genres.indexOf(genre);
        genres.splice(index, 1);
        this.setState({ 
          genres: genres,
          filterTriggered: true,
          selectedDirector: ''
        })
    }
  }

  handleToggleOverlay = (trailer) => {
      this.setState({ 
        overlay: !this.state.overlay, 
        trailer: trailer 
      })
  }

  convertTime = (time) => {
    let hours = time / 60;
    if (time < 60){
        return `${time}mins`;
    } 
    let fullTime = ((time % 60) > 0) ? `${Math.floor(hours)}h ${(time % 60)}mins` : `${hours}h`;
    return fullTime;
  }

  toggleFilmWatched = (id) => {
    let updatedFilms = [...this.state.films];
    updatedFilms.forEach(f => {
      if (f.id === id){
        f.watched = !f.watched;
      }
    });
    this.setState({ films: updatedFilms, selectedDirector: '' })
  }

  resetProperty = (e) => {
    if (e === "director"){
      this.setState({ 
        selectedDirector: '',
        selectedFilms: []
      })
    }
    if (e === "year"){
      this.setState({ 
        selectedYear: 0,
        selectedFilms: []
      })
    }
  }

  handleChange = (e) => {
    !e.target.value.length 
    ? 
    this.setState({
      searchText: e.target.value,
      suggestedFilms: []
    })
    :
    this.setState({ 
      searchText: e.target.value,
     }) 
  };

  handleAutocomplete = (e) => {
    if (this.state.searchText.length > 0){
      let suggestions = [];
      let searchItem = e.target.value.toLowerCase();
      this.state.films.forEach(f => {
        let title = f.title.toLowerCase();
        if (title.startsWith(searchItem)){
            suggestions.push(f);
          }
        }
      )
      this.setState({ suggestedFilms: suggestions })
    }
  }

  showFilm = (id) => {
    this.setState({
      filteredFilms: this.state.films.filter(f => f.id === id),
      suggestedFilms: []
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let matches = this.state.films.filter((film)=>{
      return film.title.toLowerCase().includes(this.state.searchText.toLowerCase());
    })

    matches.length 
    ?
    this.setState({
      filteredFilms: matches,
      suggestedFilms: []
    }) 
    :
    this.setState({
      filteredFilms: [],
      suggestedFilms: []
    })
  }
    
  render(){
    const { filterTriggered, films, filteredFilms, suggestedFilms, searchText, runtime, selectedYear, selectedDirector, oldestDecade, newestDecade, hideWatched, genres, trailer, overlay, activeFilter, mainGenres, extraGenres } = this.state;

    let fullTime = this.convertTime(runtime);


    // let filteredFilms = films.filter(film => 
    //   film.runtime <= runtime
    //   && (film.year >= oldestDecade && film.year <= newestDecade + 9) 
    // )

    // if (genres.length){
    //   filteredFilms = filteredFilms.filter(film => 
    //       film.genres.some(g => genres.includes(g))
    //   )
    // }


    // Specific filters
    // These filters reset the regular ones to default and focus on an specific year or director
    // if the user interacts with the other filters they're overridden
    
    // if (selectedYear !== 0){
    //   filteredFilms = this.state.films.filter(f => f.year === selectedYear);
    // }

    // if (selectedDirector.length){
    //   filteredFilms = this.state.films.filter(f => f.director.some(g => selectedDirector.includes(g)));
    // }

    // if (hideWatched){
    //   filteredFilms = filteredFilms.filter(f => !f.watched);
    // }

    return (
      <div id="full-wrapper">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" type="text/css" />

        {overlay &&  <FilmOverlay handleToggleOverlay={this.handleToggleOverlay} trailer={trailer} /> }

        <div className="container">
          <div className="row below2">
            <Header />
            <Searchbox
              searchText={searchText}
              suggestedFilms={suggestedFilms}
              handleChange={this.handleChange}
              handleAutocomplete={this.handleAutocomplete}
              handleSubmit={this.handleSubmit}
              showFilm={this.showFilm}
            />
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="main-filters">
                <h2 className="sub-header">Filter by</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-4">
            <button 
                className={`btn btn-sm btn-lg-3 btn-outline-secondary btn-filter ${activeFilter === 'runtime' ? 'active' : ''}`}
                onClick={() => this.showFilter('runtime')}
            >Runtime</button><button
              className={`btn btn-sm btn-lg-3 btn-outline-secondary btn-filter ${activeFilter === 'genre' ? 'active' : ''}`}
              onClick={() => this.showFilter('genre')}
            >Genre</button><button
              className={`btn btn-sm btn-lg-3 btn-outline-secondary btn-filter ${activeFilter === 'decade' ? 'active' : ''}`}
            onClick={() => this.showFilter('decade')}
          >Decade</button>
            </div>
          </div>
          <Fragment>
            {activeFilter === 'runtime' &&
                <FilterByRuntime 
                  handleFilterByRuntime={this.handleFilterByRuntime}
                  runtime={runtime}
                  />
            }
            {activeFilter === 'genre' && 
                <FilterByGenre 
                  handleFilterByGenre={this.handleFilterByGenre} 
                  mainGenres={mainGenres}
                  extraGenres={extraGenres}
                  genres={genres}
              />
            }
            {activeFilter === 'decade' &&  
            <FilterByDecade 
              handleFilterByDecade={this.handleFilterByDecade}
              oldestDecade={oldestDecade}
              newestDecade={newestDecade}
                />  }
            <FilterByWatched 
              handleFilterByWatched={this.handleFilterByWatched}
              hideWatched={hideWatched}  
            />
          </Fragment>
          <div className="row">
              <div className="col-md-12">
                {filterTriggered &&
                  <div id="search-labels">
                    <p className="search-labels__content">
                      <span className="search-labels__content__intro">Looking for:</span>
                      {genres.length > 0 && 
                      genres.map((g,index) => {
                        return (
                          <span key={index} className="search-labels__tag search-labels__tag--interactive" onClick={() => this.handleFilterByGenre(g)}>{g}</span>
                        )
                      })
                      }

                      {((runtime !== 0) && (runtime < 181)) && 
                      <span className="search-labels__tag">{fullTime} or less</span>
                      }

                      {((selectedYear === 0) && oldestDecade === newestDecade) && 
                        <span className="search-labels__tag">{oldestDecade}s</span>
                      }
                      {((selectedYear === 0) && !(oldestDecade === newestDecade)) && 
                      <span className="search-labels__tag">{oldestDecade}s - {newestDecade}s</span>
                      }

                      {selectedYear > 0 && <span className="search-labels__tag search-labels__tag--interactive" onClick={() => this.resetProperty("year")}>{selectedYear}</span> }
                      {selectedDirector !== "" && <span className="search-labels__tag search-labels__tag--interactive" onClick={() => this.resetProperty("director")}>Directed by {selectedDirector}</span> }
                      {hideWatched && <span className="search-labels__tag search-labels__tag--interactive" onClick={() => this.handleFilterByWatched()}>unseen</span>}
                    </p>
                  </div>
                }
                  <div id="results" ref={this.resultsRef}  onClick={() => this.scrollToSection(this.resultsRef)}>
                    <p className={`film-results ${this.state.goToFilms ? "return" : ""}`}>
                      {filteredFilms.length > 1 && 
                        <span>
                            There are <strong>{filteredFilms.length}</strong> matches.
                        </span>
                        }
                        {filteredFilms.length === 1 &&
                        <span>
                            There is <strong>1</strong> match.
                        </span>
                        }
                        {!filteredFilms.length && 
                        <span>Sorry, there aren't any matches.</span>
                        }
                    </p>
                  </div>
              </div>
          </div>
          <div className="row product-list">
              {this.state.loading && 
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              }
              {filteredFilms.map((film) => {
                return (
                  <FilmCard 
                      key={film.id}
                      id={film.id}
                      title={film.title}
                      year={film.year}
                      director={film.director}
                      genres={film.genres}
                      runtime={film.runtime}
                      watched={film.watched}
                      whereToWatch={film.whereToWatch}
                      trailer={film.trailer}
                      overlay={this.state.overlay}
                      handleToggleOverlay={this.handleToggleOverlay}
                      convertTime={this.convertTime}
                      toggleFilmWatched={this.toggleFilmWatched}
                      handleFilterByYear={this.handleFilterByYear}
                      handleFilterByDirector={this.handleFilterByDirector}
                      handleFilterByGenre={this.handleFilterByGenre}
                  />
                )                            
              })}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;