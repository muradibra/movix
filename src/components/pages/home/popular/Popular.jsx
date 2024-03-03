import React, { useState } from 'react'
import ContentWrapper from '../../../lib/contentWrapper/ContentWrapper'
import useFetch from '../../../../hooks/useFetch'
import SwitchTabs from '../../../lib/switchTabs/SwitchTabs'
import SwiperSlider from '../../../lib/slider/SwiperSlider'

function Trending() {
    const [endpoint, setEndpoint] = useState("movie");

    const { data: popularData, loading: popularLoading } = useFetch(`/${endpoint}/popular`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv")
    }

    return (
        <div className='popular'>
            <ContentWrapper>
                <h2 className='slider-title'>What's Popular</h2>
                <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
            </ContentWrapper>

            <ContentWrapper>
                <SwiperSlider
                    data={popularData?.results}
                    loading={popularLoading}
                    endpoint={endpoint}
                />
            </ContentWrapper>
        </div>
    )
}

export default Trending