import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class FilterByRuntime extends Component {
    static propTypes = {
        handleFilterByRuntime: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="film-filter">
                    <div id="runtimes">
			            <h2 className="filter-header">How much time do you have?</h2>	
                            <div id="runtimes-filters" onChange={(e) => this.props.handleFilterByRuntime(e)}>
                                <div className="runtime-filter">
                                    <input 
                                        type="radio" 
                                        className="film-times" 
                                        name="runtime" 
                                        value="90"
                                            />
                                    <label htmlFor="runtime1">1h 30min</label>
                                </div><div className="runtime-filter">
                                <input 
                                    type="radio" 
                                    className="film-times" 
                                    name="runtime" 
                                    value="120"
                                        />
                                <label htmlFor="runtime1">2h</label>
                                </div><div className="runtime-filter">
                                <input 
                                    type="radio" 
                                    className="film-times" 
                                    name="runtime" 
                                    value="150"
                                        />
                                <label htmlFor="runtime1">2h 30min</label>
                                </div><div className="runtime-filter">
                                <input 
                                    type="radio" 
                                    className="film-times" 
                                    name="runtime" 
                                    value="150"
                                        />
                                <label htmlFor="runtime1">3h</label>
                                </div><div className="runtime-filter">
                                <input 
                                    type="radio" 
                                    className="film-times" 
                                    name="runtime" 
                                    value="180"
                                        />
                                <label htmlFor="runtime1">All the time in world</label>
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
