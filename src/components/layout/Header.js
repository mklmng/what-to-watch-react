import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
    static propTypes = {
        nightTheme: PropTypes.bool.isRequired,
        switchTheme: PropTypes.func.isRequired
    }    

    render() {
        return (
            <header>
                <h1 className="header-main">What to Watch</h1>
                <div id="theme-switcher" onChange={() => this.props.switchTheme()}>
			        <label htmlFor="theme">
                        {this.props.nightTheme && "Night " }    
                        {!this.props.nightTheme && "Day " }
                        theme 
                    </label>
			        <input type="checkbox" name="theme" id="theme" />
		        </div>
            </header>
        )
    }
}

export default Header;