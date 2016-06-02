import React from 'react';
import Modal from 'react-modal';
import {closeModal} from 'actions/ModalActions';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';
import './modals.less';

const defaultStyles =  {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: false
  },
  content: {
    position: false,
    top: false,
    left: false,
    right: false,
    bottom: false,
    border: false,
    background: '#FFF',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: false,
    outline: 'none',
    padding: false
  }
};

const Modals = React.createClass({
  render() {
    const modalOpen = _.get(this.props.modal, 'data');
    const modalType = _.get(this.props.modal, 'type');
    const prompt = _.get(this.props.modal, 'prompt') ? 'prompt' : '';
    return (
      <Modal
        isOpen={!!modalOpen}
        className={modalType + ' ' + prompt}
        closeTimeoutMS={300}
        onRequestClose={this.closeModal}
        style={defaultStyles}>
          <div className="modal-wrapper">
          {
            this.renderModal(modalType)
          }
          {
            modalOpen ?
            <div onClick={this.closeModal} className="ion-ios-close-empty close-modal"></div> : null
          }
          </div>
      </Modal>
    );
  },

  renderModal(modalType) {
    
  },

  closeModal() {
    closeModal();
  }

});



export default branch(Modals, {
  cursors: {
    modal: ['modal']
  }
});