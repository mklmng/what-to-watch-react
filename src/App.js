import React, { Component, Fragment } from 'react';
import axios from 'axios';
import FilmOverlay from './components/films/FilmOverlay';
import Header from './components/layout/Header';
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
        runtime: 0,
        oldestDecade: 0,
        newestDecade: 0,
        hideWatched: false,
        genres: [],
        mainGenres: ["action" , "comedy" , "drama" , "horror" , "sci-fi"],
        extraGenres: [],
        films: [],
        loading: true,
        overlay: false,
        trailer: "",
        goToFilms: false,
        activeFilter: ''
    };

    this.resultsRef = React.createRef();  
  }
  
  componentDidMount() {
    this.setState({ loading: true }, () => {
        axios.get('https://gist.githubusercontent.com/mklmng/fa894dc9c86dfed34e45063adcf1b73e/raw/eb77422572bbf7bee0ebaf86c02eb1fe99730195/Films.json')
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
              films: response.data
            })
        })
        .catch(error => {
            this.setState({ loading: false })
        });
    });
  }   

  showFilter = filterName => this.setState({ activeFilter: filterName });
  handleFilterByWatched = () => this.setState(prevstate => ({ hideWatched: !prevstate.hideWatched}));
  handleFilterByRuntime = e => this.setState({ runtime: parseInt(e.target.value) }); 
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
    let genre = e.target.value;

    if (!this.state.genres.includes(genre)){
      this.setState({
        genres: [...this.state.genres, genre]
      })
    } else {
        let genres = [...this.state.genres];
        let index = genres.indexOf(e.target.value);
        genres.splice(index, 1);
        this.setState({ genres: genres })
    }
  }

  handleToggleOverlay = (trailer) => {
      this.setState({ overlay: !this.state.overlay, trailer: trailer })
  }
  
  render(){

    const { films, runtime, oldestDecade, newestDecade, hideWatched, genres, trailer, overlay, activeFilter, mainGenres, extraGenres } = this.state;

    let filteredFilms = films.filter(film => 
      film.runtime <= runtime
      && film.runtime <= runtime
      && (film.year >= oldestDecade && film.year <= newestDecade + 9) 
    )

    if (hideWatched){
        filteredFilms = filteredFilms.filter(film => 
            film.watched === !hideWatched 
        )               
    } 

    if (genres.length){
        filteredFilms = filteredFilms.filter(film => 
            film.genres.some(g => genres.includes(g))
        )
    }

    if (hideWatched){
      filteredFilms = filteredFilms.filter(f => !f.watched);
    }

    return (
      <div id="full-wrapper">
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossOrigin="anonymous"
          />

        {overlay &&  <FilmOverlay handleToggleOverlay={this.handleToggleOverlay} trailer={trailer} /> }

        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="main-filters">
                <h2 className="sub-header">Filter by</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col col-md-4">
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
                <FilterByRuntime handleFilterByRuntime={this.handleFilterByRuntime} />
            }
            {activeFilter === 'genre' && 
                <FilterByGenre 
                  handleFilterByGenre={this.handleFilterByGenre} 
                  mainGenres={mainGenres}
                  extraGenres={extraGenres}
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
                      whereToWatch={film.whereToWatch}
                      trailer={film.trailer}
                      overlay={this.state.overlay}
                      handleToggleOverlay={this.handleToggleOverlay}
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