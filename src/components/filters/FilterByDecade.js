import React, { Component } from "react";
import Dropdown from '../layout/Dropdown';
import PropTypes from "prop-types";

class FilterByDecade extends Component {
  static propTypes = {
    handleFilterByDecade: PropTypes.func.isRequired,
    oldestDecade: PropTypes.number.isRequired,
    newestDecade: PropTypes.number.isRequired
  };

  state = { decades: [ 1960, 1970, 1980, 1990, 2000 , 2010 ] }

  render() {
    const { handleFilterByDecade, oldestDecade, newestDecade } = this.props;
    const { decades } = this.state;

    return (
      <div className="row">
        <div className="col-md-12">
            <div id="filter-decades" className="film-filter">
              <h2 className="filter-header">Which era are you interested on?</h2>
            <div className="decades-filters">
              <label htmlFor="oldest-decade" className="decades-filters__label">From</label>
              {/* We detect the change on the dropdowns at select level and generate the Dropdown components from decades array. The defaultValue ensures that the current selected value remains checked when switch between tabs. */}
              <select name="decades" id="oldest-decade" defaultValue={oldestDecade} onChange={(e) => handleFilterByDecade(e)}>
                {decades.map((d, index) => {
                  return (
                      <Dropdown key={index}
                          decade={d}
                      />
                      )                            
                  })
                }  
              </select>
              <label htmlFor="newest-decade" className="decades-filters__label">To</label>
              <select name="decades" id="newest-decade" defaultValue={newestDecade} onChange={(e) => handleFilterByDecade(e)}>
                {decades.map((d, index) => {
                    return (
                        <Dropdown key={index}
                            decade={d}
                        />
                        )                            
                    })
                }
              </select>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterByDecade;
