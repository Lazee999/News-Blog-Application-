import React from 'react'
import UserImg from '../../assets/images/user.jpg'
import './Blog.scss'
const Blog = () => {
  return (
    <div className='blog'>
        <div className="blog-left">
        <img src={UserImg} alt="" />
        </div>
        <div className="blog-right">
            <button className='post-btn'>Create a Post</button>
            <button className='blog-close-btn'>
                Back <i className='bx bx-chevron-right'></i>
            </button>
        </div>
    </div>
  )
}

export default Blog