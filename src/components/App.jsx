import Searchbar from "./Searchbar/Searchbar"
import { Component } from "react";
import {getPictures} from '../API/Api'
import ImageGallery from './ImageGallery/ImageGallery'
import {Button} from "./Button/Button"
import { Loader } from "./Loader/Loader";
import Modal from "./Modal/Modal"
import styles from "./Searchbar/Searchbar.module.css"


class App extends Component {
  state={
    valueInput:"",
    imagesList:[],
    page:1,
    loading:false,
    showButton: false,
    modalShow:false,
    error:"",
    bigImage:""
  }
 handleForGet=(valueText)=>{
this.setState({valueInput:valueText})
this.setState({imagesList:[],page:1, showButton: false})

  }
  changePage=()=>{
    this.setState(({page})=>({
     page:page+1
    }))

  }

 async handlerFetch(){
  const{page,valueInput,}=this.state
  try {     
    this.setState({ loading: true });
    const res = await getPictures(valueInput , page)
    const{totalHits}=res.data
    this.setState(prevState=>({
      imagesList:[...prevState.imagesList,...res.data.hits],
      showButton: page < Math.ceil(totalHits/12)
    })); 
  
    } catch (error) {
   
    this.setState({error:error.message});
  }  finally {
    this.setState({ loading: false });
  }
  
}


componentDidUpdate(_, prevState){
  if(this.state.valueInput&&(this.state.valueInput !==prevState.valueInput||this.state.page !==prevState.page)){
    this.handlerFetch()
   }
 
// const{page,valueInput}=this.state

// if(valueInput&&(valueInput !==prevState.valueInput||page !==prevState.page)){
//   const{valueInput}=this.state

//   const res = await getPictures(valueInput , this.state.page)    
//   this.setState({
//     imagesList:[...res.data.hits]}
//     )}
  }

  closeModal=()=>{
    this.setState({
      modalShow:!this.state.modalShow ,
      bigImage:"",
    })
  }

  showBigImage=(el)=>{
    this.setState({
      modalShow:!this.state.modalShow ,
      bigImage:el.largeImageURL,
 })
    


  }

  render(){
    const{loading,error,modalShow,showButton,bigImage}=this.state
    return (
      <div>
        <Loader loading={loading}/>
        {error&&<p className={styles.error}>{error}</p>}
       <Searchbar handleForGet={this.handleForGet}/>
       <ImageGallery imagesList={this.state.imagesList} showBigImage={this.showBigImage} />
      {showButton&&<Button changePage={this.changePage}/>}

     { modalShow&&<Modal closeModal={this.closeModal}>
      {bigImage}
      </Modal>}
      </div>
    );
  }
  
};
export default App
