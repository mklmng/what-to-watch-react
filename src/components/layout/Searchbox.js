import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Searchbox extends Component {
    static propTypes = {
        handleChange: PropTypes.func.isRequired,
        searchText: PropTypes.string.isRequired,
        handleAutocomplete: PropTypes.func.isRequired,
        suggestedFilms: PropTypes.array.isRequired
    }

    render() {
        const { handleChange, searchText, handleAutocomplete, suggestedFilms } = this.props;

        return (
            <div className="col-12 col-md-6 col-lg-4 search-box">
                  <div className="search-box__container">
                    <label htmlFor="search" className="hidden">Search</label>
                    <input 
                        placeholder="Enter film title"
                        id="search"
                        aria-label="search"
                        type="text"  
                        value={searchText} 
                        onChange={handleChange}
                        onKeyUp={handleAutocomplete}
                        autoComplete="off"
                    />
                    <div className="btn-wrapper">
                      <span className="btn-search">Search</span>
                    </div>
                    {suggestedFilms.length > 0 && 
                        <ul className="autocomplete">
                        {suggestedFilms.map((f,id) => {
                            return (
                                <li className="film-suggestion" key={f.id}>{f.title} <span>({f.year})</span></li>
                            )
                        }) 
                        }
                        </ul>
                    }
                  </div>
              </div>     
        )
    }
}

export default Searchbox
