import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <div className='container'>
      <h1>Board App</h1>
      <h2>* 게시판 앱</h2> 
    </div>
    <Link to="/boards" className='btn'>게시글</Link>
    </>
  )
}

export default Home