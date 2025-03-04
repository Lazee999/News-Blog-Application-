import React from 'react'
import UserImg from '../../assets/images/user.jpg'
import './Blog.scss'
const Blog = ({onBack}) => {
  return (
    <div className='blog'>
        <div className="blog-left">
        <img src={UserImg} alt="" />
        </div>
        <div className="blog-right">
          <div className="blog-right-form">
            <h1> New Post</h1>
            <form>
              <div className="img-upload">
                <label htmlFor="file-upload" className="file-upload">
                    <i className='bx bx-upload'></i> Upload Image 
                </label>
                <input type="file" id="file-upload" />
                </div>
                <input type="text" placeholder='Add Title (Max 60 characters)'className='title-input'/>
                <textarea className='text-input' placeholder='Add Text'></textarea>
                <button type='submit' className='submit-btn'>Submit Button </button>
            </form>
          </div>
            <button className='blog-close-btn' onClick={onBack}>
                Back <i className='bx bx-chevron-right'></i>
            </button>
        </div>
    </div>
  )
}

export default Blog