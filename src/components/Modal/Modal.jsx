import { Component } from "react";
import styles from "./Modal.module.css"

class Modal extends Component{
handlerKey=(event)=>{
if(event.code==='Escape'){
  this.props.closeModal()
}
}
handlerOverlay = event => {
if (event.target === event.currentTarget) {
  this.props.closeModal()
  }
};
componentDidMount(){
window.addEventListener('keydown',this.handlerKey)
}
componentWillUnmount(){
window.removeEventListener('keydown',this.handlerKey)
}


render(){
  return(
    <div className={styles.Overlay} onClick={this.handlerOverlay}>
      <div  className={styles.Modal}>
        <span className={styles.ModalClose} onClick={this.props.closeModal}>X</span>
        <img src={this.props.children} alt="123" className={styles.img}/>
      </div>

    </div>
    
  )
}
}
export default Modal