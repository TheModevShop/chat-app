import React from 'react';
import './spinner.less';

class Spinner extends React.Component {
  render() {
    return (
      <div className={`${this.props.position} spinner`}>
        <div className="loader"></div>
      </div>
    );
  }
};

module.exports = Spinner;