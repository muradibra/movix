import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useFetch from '../../../../hooks/useFetch';
import { fetchDataFromApi } from '../../../utils/api';
import ContentWrapper from '../../../lib/contentWrapper/ContentWrapper'
import Img from '../../../lib/lazyLoadImg/Img';

function HomeBanner() {
    const [background, setBackground] = useState('');
    const { imgUrls } = useSelector(state => state.home);
    const { data, loading } = useFetch('/movie/upcoming')

    useEffect(() => {
        if (data && data.results && data.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const bg = `${imgUrls?.backdrop}/${data.results[randomIndex].backdrop_path}`;
            setBackground(bg);
        }
    }, [data, imgUrls]);


    return (
        <div className='home-banner'>
            {
                !loading && (
                    <div className="backdrop-img">
                        <Img src={background} alt="" />
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