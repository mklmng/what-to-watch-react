import React, { Component } from 'react';
import Checkbox from '../layout/Checkbox';
import PropTypes from 'prop-types';

class FilterByGenre extends Component {
    constructor(props){
        super(props);
        this.state = {
            expanded: false
        }

        this.genresRef = React.createRef();  
    }

    static propTypes = {
        handleFilterByGenre: PropTypes.func.isRequired,
        mainGenres: PropTypes.array.isRequired,
        extraGenres: PropTypes.array.isRequired,
        genres: PropTypes.array.isRequired
    }

    render() {
        const { handleFilterByGenre, mainGenres, extraGenres, genres } = this.props;
        
        const toggleExpanded = (ref) => {
            this.setState({ expanded: !this.state.expanded });
            let elementCoordinates = ref.current.getBoundingClientRect();
            window.scrollTo(0, Math.round(elementCoordinates.y));
        }

        return (
            <div className="row">
                <div className="col-md-12">
                    <div id="filter-genres" className="film-filter">
                        <h2 className="filter-header">Which genres do you like?</h2>	
                        <div id="main-genres" onChange={(e) => handleFilterByGenre(e)}>
                            {mainGenres.map((g, index) => {
                            return (
                                <Checkbox 
                                    key={index} 
                                    genre={g}
                                    genres={genres}
                                    />
                            )                            
                             })}
                        </div>
                        <span className={`cta-expand ${this.state.expanded ? 'expanded' : ''}`}
                            onClick={() => toggleExpanded(this.genresRef)}>
                            See all genres
                        </span>
                        <div id="extra-genres" ref={this.genresRef} onChange={(e) => handleFilterByGenre(e)}>
                            {extraGenres.map((g, index) => {
                                return (
                                    <Checkbox 
                                    key={index} 
                                    genre={g}
                                    genres={genres}
                                    />
                                )                            
                                })
                            }
                        </div>
                    </div>        		
                </div>    
            </div>
        )
    }
}

export default FilterByGenre