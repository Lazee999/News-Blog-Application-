import React from 'react'
import demoImg from '../../assets/images/demo.jpg'
import './BlogModal.scss'
const BlogModal = () => {
  return (
    <div className="modal-overlay">
        <span className="close-content">
            <i className='fa-sold fa-xmark'></i>
        </span>
        <img src={demoImg} alt="Modal Image" className='blogs-modal-image'/>
        <h2 className='blogs-modal-title'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt explicabo ullam quos esse consectetur, nihil, exercitationem nostrum magni, ipsum dignissimos ipsam veritatis. Quam itaque cum officiis aperiam, minima recusandae accusantium!</h2>
        <p className='blog-post-content'> 
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit deleniti quo ipsum reiciendis voluptatibus nulla exercitationem culpa praesentium ipsam eum, placeat eveniet. Quibusdam doloribus cum natus velit eveniet vel nihil!
        </p>
    </div>
  )
}

export default BlogModal