import React from 'react'
import { useEffect,useState } from 'react'
import{copy,linkIcon,loader,tick} from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'



const Demo = () => {

  const [article,setArticle]=useState({
    url:"",
    summary:"",
  })
  const [getSummary,{error,isFetching}]=useLazyGetSummaryQuery()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Call getSummary with the correct parameter structure
    const { data } = await getSummary({ articleUrl: article.url });
    
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      setArticle(newArticle);
      console.log(newArticle);
    }
  };
  

  return (
    <section className='mt-16 w-full max-w-xl'>
{/* search bar */}
<div className='flex flex-col w-full gap-2'>
  <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>
    <img src={linkIcon} alt="linkicaon" className=' absolute left-0 my-2 ml-3 w-5' />
  
  <input className='url_input peer' type="url"  placeholder='enter a URL' value={article.url} onChange={(e)=>{setArticle({...article,url:e.target.value})}} required />
  <button type='submit' className='submit_btn px-8 peer-focus:border-gray-700 peer-focus:text-gray-700'onClick={handleSubmit} > Submit</button>
  </form>

  {/* browser url history */}
</div>
{/* Display Results */}
    </section>
  )
}

export default Demo