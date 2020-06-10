import React, { Component } from 'react'
import FilterByWatched from './FilterByWatched';

class Filters extends Component {
    render() {
        return (
            <div className="filters">
                <FilterByWatched />
            </div>
        )
    }
}

export default Filters;
