import React from 'react'
import HomeBanner from './homeBanner/HomeBanner'
import Trending from './trending/Trending'
import Popular from './popular/Popular'

function Home() {

  return (
    <div className='home' >
      <HomeBanner />
      <Trending />
      <Popular />
    </div>
  )
}

export default Home