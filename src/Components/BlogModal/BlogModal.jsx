import React from 'react';
import demoImg from '../../assets/images/demo.jpg';
import './BlogModal.scss';

const BlogModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="blog-modal">
        <span className="close-content" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        <img src={demoImg} alt="Blog Image" className="blogs-modal-image" />
        <h2 className="blogs-modal-title">Lorem, ipsum dolor sit amet consectetur adipiscing elit.</h2>
        <p className="blog-post-content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, corrupti. Voluptas aliquid, facilis esse.
          Temporibus tempora repellat ipsam, dolorum cum excepturi quibusdam. 
          Consequatur molestias molestiae dolore minima quod?
        </p>
      </div>
    </div>
  );
};

export default BlogModal;
