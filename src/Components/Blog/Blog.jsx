import React,{useState} from 'react'
import UserImg from '../../assets/images/user.jpg'
import './Blog.scss'
const Blog = ({onBack , onCreateBlog}) => {
  const [showForm, setShowForm] = useState(false)
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')


  const handleImageChange = (e) => {
    if (e.target.title && e.target.title [0]){
      const reader = new ImageReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(e.target.files[0])
    }
      
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newBlog =  {
      image,
      title,
      content,
    }
    onCreateBlog(newBlog)
    setImage(null)
    setTitle('')
    setContent('')
    setShowForm(false)
  }

  return (
    <div className='blog'>
        <div className="blog-left">
        <img src={UserImg} alt="User Image" />
        </div>
        <div className="blog-right">
          {showForm ? (<div className="blog-right-form">
            <h1> New Post</h1>
            <form onSubmit={handleSubmit}>
              <div className="img-upload">
                <label htmlFor="file-upload" className="file-upload">
                    <i className='bx bx-upload'></i> Upload Image 
                </label>
                <input type="file" id="file-upload" onChange={handleImageChange}/>
                </div>
                <input type="text" placeholder='Add Title (Max 60 characters)'className='title-input' value={title} onChange={(e) => setTitle(e.target.value)}  />
                <textarea className='text-input' placeholder='Add Text' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <button type='submit' className='submit-btn'>Submit Button </button>
            </form>
          </div>) : (
          <button className='post-btn' onClick={() => setShowForm(true)}>Create New Post </button>
          ) }
        
            <button className='blog-close-btn' onClick={onBack}>
                Back <i className='bx bx-chevron-right'></i>
            </button>
        </div>
    </div>
  )
}

export default Blog