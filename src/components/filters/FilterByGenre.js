import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FilterByGenre extends Component {
    static propTypes = {
        handleFilterByGenre: PropTypes.func.isRequired
    }

    state = {
        expanded: false
    }

    render() {
        const toggleExpanded = () => this.setState({ expanded: !this.state.expanded });

        return (
            <div className="row">
                <div className="col-md-12">
                    <div id="filter-genres" className="film-filter">
                        <h2 className="filter-header">What genres do you like?</h2>	
                        <div id="main-genres" onChange={(e) => this.props.handleFilterByGenre(e)}>
                            <div className="genre-selector">
                                <input id="action" type="checkbox" className="genre-items" value="action" />
                                <label htmlFor="action">action</label>    
                            </div><div className="genre-selector">
                                <input id="comedy" type="checkbox" className="genre-items" value="comedy" />
                                <label htmlFor="comedy">comedy</label>    
                            </div><div className="genre-selector">
                                <input id="drama" type="checkbox" className="genre-items" value="drama" />
                                <label htmlFor="drama">drama</label>    
                            </div><div className="genre-selector">
                                <input id="horror" type="checkbox" className="genre-items" value="horror" />
                                <label htmlFor="horror">horror</label>    
                            </div><div className="genre-selector">
                                <input id="sci-fi" type="checkbox" className="genre-items" value="sci-fi" />
                                <label htmlFor="sci-fi">sci-fi</label>    
                            </div> 
                        </div>
                        <span className={`cta-expand ${this.state.expanded && 'expanded'}`}
                            onClick={() => toggleExpanded()}>
                            See all genres
                        </span>
                        <div id="extra-genres" onChange={(e) => this.props.handleFilterByGenre(e)}>
                            <div className="genre-selector">
                                <input id="adventure" type="checkbox" className="genre-items" value="adventure" />
                                    <label htmlFor="adventure">adventure</label>
                            </div><div className="genre-selector">
                                <input id="animation" type="checkbox" className="genre-items" value="animation" />
                                    <label htmlFor="animation">animation</label>
                            </div><div className="genre-selector">
                                <input id="biography" type="checkbox" className="genre-items" value="biography" />
                                <label htmlFor="biography">biography</label>
                            </div><div className="genre-selector">
                                <input id="crime" type="checkbox" className="genre-items" value="crime" />
                                    <label htmlFor="crime">crime</label>
                            </div><div className="genre-selector">
                                <input id="documentary" type="checkbox" className="genre-items" value="documentary" />
                                    <label htmlFor="documentary">documentary</label>
                            </div><div className="genre-selector">
                                <input id="fantasy" type="checkbox" className="genre-items" value="fantasy" />
                                <label htmlFor="fantasy">fantasy</label>
                            </div><div className="genre-selector">
                                <input id="history" type="checkbox" className="genre-items" value="history" />
                                <label htmlFor="history">history</label>
                            </div><div className="genre-selector">
                                <input id="music" type="checkbox" className="genre-items" value="music" />
                                <label htmlFor="music">music</label>
                            </div><div className="genre-selector">
                                <input id="musical" type="checkbox" className="genre-items" value="musical" />
                                <label htmlFor="musical">musical</label>
                            </div><div className="genre-selector">
                                <input id="mystery" type="checkbox" className="genre-items" value="mystery" />
                                <label htmlFor="mystery">mystery</label>
                            </div><div className="genre-selector">
                                <input id="romance" type="checkbox" className="genre-items" value="romance" />
                                <label htmlFor="romance">romance</label>
                            </div><div className="genre-selector">
                                <input id="sci-Fi" type="checkbox" className="genre-items" value="sci-Fi" />
                                <label htmlFor="sci-Fi">sci-Fi</label>
                            </div><div className="genre-selector">
                                <input id="sport" type="checkbox" className="genre-items" value="sport" />
                                <label htmlFor="sport">sport</label>
                            </div><div className="genre-selector">
                                <input id="thriller" type="checkbox" className="genre-items" value="thriller" />
                                <label htmlFor="thriller">thriller</label>
                            </div><div className="genre-selector">
                                <input id="war" type="checkbox" className="genre-items" value="war" />
                                <label htmlFor="war">war</label>
                            </div>
                        </div>

                    </div>        		
                </div>    
            </div>
        )
    }
}

export default FilterByGenre