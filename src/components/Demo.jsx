import React from 'react'
import { useEffect,useState } from 'react'
import{copy,linkIcon,loader,tick} from '../assets'



const Demo = () => {

  const [Article,setArticle]=useState({
    url:"",
    summary:"",
  })
  async function handlesubmit(e){
    alert('submit')
    e.preventDefault()
  }
  return (
    <section className='mt-16 w-full max-w-xl'>
{/* search bar */}
<div className='flex flex-col w-full gap-2'>
  <form className='relative flex justify-center items-center' onSubmit={()=>{}}>
    <img src={linkIcon} alt="linkicaon" className=' absolute left-0 my-2 ml-3 w-5' />
  
  <input className='url_input peer' type="url"  placeholder='enter a URL' value={Article.url} onChange={(e)=>{setArticle({...Article,url:e.target.value})}} required />
  <button type='submit' className='submit_btn px-8 peer-focus:border-gray-700 peer-focus:text-gray-700' > Submit</button>
  </form>

  {/* browser url history */}
</div>
{/* Display Results */}
    </section>
  )
}

export default Demo