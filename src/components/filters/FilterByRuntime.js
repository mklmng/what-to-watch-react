import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FilterByRuntime extends Component {
    static propTypes = {
        handleFilterByRuntime: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div id="filter-runtime" className="film-filter">
                        <div id="runtimes">
                            <h2 className="filter-header">How much time do you have?</h2>	
                                <div id="runtimes-filters" onChange={(e) => this.props.handleFilterByRuntime(e)}>
                                    <div className="runtime-filter">
                                        <input 
                                            type="radio" 
                                            className="film-times" 
                                            name="runtime" 
                                            id="runtime-90"
                                            value="90"
                                                />
                                        <label htmlFor="runtime-90">1h 30min</label>
                                    </div><div className="runtime-filter">
                                        <input 
                                            type="radio" 
                                            className="film-times" 
                                            name="runtime" 
                                            id="runtime-120"
                                            value="120"
                                                />
                                            <label htmlFor="runtime-120">2h</label>
                                    </div><div className="runtime-filter">
                                        <input 
                                            type="radio" 
                                            className="film-times" 
                                            name="runtime" 
                                            id="runtime-150"
                                            value="150"
                                                />
                                        <label htmlFor="runtime-150">2h 30min</label>
                                    </div><div className="runtime-filter">
                                        <input 
                                            type="radio" 
                                            className="film-times" 
                                            name="runtime" 
                                            id="runtime-180"
                                            value="180"
                                                />
                                        <label htmlFor="runtime-180">3h</label>
                                    </div><div className="runtime-filter">
                                        <input 
                                            type="radio" 
                                            className="film-times" 
                                            name="runtime" 
                                            id="runtime-all"
                                            value="9999"
                                        />
                                        <label htmlFor="runtime-all">All the time in world</label>
                                    </div>    
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default FilterByRuntime
