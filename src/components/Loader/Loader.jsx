import { FidgetSpinner } from 'react-loader-spinner'
 export const Loader = ({loading})=>{
  return(
    <div style={{ textAlign:"center"}}>
    <FidgetSpinner
    
  visible={loading}
  height="80"
  width="80"
  ariaLabel="fidget-spinner-loading"
  wrapperStyle={{}}
  wrapperClass="fidget-spinner-wrapper"
  />
  </div>
  )
}
