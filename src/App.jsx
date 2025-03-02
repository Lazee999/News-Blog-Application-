import React from 'react'
import News from './Components/News/News'
import Blog from './Components/Blog/Blog'

const App = () => {
  return (
    <div className='container'>
      <div className="news-blog-app">
        {/* <News /> */}
        <Blog />
      </div>
    </div>
  )
}

export default App