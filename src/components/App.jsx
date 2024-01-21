import Searchbar from './Searchbar/Searchbar';
import { useState, useEffect } from 'react';
import { getPictures } from '../API/Api';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import styles from './Searchbar/Searchbar.module.css';

const App = () => {
  const [valueInput, setValueinput] = useState('');
  const [imagesList, setImagesList] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [bigImage, setBigImage] = useState('');

  useEffect(() => {
    const handlerFetch = async () => {
      try {
        setloading(true);
        const res = await getPictures(valueInput, page);
        const { totalHits } = res.data;
        setImagesList(prevImages => [...prevImages, ...res.data.hits]);
        setShowButton(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setError(error.message);
      } finally {
        setloading(false);
      }
    };
    if (valueInput) {
      handlerFetch();
    }
  }, [valueInput, page]);

  const handleForGet = valueText => {
    console.log(valueText);
    setValueinput(valueText);
    setImagesList([]);
    setPage(1);
    setShowButton(false);
  };

  const changePage = () => setPage(prevPage => prevPage + 1);

  const closeModal = () => {
    setModalShow(!modalShow);
    setBigImage('');
  };

  const showBigImage = el => {
    setModalShow(!modalShow);
    setBigImage(el.largeImageURL);
  };

  return (
    <div>
      <Loader loading={loading} />
      {error && <p className={styles.error}>{error}</p>}
      <Searchbar handleForGet={handleForGet} />
      <ImageGallery imagesList={imagesList} showBigImage={showBigImage} />
      {showButton && <Button changePage={changePage} />}
      {modalShow && <Modal closeModal={closeModal}>{bigImage}</Modal>}
    </div>
  );
};

// class App extends Component {
//   state = {
//     valueInput: '',
//     imagesList: [],
//     page: 1,
//     loading: false,
//     showButton: false,
//     modalShow: false,
//     error: '',
//     bigImage: '',
//   };
//   handleForGet = valueText => {
//     this.setState({ valueInput: valueText });
//     this.setState({ imagesList: [], page: 1, showButton: false });
//   };
//   changePage = () => {
//     this.setState(({ page }) => ({
//       page: page + 1,
//     }));
//   };

//   async handlerFetch() {
//     const { page, valueInput } = this.state;
//     try {
//       this.setState({ loading: true });
//       const res = await getPictures(valueInput, page);
//       const { totalHits } = res.data;
//       this.setState(prevState => ({
//         imagesList: [...prevState.imagesList, ...res.data.hits],
//         showButton: page < Math.ceil(totalHits / 12),
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ loading: false });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (
//       this.state.valueInput &&
//       (this.state.valueInput !== prevState.valueInput ||
//         this.state.page !== prevState.page)
//     ) {
//       this.handlerFetch();
//     }
//   }

//   closeModal = () => {
//     this.setState({
//       modalShow: !this.state.modalShow,
//       bigImage: '',
//     });
//   };

//   showBigImage = el => {
//     this.setState({
//       modalShow: !this.state.modalShow,
//       bigImage: el.largeImageURL,
//     });
//   };

//   render() {
//     const { loading, error, modalShow, showButton, bigImage } = this.state;
//     return (
//       <div>
//         <Loader loading={loading} />
//         {error && <p className={styles.error}>{error}</p>}
//         <Searchbar handleForGet={this.handleForGet} />
//         <ImageGallery
//           imagesList={this.state.imagesList}
//           showBigImage={this.showBigImage}
//         />
//         {showButton && <Button changePage={this.changePage} />}

//         {modalShow && <Modal closeModal={this.closeModal}>{bigImage}</Modal>}
//       </div>
//     );
//   }
// }
export default App;
