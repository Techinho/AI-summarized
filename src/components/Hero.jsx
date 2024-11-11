import React from 'react'
import {logo} from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
     <nav className='flex justify-between items-center w-full mb-10 pt-3'>
     <img src={logo} alt="sumz_logo"
     className='w-28 object-contain' />
     <button type='button' onClick={()=>{
      window.open("https://github.com/Techinho")
     }} className='black-btn'>Github</button>
     </nav>
     <h1 className='head_text'>Summarize Article With <br className='max-md:hidden' />
     <span className='orange_gradient'>OpenAI GPT-4</span> </h1>
     <h2 className='desc'> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus velit aut rem alias reprehenderit labore. Quibusdam aut sequi libero ratione porro unde deleniti. Enim iure expedita incidunt pariatur exercitationem eligendi. </h2>
    </header>
  )
}

export default Hero