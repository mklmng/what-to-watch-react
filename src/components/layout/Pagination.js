import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Pagination extends Component {
    static propTypes = {
        allRecords: PropTypes.number.isRequired,
        itemsPerPage: PropTypes.number.isRequired,
        changePage: PropTypes.func.isRequired,
        currentPage: PropTypes.number.isRequired
    }

    render() {
        const { allRecords, itemsPerPage, changePage, currentPage } = this.props;
        let totalPages = Math.ceil(allRecords / itemsPerPage);
        let pageRange = [];

        for (let i=0; i < totalPages; i++){
            pageRange.push(i + 1);
        }      

        return (
            <div className="film-pagination">
                <ul className="pagination">
                    {pageRange.map((film, index) => {
                    return (
                    <li key={index} 
                        // When we are at the currentPage we add the class active to highlight it
                        className={`page-item ${currentPage === index + 1 ? "page-active" : ""}`}
                        onClick={() => changePage(index)}>
                        {film}
                    </li>)
                    })
                    }
                </ul>
            </div>
        )
    }
}

export default Pagination
