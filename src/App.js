import React, { Component, Fragment } from 'react';
import axios from 'axios';
import FilmOverlay from './components/films/FilmOverlay';
import Header from './components/layout/Header';
import FilterByWatched from './components/filters/FilterByWatched';
import FilterByRuntime from './components/filters/FilterByRuntime';
import FilterByDecade from './components/filters/FilterByDecade';
import FilterByGenre from './components/filters/FilterByGenre';
import Spinner from 'react-bootstrap/Spinner';
import FilmCard from './components/films/FilmCard';
import Footer from './components/layout/Footer';

import './styles/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        nightTheme: false,
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
        goToFilms: false
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

  switchTheme = () => this.setState({nightTheme: !this.state.nightTheme });  

  handleFilterByWatched = () => this.setState({ hideWatched: !this.state.watched });
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
    let filteredFilms = this.state.films.filter(film => 
      film.runtime <= this.state.runtime
      && film.runtime <= this.state.runtime
      && (film.year >= this.state.oldestDecade && film.year <= this.state.newestDecade + 9) 
    )

    if (this.state.hideWatched){
        filteredFilms = filteredFilms.filter(film => 
            film.watched === !this.state.hideWatched 
        )               
    } 

    if (this.state.genres.length){
        filteredFilms = filteredFilms.filter(film => 
            film.genres.some(g => this.state.genres.includes(g))
        )
    }

    return (
      <div id="full-wrapper" className={`${this.state.nightTheme && 'dark'}`}>
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossOrigin="anonymous"
          />

        {this.state.overlay &&  <FilmOverlay handleToggleOverlay={this.handleToggleOverlay} trailer={this.state.trailer} /> }

        <Header
          nightTheme={this.state.nightTheme}
          switchTheme={this.switchTheme}
        />
        <div className="container">
          {(this.state.films.length && this.state.extraGenres.length) && 
          <Fragment>
            <FilterByWatched handleFilterByWatched={this.handleFilterByWatched} />
            <FilterByRuntime handleFilterByRuntime={this.handleFilterByRuntime} />
            <FilterByGenre 
              handleFilterByGenre={this.handleFilterByGenre} 
              mainGenres={this.state.mainGenres}
              extraGenres={this.state.extraGenres}
            />
            <FilterByDecade handleFilterByDecade={this.handleFilterByDecade} />  
          </Fragment>
          }

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
          <div className="row">
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