import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dropdown extends Component {
  static propTypes = {
    decade: PropTypes.number.isRequired,
  };

  render() {
    return <option value={this.props.decade}>{this.props.decade}</option>;
  }
}

export default Dropdown;
