import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Pagination.styles.css';

class Pagination extends Component {
  static propTypes = {
    allRecords: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired,
    goNext: PropTypes.func.isRequired,
    goPrev: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
  };

  render() {
    const {
      allRecords,
      itemsPerPage,
      changePage,
      goNext,
      goPrev,
      currentPage,
    } = this.props;
    let totalPages = Math.ceil(allRecords / itemsPerPage);
    let pageRange = [];
    let additionalNav = false;

    for (let i = 0; i < totalPages; i++) {
      pageRange.push(i + 1);
    }

    if (totalPages > 2) {
      additionalNav = true;
    }

    return (
      <div
        className='film-pagination'
        role='navigation'
        aria-label='Pagination Links'
      >
        <ul className='pagination'>
          {additionalNav && (
            <li
              className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => goPrev(currentPage)}
            >
              <span
                aria-disabled='true'
                aria-label='Go to the previous page'
                aria-controls='film-listings'
              >
                &lt;
              </span>
            </li>
          )}
          {pageRange.map((film, index) => {
            return (
              <li
                key={index}
                // When we are at the currentPage we add the class active to highlight it
                className={`page-item ${
                  currentPage === index + 1 ? 'page-active' : ''
                }`}
                onClick={() => changePage(index)}
                aria-controls='film-listings'
              >
                {film}
              </li>
            );
          })}
          {additionalNav && (
            <li
              className={`page-item ${
                currentPage === totalPages ? 'disabled' : ''
              }`}
              onClick={() => goNext(currentPage)}
            >
              <span
                aria-disabled='true'
                aria-label='Go to the next page'
                aria-controls='film-listings'
              >
                &gt;
              </span>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Pagination;
