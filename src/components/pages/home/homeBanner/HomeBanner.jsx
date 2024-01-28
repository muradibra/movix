import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useFetch from '../../../../hooks/useFetch';
import { fetchDataFromApi } from '../../../utils/api';
import ContentWrapper from '../../../lib/contentWrapper/ContentWrapper'

function HomeBanner() {
    const [background, setBackground] = useState('');
    const { imgUrls } = useSelector(state => state.home);
    const { data, loading } = useFetch('/movie/upcoming')

    useEffect(() => {
        
        const bg = `${imgUrls?.backdrop}/${data?.results[Math.floor(Math.random() * 20)].backdrop_path}`
        setBackground(bg)
    }, [])


    return (
        <div className='home-banner'>
            {
                !loading && (
                    <div className="backdrop-img">
                        <img src={background} alt="" />
                    </div>
                )
            }

            <ContentWrapper>
                <div className='home-banner-content'>
                    <h1 className='title'>Welcome.</h1>
                    <span className='subTitle'>Millions of movies, TV shows and people to discover. Explore now.</span>
                    <div className='home-banner-searchInput'>
                        <input
                         type="text"
                         placeholder='Search for a movie or a TV show...'
                         />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
            <div className="opacity-layer"></div>
        </div>
    )
}

export default HomeBanner