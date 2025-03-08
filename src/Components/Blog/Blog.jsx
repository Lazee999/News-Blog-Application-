import React, { useState } from 'react'
import UserImg from '../../assets/images/user.jpg'
import noImg from '../../assets/images/no-img.png'
import './Blog.scss'
const Blog = ({ onBack, onCreateBlog }) => {
  const [showForm, setShowForm] = useState(false)
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [titleValid, setTitleValid] = useState(true)
  const [contentValid, setContentValid] = useState(true)


  const handleImageChange = (e) => {
    if (e.target.title && e.target.title[0]) {
      const reader = new ImageReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(e.target.files[0])
    }

  }
  const handleTitleChange = (e) => {
    if(e.target.value <= 60) {
      setTitle(e.target.value)
      setTitleValid(true)
    }
      }
  const handleContentChange = (e) => {
    setContent(e.target.value)
    setContentValid(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newBlog = {
      image: image || noImg,
      title,
      content,
    }
    onCreateBlog(newBlog)
    setImage(null)
    setTitle('')
    setContent('')
    setShowForm(false)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onBack()
    },3000)
  }

  return (
    <div className='blog'> 
      <div className="blog-left">
        <img src={UserImg} alt="User Image" />
      </div>
      <div className="blog-right">
        {!showForm && !submitted && (
          <button className='post-btn' onClick={() => setShowForm(true)}>Create New Post </button>
        )}
        {submitted && <p className='submission-msg'> Post Submitted </p>}
        <div className={`blog-right-form ${showForm ? 'visible' : 'hidden'}`}>
          <h1> New Post</h1>
          <form onSubmit={handleSubmit}>
            <div className="img-upload">
              <label htmlFor="file-upload" className="file-upload">
                <i className='bx bx-upload'></i> Upload Image
              </label>
              <input type="file" id="file-upload" onChange={handleImageChange} />
            </div>
            <input type="text" placeholder='Add Title (Max 60 characters)' className='title-input' value={title} onChange={handleTitleChange} />
            <textarea className='text-input' placeholder='Add Text' value={content} onChange={handleContentChange}></textarea>
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