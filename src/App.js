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
import Pagination from './components/layout/Pagination';
import Footer from './components/layout/Footer';

import './styles/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.itemsPerPage = 24;
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
        selectedId: 0,
        suggestedFilms: [],
        submitted: false,
        submittedQuery: '',
        loading: true,
        overlay: false,
        trailer: "",
        goToFilms: false,
        activeFilter: '',
        currentPage: 1,
        totalPages: null,
        contentPerPage: []
    };

    const { runtime, genres, oldestDecade, newestDecade, hideWatched, selectedDirector, selectedYear, selectedId, submitted, submittedQuery } = this.state;

    // we create the filters properties and assign them the values we get from the state properties. 

    this.filters = {
      runtime,
      genres,
      oldestDecade,
      newestDecade,
      hideWatched,
      director: selectedDirector,
      year: selectedYear,
      id: selectedId,
      submitted: submitted,
      submittedQuery: submittedQuery
    }

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

  // We define the different functions we'll need to chain every time the user interact with any of the filters.

  runtimeFilter = (filmRuntime) => (film) => {
    if (filmRuntime > 0){
      return film.runtime <= filmRuntime;
    } else {
      return true
    }
  }

  genreFilter = (genre) => (film) => {
    if (genre.length){
      return film.genres.some(g => genre.includes(g))
    } else {
      return true;
    }
  }

  watchedFilter = (hideWatched) => (film) => {
    if (hideWatched){
      return film.watched !== hideWatched;
    } else{
      return true;
    }
  }

  yearFilter = (year) => (film) => {
    if (year > 0){
      return film.year === year;
    } else {
      return true;
    }
  }

  decadeFilter = (oldestDecade, newestDecade, year) => (film) => {
    if (year === 0){
      if (oldestDecade > 0 && newestDecade > 0){
        return film.year >= oldestDecade && film.year <= newestDecade + 9;
      } else {
        return true;
      }
    }
    else {
      return true;
    }
  }

  directorFilter = (director) => (film) => {
    if (director.length){
      return film.director.some(d => director.includes(d));
    } else {
      return true;
    }
  }

  submittedFilter = (submitted, submittedQuery) => (film) => {
    if (submitted){
      return film.title.toLowerCase().includes(submittedQuery)
    } else {
      return true;
    }
  }

  suggestedFilter = (id) => (film) => {
    if (id > 0){
      return film.id === id
    } else {
      return true;
    }
  }

  // At this stage we have all we need to filter our films array using the functions and properties we defined earlier
  // To make things easier we create a chainfilters function that will pass only two parameters.
  
  chainFilters = (films,filters) => films
    .filter(this.runtimeFilter(filters.runtime))
    .filter(this.genreFilter(filters.genres))
    .filter(this.yearFilter(filters.year))
    .filter(this.decadeFilter(filters.oldestDecade, filters.newestDecade, filters.year))
    .filter(this.directorFilter(filters.director))
    .filter(this.submittedFilter(filters.submitted, filters.submittedQuery))
    .filter(this.suggestedFilter(filters.id))
    .filter(this.watchedFilter(filters.hideWatched));

  // Some filters like handleFilterByYear, handleFilterByDirector, showFilm or handleSubmit need to reset the values of certain properties (oldestDecade, newestDecade, runtime, genres, etc) to default
  // since if the users selects the year I'm assuming that they want to see all films from that year ignoring possible filters they used earlier like runtime, genres, etc.

  handleFilterByYear = (y) => {
    this.filters.year = parseInt(y);

    this.filters.id = 0;
    this.filters.director = '';
    this.filters.hideWatched = false;
    this.filters.submitted = false;
    this.filters.submittedQuery = '';  
    this.filters.runtime = parseInt(Math.max.apply(0, this.state.films.map(film => film.runtime))); 
    this.filters.genres = [];

    let filteredFilms = this.chainFilters(this.state.films, this.filters);

    this.setState({
      filteredFilms: filteredFilms,
      searchText: '',
      selectedId: 0,
      selectedYear: parseInt(y),
      selectedDirector: '', 
      filterTriggered: true,
      submitted: false 
    })
  };

  handleFilterByDirector = (d) => {
    this.filters.id = 0;
    this.filters.year = 0;
    this.filters.hideWatched = false;
    this.filters.submitted = false;
    this.filters.submittedQuery = this.state.searchText;  
    this.filters.director = d;

    // After assigning the director to the filters director property we need to reset the reset of properties to default values to ensure we see all films by this director
    this.filters.id = 0;
    this.filters.year = 0;
    this.filters.hideWatched = false;
    this.filters.submitted = false;
    this.filters.submittedQuery = '';  
    this.filters.runtime = parseInt(Math.max.apply(0, this.state.films.map(film => film.runtime))); 

    let filmYears = this.state.films.map(film => film.year); // Get the years of the film database
    this.filters.oldestDecade = Math.floor(Math.min.apply(0, filmYears) / 10) * 10;
    this.filters.newestDecade = Math.floor(Math.max.apply(0, filmYears) / 10) * 10;
    this.filters.genres = [];

    let filteredFilms = this.chainFilters(this.state.films, this.filters);

    this.setState({
      filteredFilms: filteredFilms,
      searchText: '',
      selectedId: 0,
      selectedDirector: d, 
      selectedYear: 0, 
      filterTriggered: true,
      submitted: false 
    })
  };

  handleFilterByWatched = () => {
    this.filters.hideWatched = !this.state.hideWatched;

    let filteredFilms = this.chainFilters(this.state.films, this.filters);

    this.setState({ 
      filteredFilms: filteredFilms,
      hideWatched: !this.state.hideWatched, 
      filterWatched: true
    })
  };

  handleFilterByRuntime = (e) => {
    this.filters.id = 0;
    this.filters.year = 0;
    this.filters.hideWatched = false;
    this.filters.submitted = false;
    this.filters.submittedQuery = this.state.searchText;  
    this.filters.director = '';

    this.filters.runtime = parseInt(e.target.value);
    let filteredFilms = this.chainFilters(this.state.films, this.filters);

    this.setState(
      { 
        filteredFilms: filteredFilms,
        searchText: '',
        selectedId: 0,
        selectedDirector: '',
        selectedYear: 0,
        runtime: parseInt(e.target.value), 
        filterTriggered: true,
        submitted: false 
      }
    ); 
  } 

  handleFilterByDecade = (e) => {
    const decade = parseInt(e.target.value);
    const selectedIndex = e.target.selectedIndex;

    this.filters.id = 0;
    this.filters.year = 0;
    this.filters.hideWatched = false;
    this.filters.submitted = false;
    this.filters.submittedQuery = this.state.searchText;  
    this.filters.director = '';

    if (e.target.id === "oldest-decade"){
      if (decade > this.state.newestDecade){

        this.filters.oldestDecade = decade;
        this.filters.newestDecade = decade;
        let filteredFilms = this.chainFilters(this.state.films, this.filters);

        this.setState({ 
          filteredFilms: filteredFilms,
          searchText: '',
          selectedId: 0,
          selectedDirector: '',
          selectedYear: 0,
          oldestDecade: decade,
          newestDecade: decade,
          filterTriggered: true,
          submitted: false 
        })
        document.querySelector("#newest-decade").selectedIndex = selectedIndex;
      } else {
        this.filters.oldestDecade = decade;
        this.filters.newestDecade = this.state.newestDecade;
        let filteredFilms = this.chainFilters(this.state.films, this.filters);

        this.setState({
          filteredFilms: filteredFilms,
          searchText: '',
          selectedId: 0,
          selectedDirector: '',
          selectedYear: 0,
          oldestDecade: decade,
          filterTriggered: true,
          submitted: false 
        })
      }
    }

    if (e.target.id === "newest-decade"){
      this.filters.oldestDecade = this.state.oldestDecade;

      if (decade >= this.state.oldestDecade){
        this.filters.newestDecade = decade;
        let filteredFilms = this.chainFilters(this.state.films, this.filters);

        this.setState({ 
          filteredFilms: filteredFilms,
          searchText: '',
          selectedId: 0,
          selectedDirector: '',
          selectedYear: 0,
          newestDecade: decade,
          filterTriggered: true,
          submitted: false 
        })
      } else {
        this.filters.newestDecade = this.state.oldestDecade;
        let filteredFilms = this.chainFilters(this.state.films, this.filters);

        this.setState({
          filteredFilms: filteredFilms,
          searchText: '',
          selectedId: 0,
          selectedDirector: '',
          selectedYear: 0,
          newestDecade: this.state.oldestDecade,
          filterTriggered: true,
          submitted: false 
        })
        document.querySelector("#newest-decade").selectedIndex = document.querySelector("#oldest-decade").selectedIndex;
      }
    }
  }   

  // This function was thought to allow the users seeeing the results when they click on the number of matches.
  // Although not necessary for iPad or desktop it should make the UX better in some mobile screens.

  scrollToSection = (ref) => {
    this.setState({ goToFilms: !this.state.goToFilms });

    if (this.state.goToFilms){
        window.scrollTo(0,0)
      } else {
        let elementCoordinates = document.querySelector(".row.product-list").getBoundingClientRect();
        window.scrollTo(0, Math.round(elementCoordinates.y));
    }
  }

  handleFilterByGenre = (e) => {
    let genre = "";
    // this checks if we are removing genres from the filter tags or adding/removing them from the genre filter
    typeof e === "string" ? genre = e : genre = e.target.value;

    this.filters.id = 0;
    this.filters.year = 0;
    this.filters.hideWatched = false;
    this.filters.submitted = false;
    this.filters.submittedQuery = this.state.searchText;  
    this.filters.director = '';

    if (!this.state.genres.includes(genre)){
      this.filters.genres = [...this.state.genres, genre];    
      let filteredFilms = this.chainFilters(this.state.films, this.filters);

      this.setState({
        filteredFilms: filteredFilms,
        searchText: '',
        selectedId: 0,
        selectedDirector: '',
        selectedYear: 0,
        genres: [...this.state.genres, genre],
        filterTriggered: true,
        submitted: false 
      })
    } else {
        let genres = [...this.state.genres];
        let index = genres.indexOf(genre);
        genres.splice(index, 1);

        this.filters.genres = genres;  

        let filteredFilms = this.chainFilters(this.state.films, this.filters);

        this.setState({ 
          filteredFilms: filteredFilms,
          searchText: '',
          selectedId: 0,
          selectedDirector: '',
          selectedYear: 0,
          genres: genres,
          filterTriggered: true,
          submitted: false 
        })
    }
  }

  // Shows the overlay with the emndedded trailer when the users click on the "Watch the trailer" cta.
  handleToggleOverlay = (trailer) => {
      this.setState({ 
        overlay: !this.state.overlay, 
        trailer: trailer 
      })
  }

  // Converts the runtime from minutes to hours and minutes to make it more readable for the users.
  convertTime = (time) => {
    let hours = time / 60;
    if (time < 60){
        return `${time}mins`;
    } 
    let fullTime = ((time % 60) > 0) ? `${Math.floor(hours)}h ${(time % 60)}mins` : `${hours}h`;
    return fullTime;
  }

  // Allows the user to mark/unmark films as watched interacting with eye icon and "The End" text on the film cards.
  toggleFilmWatched = (id) => {
    let updatedFilms = [...this.state.films];
    updatedFilms.forEach(f => {
      if (f.id === id){
        f.watched = !f.watched;
      }
    });
    this.setState({ films: updatedFilms, selectedDirector: '' })
  }

  // This function empties the values of directors and years when the users click on the respective label tags.
  resetProperty = (e) => {
    if (e === "director"){
      this.setState({ 
        selectedDirector: ''
      })
    }
    if (e === "year"){
      this.setState({ 
        selectedYear: 0
      })
    }
  }

  handleChange = (e) => {
    !e.target.value.length 
    ? 
    this.setState({
      searchText: e.target.value,
      filterTriggered: true,
      suggestedFilms: [],
      submittedQuery: ''
    })
    :
    this.setState({ 
      searchText: e.target.value,
      filterTriggered: true,
      submittedQuery: ''
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
      this.setState({ suggestedFilms: suggestions, submitted: false, filterTriggered: true })
    }
  }

  // If the users click on one the autosuggested films the film card will show it as the only match.
  showFilm = (id) => {
    this.filters.id = id;
    this.filters.year = 0;
    this.filters.hideWatched = false;
    this.filters.submitted = false;
    this.filters.submittedQuery = '';  
    this.filters.director = '';
    this.filters.runtime = parseInt(Math.max.apply(0, this.state.films.map(film => film.runtime))); 

    let filmYears = this.state.films.map(film => film.year); // Get the years of the film database
    this.filters.oldestDecade = Math.floor(Math.min.apply(0, filmYears) / 10) * 10;
    this.filters.newestDecade = Math.floor(Math.max.apply(0, filmYears) / 10) * 10;
    this.filters.genres = [];

    let filteredFilms = this.chainFilters(this.state.films, this.filters);

    this.setState({
      filteredFilms: filteredFilms,
      searchText: '',
      selectedId: id,
      suggestedFilms: [],
      filterTriggered: true,
      submitted: false,
      genres: []
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
   
    // After assigning the director to the filters director property we need to reset the reset of properties to default values to ensure we see all films by this director
    this.filters.id = 0;
    this.filters.year = 0;
    this.filters.hideWatched = false;
    this.filters.submitted = true;
    this.filters.submittedQuery = this.state.searchText;  
    this.filters.director = '';
    this.filters.runtime = parseInt(Math.max.apply(0, this.state.films.map(film => film.runtime))); 

    let filmYears = this.state.films.map(film => film.year); // Get the years of the film database
    this.filters.oldestDecade = Math.floor(Math.min.apply(0, filmYears) / 10) * 10;
    this.filters.newestDecade = Math.floor(Math.max.apply(0, filmYears) / 10) * 10;
    this.filters.genres = [];

    let filteredFilms = this.chainFilters(this.state.films, this.filters);

    this.setState({
      filteredFilms: filteredFilms,
      submittedQuery: this.state.searchText,
      suggestedFilms: [],
      submitted: true,
      selectedId: 0,
      searchText: ''
    })
  }

  changePage = (index) => {
    this.setState({
      currentPage: parseInt(index + 1)
    })
  }
    
  render(){
    const { filteredFilms, filterTriggered, suggestedFilms, searchText, submitted, submittedQuery, runtime, selectedYear, selectedDirector, oldestDecade, newestDecade, hideWatched, genres, trailer, overlay, activeFilter, mainGenres, extraGenres } = this.state;
    let filmsperPage = filteredFilms;

    if (filteredFilms.length > 24){
      filmsperPage = filteredFilms.slice(((this.state.currentPage) - 1) * 24,(this.state.currentPage * 24));
    } 

    let fullTime = this.convertTime(runtime);

    return (
      <div id="full-wrapper">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous" />

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
                      {(submittedQuery.length > 0 || submitted) && 
                        <span className="search-labels__tag">{submittedQuery}</span>
                      }

                      {(searchText.length > 0) && 
                        <span className="search-labels__tag">{searchText}</span>
                      }

                      {!(searchText.length > 0 || submitted) && 
                      <Fragment>
                        {genres.map((g,index) => {
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
                      </Fragment>
                      }
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
              {!this.state.loading &&
                filmsperPage.map((film) => {
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
                })
              }
          </div>

          {filteredFilms.length > 24 && 
            <Pagination 
              allRecords={filteredFilms.length} 
              itemsPerPage={this.itemsPerPage} 
              changePage={this.changePage}
              currentPage={this.state.currentPage}
            />
          }

        </div>
        <Footer />
      </div>
    );
  }
}

export default App;