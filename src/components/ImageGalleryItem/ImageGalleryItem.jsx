import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ item, toggleModal }) => {
  const handleClick = () => {
    toggleModal(item.largeImageURL, item.tags);
  };

  return (
    <li onClick={handleClick} className={css.galleryItem}>
      <img
        loading="lazy"
        className={css.ImageGalleryItem}
        src={item.webformatURL}
        alt={item.tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
