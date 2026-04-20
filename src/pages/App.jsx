import React from 'react'
import SEOHead from '../components/SEOHead'
import { seoData } from '../utils/seoData'
import Categories from '../components/Categories'

const App = () => {
  return (
    <div className="bg-[#fcfcfa] min-h-screen">
      <SEOHead {...seoData.home} />
      <Categories/>
    </div>
  )
}

export default App