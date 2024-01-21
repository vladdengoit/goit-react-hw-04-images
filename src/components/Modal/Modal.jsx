import styles from './Modal.module.css';

import { useEffect } from 'react';

const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', handlerOverlayEscape);
    return () => document.removeEventListener('keydown', handlerOverlayEscape);
  });

  // handlerKey = event => {
  //   if (event.code === 'Escape') {
  //     closeModal();
  //   }
  // };
  const handlerOverlayEscape = event => {
    if (event.target === event.currentTarget || event.code === 'Escape') {
      closeModal();
    }
  };
  return (
    <div className={styles.Overlay} onClick={handlerOverlayEscape}>
      <div className={styles.Modal}>
        <span className={styles.ModalClose} onClick={closeModal}>
          X
        </span>
        <img src={children} alt="123" className={styles.img} />
      </div>
    </div>
  );
};
// class Modal extends Component {
//   handlerKey = event => {
//     if (event.code === 'Escape') {
//       this.props.closeModal();
//     }
//   };
//   handlerOverlay = event => {
//     if (event.target === event.currentTarget) {
//       this.props.closeModal();
//     }
//   };
//   componentDidMount() {
//     window.addEventListener('keydown', this.handlerKey);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handlerKey);
//   }

//   render() {
//     return (
//       <div className={styles.Overlay} onClick={this.handlerOverlay}>
//         <div className={styles.Modal}>
//           <span className={styles.ModalClose} onClick={this.props.closeModal}>
//             X
//           </span>
//           <img src={this.props.children} alt="123" className={styles.img} />
//         </div>
//       </div>
//     );
//   }
// }
export default Modal;
