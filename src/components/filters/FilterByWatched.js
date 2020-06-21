import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FilterByWatched extends Component {
    static propTypes = {
        handleFilterByWatched: PropTypes.func.isRequired,
        hideWatched: PropTypes.bool.isRequired
    }

    render() {
        const { handleFilterByWatched , hideWatched} = this.props;
        return (
            <div className="row">
                <div className="col-md-12 centered">
                    <div id="filter-watched" className="film-filter centered">
                        <button 
                            type="button" 
                            className="btn btn-sm btn-outline-secondary" 
                            onClick={() => handleFilterByWatched()} 
                        >
                        {hideWatched ? 'Show' : 'Hide'} watched    
                        </button>
                    </div>  
                </div>
            </div>
        )
    }
}

export default FilterByWatched;
