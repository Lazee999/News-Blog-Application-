import React, { useState } from 'react'
import UserImg from '../../assets/images/user.jpg'
import noImg from '../../assets/images/no-img.png'
import './Blog.scss'
const Blog = ({ onBack, onCreateBlog, editPost , isEditing }) => {
  const [showForm, setShowForm] = useState(false)
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [titleValid, setTitleValid] = useState(true)
  const [contentValid, setContentValid] = useState(true)


  useEffect(() => {
    if (isEditing && editPost) {
      setImage(editPost.image)
      setTitle(editPost.title)
      setContent(editPost.content)
      setShowForm(true)
    } else {
      setImage(null)
      setTitle('')
      setContent('')
      setShowForm(false)
    } 
  },[editPost, isEditing]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      const maxSize = i * 1024 * 1024
      if (file.size > maxSize) {
        alert('Image file size exceeds the maximum limit of 1MB.')
        return
      }
      const reader = new FileReader(); // Use FileReader instead of ImageReader
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file); // Read the image file
    }
  };
  
  const handleTitleChange = (e) => {
    setTitle(e.target.value)
    setTitleValid(true)
  }
  
  const handleContentChange = (e) => {
    setContent(e.target.value)
    setContentValid(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !content) {
      if (!title)  setTitleValid(false)
      if (!title)  setContentValid(false)
        return
    }

    const newBlog = {
      image: image || noImg,
      title,
      content,
    }
    onCreateBlog(newBlog, isEditing)
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
          <h1> {isEditing ? 'Edit Post' : 'New Post' } </h1>
          <form onSubmit={handleSubmit}>
            <div className="img-upload">
              <label htmlFor="file-upload" className="file-upload">
                <i className='bx bx-upload'></i> Upload Image
              </label>
              <input type="file" id="file-upload" onChange={handleImageChange} />
            </div>
            <input type="text" placeholder='Add Title (Max 60 characters)' className={`title-input ${!titleValid ? 'invalid' : ''}`} value={title} onChange={handleTitleChange} maxLength={60} />
            <textarea className={`text-input ${!contentValid ? 'invalid' : ''}`} placeholder='Add Text' value={content} onChange={handleContentChange}></textarea>
            <button type='submit' className='submit-btn'> 
              {isEditing ? "Update Post" : "Submit Post"} </button>
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