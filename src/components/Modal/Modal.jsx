import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackDropClick}>
        <ModalWindow>
          <img src={this.props.imgUrl} alt="" />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
