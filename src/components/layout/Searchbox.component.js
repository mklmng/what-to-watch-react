import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchBox.styles.css';

class Searchbox extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired,
    handleAutocomplete: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    showFilm: PropTypes.func.isRequired,
    suggestedFilms: PropTypes.array.isRequired
  };

  render() {
    const {
      handleChange,
      searchText,
      handleAutocomplete,
      handleSubmit,
      showFilm,
      suggestedFilms
    } = this.props;

    return (
      <div className='col-12 col-md-6 col-lg-4 search-box'>
        <div className='search-box__container'>
          <form onSubmit={handleSubmit}>
            <label htmlFor='search' className='hidden'>
              Search
            </label>
            <input
              placeholder='Enter film title'
              id='search'
              aria-label='search'
              type='text'
              value={searchText}
              onChange={handleChange}
              onKeyUp={handleAutocomplete}
              autoComplete='off'
            />
            <div className='btn-wrapper'>
              <input className='btn-search' type='submit' value='Search' />
            </div>
            {suggestedFilms.length > 0 && (
              <ul className='autocomplete'>
                {suggestedFilms.map((f, id) => {
                  return (
                    <li
                      onClick={() => showFilm(f.id)}
                      className='film-suggestion'
                      key={f.id}
                    >
                      {f.title} <span>({f.year})</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default Searchbox;
