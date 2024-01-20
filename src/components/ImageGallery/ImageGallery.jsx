import styles from "./ImageGallery.module.css"
const ImageGallery=({imagesList,showBigImage})=>{
  console.log(imagesList);
  const images =imagesList.map((el)=>(
  <li className={styles.ImageGalleryItemImage} key={el.id} onClick={()=>showBigImage(el)} >
  <img src={el.webformatURL} alt={el.type} />
 </li>)    
  )
  return(
    <div>
    <ul className={styles.ImageGallery}>
  {images}
</ul>
</div>
  )
}
 export default ImageGallery