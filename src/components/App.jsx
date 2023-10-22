import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getSearch } from 'api/getSearch';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    const getRequest = async (text, page) => {
      setLoading(true);
      try {
        const response = await getSearch(text, page);
        const data = await response.json();
        if (data.hits.length === 0) {
          setEmpty(true);
        }
        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotal(data.total);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (search || page !== 1) {
      getRequest(search, page);
    }
  }, [search, page]);

  const handleSubmit = newSearch => {
    setSearch(newSearch);
    setImages([]);
    setPage(1);
    setTotal(1);
    setLoading(false);
    setError(null);
    setEmpty(false);
  };

  const clickLoad = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = (imageURL, alt) => {
    setShowModal(!showModal);
    setLargeImageURL(imageURL);
    setAlt(alt);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Toaster toastOptions={{ duration: 1500 }} />
      <Searchbar handleSubmit={handleSubmit} />
      {error && (
        <h2 style={{ textAlign: 'center' }}>
          Something went wrong: ({error})!
        </h2>
      )}
      <ImageGallery toggleModal={toggleModal} images={images} />
      {loading && <Loader />}
      {empty && (
        <h2 style={{ textAlign: 'center' }}>Sorry. There are no images ...</h2>
      )}
      {total / 12 > page && <Button clickLoad={clickLoad} />}
      {showModal && (
        <Modal closeModal={closeModal}>
          <img src={largeImageURL} alt={alt} />
        </Modal>
      )}
    </div>
  );
};
