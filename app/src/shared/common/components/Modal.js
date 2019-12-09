import React from 'react';

import './Modal.css';
import { Button } from '../../../screens/Feed/Styled';

const Modal = props => (
  <div className="modal">
    <header className="modal__header">
      <h1>{props.title}</h1>
    </header>
    <section className="modal__content">{props.children}</section>
    <section className="modal__actions">
      {props.canConfirm && <Button onClick={props.onConfirm}>Confirm</Button>}
      {props.canCancel && <Button onClick={props.onCancel}>Cancel</Button>}
    </section>
  </div>
);

export default Modal;
