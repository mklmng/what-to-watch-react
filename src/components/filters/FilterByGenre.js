import React, { Component } from 'react';
import Checkbox from '../layout/Checkbox';
import PropTypes from 'prop-types';

class FilterByGenre extends Component {
    static propTypes = {
        handleFilterByGenre: PropTypes.func.isRequired
    }

    state = {
        expanded: false,
        mainGenres: [ "action" , "comedy", "drama" , "horror", "sci-fi"],
        extraGenres: [ 
            "adventure", 
            "animation",         
            "biography",
            "crime",
            "documentary",
            "fantasy",
            "history",
            "music",
            "musical",
            "romance",
            "sport",
            "thriller",
            "war"
        ]
    }

    render() {
        const toggleExpanded = () => this.setState({ expanded: !this.state.expanded });


        return (
            <div className="row">
                <div className="col-md-12">
                    <div id="filter-genres" className="film-filter">
                        <h2 className="filter-header">What genres do you like?</h2>	
                        <div id="main-genres" onChange={(e) => this.props.handleFilterByGenre(e)}>
                            {this.state.mainGenres.map((g, index) => {
                            return (
                                <Checkbox key={index} genre={g} />
                            )                            
                             })}
                        </div>
                        <span className={`cta-expand ${this.state.expanded && 'expanded'}`}
                            onClick={() => toggleExpanded()}>
                            See all genres
                        </span>
                        <div id="extra-genres" onChange={(e) => this.props.handleFilterByGenre(e)}>
                            {this.state.extraGenres.map((g, index) => {
                                return (
                                    <Checkbox key={index} genre={g} />
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