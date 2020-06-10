import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FilterByWatched extends Component {
    static propTypes = {
        handleFilterByWatched: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="film-filter centered">
                        <label htmlFor="watched">Hide films I have watched</label>
                        <input 
                            type="checkbox" 
                            name="watched" 
                            id="watched" 
                            onChange={() => this.props.handleFilterByWatched()} 
                        /> 
                    </div>  
                </div>
            </div>
        )
    }
}

export default FilterByWatched;
