import React from 'react';
import {updateUserLocation, getMyLocationAndSet} from 'actions/locationFilterActions';
import './change-zip-modal.less';
import {addEvent} from 'utility/ga.js';
const zipCodeEscapedPattern = '^[0-9]{5}(?:-[0-9]{4})?$';

class ChangeZipModal extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
      <div className="modal-inner">
        {
          this.props.data.error ?
          <h2>Choose Your Location</h2> :
          <h2>Change Your Location</h2>
        }
        <form onSubmit={this.setLocation.bind(this)}>
          <input onChange={this.changeEvent.bind(this)} type="search" placeholder={`${_.get(this.props, 'data.location') || 'Zip, city, address'}`} />
          {
            this.state.loading ?
            <div data-loader="circle" className="loading"></div> :
            <span onClick={this.getMyLocation.bind(this)} className="get-my-location"></span>
          }          
          <button type="submit" className={`submit`} disabled={!this.state.newLocation}>Submit</button>
        </form>
        <br/>
        <p className="disclaimer">* note: only 100 locations show up per search. Be as specific as possible or the location you are looking for may not be visible. </p>
        <br/>
      </div>
    );
  }

  changeEvent(e) {
    const valid = e.currentTarget.value.match(new RegExp(zipCodeEscapedPattern))
    this.setState({valid: valid, newLocation: e.currentTarget.value})
  }

  setLocation(e) {
    e.preventDefault();
    addEvent('Change Location', this.state.newLocation);
    updateUserLocation(this.state.newLocation);
  }

  async getMyLocation() {
    addEvent('Change Location', 'find me');
    this.setState({loading: true})
    await getMyLocationAndSet();
    this.setState({loading: false})
  }
}

export default ChangeZipModal;

// {?currentLocation} {currentLocation} {:else} Street, City, State, or Zip {/currentLocation}