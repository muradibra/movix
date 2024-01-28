import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../../lib/contentWrapper/ContentWrapper'
import useFetch from '../../../../hooks/useFetch'
import SwitchTabs from '../../../lib/switchTabs/SwitchTabs'
import SwiperSlider from '../../../lib/slider/SwiperSlider'
import axios from 'axios'
import { fetchDataFromApi } from '../../../utils/api'

function Trending() {
    const [endpoint, setEndpoint] = useState('day');
    // const [trendingData, setTrendingData] = useState([]);

    // const BASE_URL = 'https://api.themoviedb.org/3';
    // const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

    // const headers = {
    //     Authorization: 'bearer ' + TMDB_TOKEN,
    // }
    const { data: trendingData, loading: trendingLoading } = useFetch(`/trending/all/${endpoint}`)
    console.log(trendingLoading)

    // useEffect(() => {
    //     fetchDataFromApi(`/trending/all/${endpoint}`)
    //     .then(resp => setTrendingData(resp))
    //     // axios.get(BASE_URL + `/trending/all/${endpoint}`,
    //     //     {
    //     //         headers,
    //     //         // params
    //     //     }
    //     // ).then(resp => {
    //     //     if(resp.status === 200) setTrendingData(resp.data)
    //     // })
    // }, [])

    const onTabChange = (tab) => {
        tab === "Day" ? setEndpoint('day') : setEndpoint('week');
    }

    return (
        <div className='trending'>
            <ContentWrapper>
                <h2 className='slider-title'>Trending</h2>
                <SwitchTabs data={['Day', 'Week']} onTabChange={onTabChange} />
            </ContentWrapper>

            <ContentWrapper>
                <SwiperSlider
                    data={trendingData?.results}
                    loading={trendingLoading}
                />
            </ContentWrapper>
        </div>
    )
}

export default Trending