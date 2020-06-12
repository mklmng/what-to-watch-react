import React, { Component } from "react";
import PropTypes from "prop-types";

class FilterByDecade extends Component {
  static propTypes = {
    handleFilterByDecade: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
            <div id="filter-decades" className="film-filter">
              <h2 className="filter-header">Which era are you interested on?</h2>
            <div className="decades-filters">
              <label htmlFor="oldest-decade" className="decades-filters__label">From</label>
              <select name="decades" id="oldest-decade" defaultValue="1960" onChange={(e) => this.props.handleFilterByDecade(e)}>
                <option value="1960">1960s</option>
                <option value="1970">1970s</option>
                <option value="1980">1980s</option>
                <option value="1990">1990s</option>
                <option value="2000">2000s</option>
                <option value="2010">2010s</option>
              </select>
              <label htmlFor="newest-decade" className="decades-filters__label">To</label>
              <select name="decades" id="newest-decade" defaultValue="2010" onChange={(e) => this.props.handleFilterByDecade(e)}>
                <option value="1960">1960s</option>
                <option value="1970">1970s</option>
                <option value="1980">1980s</option>
                <option value="1990">1990s</option>
                <option value="2000">2000s</option>
                <option value="2010">2010s</option>
              </select>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterByDecade;
