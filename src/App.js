import React, { Component, Fragment } from 'react';
import axios from 'axios';
import FilmOverlay from './components/films/FilmOverlay.component';
import Header from './components/layout/Header.component';
import Searchbox from './components/layout/Searchbox.component';
import FilterByRuntime from './components/filters/FilterByRuntime.component';
import FilterByDecade from './components/filters/FilterByDecade.component';
import FilterByGenre from './components/filters/FilterByGenre.component';
import FilterByWatched from './components/filters/FilterByWatched.component';
import Spinner from 'react-bootstrap/Spinner';
import FilmCard from './components/films/FilmCard.component';
import Pagination from './components/layout/Pagination.component';
import Footer from './components/layout/Footer.component';

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
        contentPerPage: [],
        itemsPerPage: 25
    };

    this.resultsRef = React.createRef();  
  }
  
  componentDidMount() {
    if (this.state.films.length < 1){
      this.setState({ loading: true }, () => {
        axios.get('https://gist.githubusercontent.com/mklmng/fa894dc9c86dfed34e45063adcf1b73e/raw/9ca41583e7ce600f4e77c10b44e100c5ab4a1f57/Films.json')
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
            });

            const { genres, hideWatched, selectedDirector, selectedYear, selectedId, submitted, submittedQuery } = this.state;

            // we create the filters properties and assign them the values we get from the state properties. 

            this.filters = {
              runtime: maxRuntime,
              oldestDecade,
              newestDecade,
              genres,
              hideWatched,
              director: selectedDirector,
              year: selectedYear,
              id: selectedId,
              submitted,
              submittedQuery
            }
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
    return filmRuntime === 0 || film.runtime <= filmRuntime;
  }

  genreFilter = (genre) => (film) => {
    return !genre.length || film.genres.some(g => genre.includes(g))
  }

  watchedFilter = (hideWatched) => (film) => {
    return !hideWatched || film.watched !== hideWatched
  }

  yearFilter = (oldestDecade, newestDecade, year) => (film) => {
    if (year === 0){
      return film.year >= oldestDecade && film.year <= newestDecade + 9;
    } else {
      return film.year === year;
    }
  }

  directorFilter = (director) => (film) => {
    return !director.length || film.director.some(d => director.includes(d));
  }

  submittedFilter = (submitted, submittedQuery) => (film) => {
    return !submitted || film.title.toLowerCase().includes(submittedQuery);
  }

  suggestedFilter = (id) => (film) => {
    return id === 0 || film.id === id
  }

  // At this stage we have all we need to filter our films array using the functions and properties we defined earlier
  // To make things easier we create a chainfilters function that will pass only two parameters.
  
  chainFilters = (films,filters) => films
    .filter(this.runtimeFilter(filters.runtime))
    .filter(this.genreFilter(filters.genres))
    .filter(this.yearFilter(filters.oldestDecade, filters.newestDecade, filters.year))
    .filter(this.directorFilter(filters.director))
    .filter(this.submittedFilter(filters.submitted, filters.submittedQuery))
    .filter(this.suggestedFilter(filters.id))
    .filter(this.watchedFilter(filters.hideWatched));

  // Some filters like handleFilterByYear, handleFilterByDirector, showFilm or handleSubmit need to reset the values of certain properties (oldestDecade, newestDecade, runtime, genres, etc) to default
  // since if the users selects the year I'm assuming that they want to see all films from that year ignoring possible filters they used earlier like runtime, genres, etc.

  handleFilterByYear = (year) => {
    let currentPage = this.state.currentPage;

    this.filters.year = parseInt(year);

    this.filters.id = 0;
    this.filters.director = '';
    this.filters.submitted = false;
    this.filters.submittedQuery = '';  
    this.filters.runtime = parseInt(Math.max.apply(0, this.state.films.map(film => film.runtime))); 
    this.filters.genres = [];

    let filteredFilms = this.chainFilters(this.state.films, this.filters);

    // If the number of records change after filtering and is greater that the number of items per page it resets the currentPage to 1 so it you'll always at the beginning of your filtered items.

    if (filteredFilms.length > this.state.itemsPerPage){
      currentPage = 1;
    }
 
    this.setState({
      filteredFilms: filteredFilms,
      searchText: '',
      selectedId: 0,
      selectedYear: parseInt(year),
      selectedDirector: '', 
      filterTriggered: true,
      submitted: false,
      currentPage
    })
  };

  handleFilterByDirector = (director) => {
    let currentPage = this.state.currentPage;

    // After assigning the director to the filters director property we need to reset the reset of properties to default values to ensure we see all films by this director
    this.filters.id = 0;
    this.filters.year = 0;
    this.filters.submitted = false;
    this.filters.submittedQuery = '';  
    this.filters.runtime = parseInt(Math.max.apply(0, this.state.films.map(film => film.runtime))); 
    this.filters.director = director;

    let filmYears = this.state.films.map(film => film.year); // Get the years of the film database
    this.filters.oldestDecade = Math.floor(Math.min.apply(0, filmYears) / 10) * 10;
    this.filters.newestDecade = Math.floor(Math.max.apply(0, filmYears) / 10) * 10;
    this.filters.genres = [];

    let filteredFilms = this.chainFilters(this.state.films, this.filters);
    if (filteredFilms.length > this.state.itemsPerPage){
      currentPage = 1;
    }

    this.setState({
      filteredFilms: filteredFilms,
      searchText: '',
      selectedId: 0,
      selectedDirector: director, 
      selectedYear: 0, 
      filterTriggered: true,
      submitted: false,
      currentPage
    })
  };

  handleFilterByWatched = () => {
    let currentPage = this.state.currentPage;

    this.filters.hideWatched = !this.state.hideWatched;

    let filteredFilms = this.chainFilters(this.state.films, this.filters);
    if (filteredFilms.length > this.state.itemsPerPage){
      currentPage = 1;
    }

    this.setState({ 
      filteredFilms: filteredFilms,
      hideWatched: !this.state.hideWatched, 
      filterWatched: true,
      currentPage
    })
  };

  handleFilterByRuntime = (runtime) => {
    let currentPage = this.state.currentPage;

    this.filters.id = 0;
    this.filters.year = 0;
    this.filters.submitted = false;
    this.filters.submittedQuery = this.state.searchText;  
    this.filters.director = '';

    this.filters.runtime = parseInt(runtime.target.value);
    let filteredFilms = this.chainFilters(this.state.films, this.filters);
    if (filteredFilms.length > this.state.itemsPerPage){
      currentPage = 1;
    }

    this.setState(
      { 
        filteredFilms: filteredFilms,
        searchText: '',
        selectedId: 0,
        selectedDirector: '',
        selectedYear: 0,
        runtime: parseInt(runtime.target.value), 
        filterTriggered: true,
        submitted: false,
        currentPage
      }
    ); 
  } 

  handleFilterByDecade = (e) => {
    let currentPage = this.state.currentPage;

    const decade = parseInt(e.target.value);
    const selectedIndex = e.target.selectedIndex;

    this.filters.id = 0;
    this.filters.year = 0;
    this.filters.submitted = false;
    this.filters.submittedQuery = this.state.searchText;  
    this.filters.director = '';

    if (e.target.id === "oldest-decade"){
      this.filters.oldestDecade = decade;
      this.filters.newestDecade = this.state.newestDecade;
      if (decade > this.state.newestDecade){  
        this.filters.newestDecade = decade;
        document.querySelector("#newest-decade").selectedIndex = selectedIndex;
      }
    } else{
      this.filters.newestDecade = decade;
      this.filters.oldestDecade = this.state.oldestDecade;

      if (decade < this.state.oldestDecade){
        this.filters.oldestDecade = decade;
        document.querySelector("#newest-decade").selectedIndex = document.querySelector("#oldest-decade").selectedIndex;
      }
    }

    let filteredFilms = this.chainFilters(this.state.films, this.filters);
    if (filteredFilms.length > this.state.itemsPerPage){
      currentPage = 1;
    }

    this.setState({ 
      filteredFilms: filteredFilms,
      searchText: '',
      selectedId: 0,
      selectedDirector: '',
      selectedYear: 0,
      oldestDecade: this.filters.oldestDecade,
      newestDecade: this.filters.newestDecade,
      filterTriggered: true,
      submitted: false,
      currentPage
    });
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
    let currentPage = this.state.currentPage;
    let genre = "";
    // this checks if we are removing genres from the filter tags or adding/removing them from the genre filter
    typeof e === "string" ? genre = e : genre = e.target.value;

    this.filters.id = 0;
    this.filters.year = 0;
    this.filters.submitted = false;
    this.filters.submittedQuery = this.state.searchText;  
    this.filters.director = '';

    if (!this.state.genres.includes(genre)){
      this.filters.genres = [...this.state.genres, genre];    
      let filteredFilms = this.chainFilters(this.state.films, this.filters);

      if (filteredFilms.length > this.state.itemsPerPage){
        currentPage = 1;
      }

      this.setState({
        filteredFilms: filteredFilms,
        searchText: '',
        selectedId: 0,
        selectedDirector: '',
        selectedYear: 0,
        genres: [...this.state.genres, genre],
        filterTriggered: true,
        submitted: false,
        currentPage
      })
    } else {
        let genres = [...this.state.genres];
        let index = genres.indexOf(genre);
        genres.splice(index, 1);
        this.filters.genres = genres;  

        let filteredFilms = this.chainFilters(this.state.films, this.filters);
        if (filteredFilms.length > this.state.itemsPerPage){
          currentPage = 1;
        }

        this.setState({ 
          filteredFilms: filteredFilms,
          searchText: '',
          selectedId: 0,
          selectedDirector: '',
          selectedYear: 0,
          genres: genres,
          filterTriggered: true,
          submitted: false,
          currentPage
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

  // Reset to default
  resetSearchResults = () => {
    let updatedFilms = this.state.films;
    this.setState({
      filteredFilms: updatedFilms,
      selectedDirector: '',
      selectedYear: 0
    })
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
      hideWatched: false,
      genres: []
    })
  }

  handleSubmit = (event) => {  
    event.preventDefault();
   
    let currentPage = this.state.currentPage;

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
    if (filteredFilms.length > this.state.itemsPerPage){
      currentPage = 1
    }

    this.setState({
      filteredFilms: filteredFilms,
      submittedQuery: this.state.searchText,
      suggestedFilms: [],
      submitted: true,
      selectedId: 0,
      searchText: '',
      hideWatched: false,
      currentPage
    })
  }

  changePage = (index) => {
    this.setState({
      currentPage: parseInt(index + 1)
    })
  }

  goPrev = (page) => {
    this.setState({
      currentPage: parseInt(page - 1)
    })
  }

  goNext = (page) => {
    this.setState({
      currentPage: parseInt(page + 1)
    })
  }
    
  render(){
    const { itemsPerPage, currentPage, filteredFilms, filterTriggered, suggestedFilms, searchText, submitted, submittedQuery, runtime, selectedYear, selectedDirector, oldestDecade, newestDecade, hideWatched, genres, trailer, overlay, activeFilter, mainGenres, extraGenres } = this.state;
    let filmsperPage = filteredFilms;

    if (filteredFilms.length > 25){
      filmsperPage = filteredFilms.slice(((currentPage) - 1) * 25,(currentPage * 25));
    } 

    let fullTime = this.convertTime(runtime);

    return (
      <div id="full-wrapper">
        {overlay && <FilmOverlay handleToggleOverlay={this.handleToggleOverlay} trailer={trailer} /> }
        <div className="container">
          <div className="row below1">
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
          <nav>
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

                        {selectedYear > 0 && <span className="search-labels__tag search-labels__tag--interactive" onClick={() => this.resetSearchResults()}>{selectedYear}</span> }
                        {selectedDirector !== "" && <span className="search-labels__tag search-labels__tag--interactive" onClick={() => this.resetSearchResults()}>Directed by {selectedDirector}</span> }
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
          </nav>
          <section>
            <ul className="list" id='film-listings' role='main' aria-live='polite'>
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
          </ul>
          </section>
          {filteredFilms.length > itemsPerPage && 
            <Pagination 
              allRecords={filteredFilms.length} 
              itemsPerPage={itemsPerPage} 
              changePage={this.changePage}
              goPrev={this.goPrev}
              goNext={this.goNext}
              currentPage={currentPage}
            />
          }
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;