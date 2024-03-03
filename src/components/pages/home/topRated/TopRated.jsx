import React, { useState } from 'react'
import useFetch from '../../../../hooks/useFetch';
import ContentWrapper from '../../../lib/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../lib/switchTabs/SwitchTabs';
import SwiperSlider from '../../../lib/slider/SwiperSlider';

function TopRated() {
    const [endpoint, setEndpoint] = useState('movie');
    const { data: topRatedData, loading: topRatedLoading } = useFetch(`/${endpoint}/top_rated`)
    // console.log(trendingLoading)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv")
    }

    return (
        <div className='trending'>
            <ContentWrapper>
                <h2 className='slider-title'>Top Rated</h2>
                <SwitchTabs data={['Day', 'Week']} onTabChange={onTabChange} />
            </ContentWrapper>

            <ContentWrapper>
                <SwiperSlider
                    data={topRatedData?.results}
                    loading={topRatedLoading}
                    endpoint={endpoint}
                />
            </ContentWrapper>
        </div>
    )
}

export default TopRated