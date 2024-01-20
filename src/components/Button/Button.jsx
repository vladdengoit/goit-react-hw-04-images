import styles from './Button.module.css'
export const Button =({changePage})=>{
  return(
    <div style={{textAlign:"center"}}>
   <button type="button" className={styles.Button} onClick={changePage}>Load more</button>
   </div>
  )
}