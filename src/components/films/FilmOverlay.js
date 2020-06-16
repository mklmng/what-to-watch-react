import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class FilmOverlay extends Component {
    static propTypes = {
        handleToggleOverlay: PropTypes.func.isRequired,
        trailer: PropTypes.string.isRequired
    }

    render() {
        return (
            <div id="overlay" onClick={() => this.props.handleToggleOverlay()}>
              <div className="overlay__wrapper">
                <div className="overlay__wrapper__video-container">
                    <iframe 
                        title={this.props.trailer}
                        className="overlay__wrapper__video-container__video" 
                        width="560" 
                        height="315" 
                        src={`https://www.youtube-nocookie.com/embed/${this.props.trailer}`} 
                        frameborder="0" 
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
