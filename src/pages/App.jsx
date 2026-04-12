import React from 'react'
import SEOHead from '../components/SEOHead'
import { seoData } from '../utils/seoData'
import Hero from '../components/Hero'
import Colleges from '../components/Colleges'
import PopularProducts from '../components/PopularProducts'
import Categories from '../components/Categories'

const App = () => {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <SEOHead {...seoData.home} />
      <Hero/>
      <PopularProducts/>
      <Categories/>
      <Colleges/>
    </div>
  )
}

export default App