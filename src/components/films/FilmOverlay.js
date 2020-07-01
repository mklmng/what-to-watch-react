import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class FilmOverlay extends Component {
    static propTypes = {
        handleToggleOverlay: PropTypes.func.isRequired,
        trailer: PropTypes.string.isRequired
    }

    render() {
        const { handleToggleOverlay, trailer } = this.props;

        return (
            <div id="overlay" onClick={() => handleToggleOverlay()}>
              <div className="overlay__wrapper">
                <div className="overlay__wrapper__video-container">
                    <iframe 
                        title={trailer}
                        itemProp="trailer"
                        className="overlay__wrapper__video-container__video" 
                        width="560" 
                        height="315" 
                        src={`https://www.youtube-nocookie.com/embed/${trailer}`} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen="">
                    </iframe>
                </div>
              </div>
            </div>
        )
    }
}

export default FilmOverlay
