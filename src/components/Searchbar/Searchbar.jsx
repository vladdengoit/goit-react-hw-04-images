// import { Component, useState } from 'react';
import styles from './Searchbar.module.css';
import { useState } from 'react';

const Searchbar = ({ handleForGet }) => {
  const [valueText, setValueText] = useState('');

  const handleInput = ({ target }) => {
    const { value } = target;
    setValueText(value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    handleForGet(valueText);
    setValueText('');
  };

  return (
    <div>
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={handleInput}
            value={valueText}
          />
        </form>
      </header>
    </div>
  );
};

// class Searchbar extends Component{
//   state={
// valueText:""
//   }

//   handleInput=(event)=>{
//     const{target}=event
//     const{value}=target
//     this.setState({valueText:value})
//   }
//   handleSubmit=(event)=>{
// event.preventDefault()
// this.props.handleForGet(this.state.valueText)
// this.setState({valueText:""})
// event.currentTarget.reset();
//   }
//   render(){
//     return(
//       <div>
//       <header className={styles.Searchbar}>
//   <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
//     <button type="submit" className={styles.SearchFormButton}>
//       <span className={styles.SearchFormButtonLabel}>Search</span>
//     </button>

//     <input
//       className={styles.SearchFormInput}
//       type="text"
//       autocomplete="off"
//       autofocus
//       placeholder="Search images and photos"
//       onChange={this.handleInput}
//       value={this.state.valueText}
//     />
//   </form>
// </header>
// </div>
//     )
//   }
// }
export default Searchbar;
