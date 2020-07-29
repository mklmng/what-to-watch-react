import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Pagination extends Component {
    static propTypes = {
        allRecords: PropTypes.number.isRequired,
        itemsPerPage: PropTypes.number.isRequired
    }

    constructor(props){
        super(props)
    }

    render() {
        const { allRecords, itemsPerPage } = this.props;
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
                    <li key={index} className="page-item">{film}</li> 
                        )
                    })
                    }
                </ul>
            </div>
        )
    }
}

export default Pagination
