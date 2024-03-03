import React from 'react'
import SwiperSlider from '../../../lib/slider/SwiperSlider'
import useFetch from '../../../../hooks/useFetch'
import ContentWrapper from '../../../lib/contentWrapper/ContentWrapper'

function Similar({ mediaType, id }) {
    const { data, loading } = useFetch(`/${mediaType}/${id}/similar`)
    // console.log(data)
    const title = mediaType === 'tv' ? 'Similar TV Shows' : 'Similar Movies'

    return (
        <div className='similar-section'>
            <ContentWrapper>
                <div
                    className="section-title"
                    style={{
                        fontSize: '24px',
                        color: '#fff',
                        marginBottom: '20px',
                        fontWeight: '400'
                    }}
                >
                    {title}
                </div>
                <SwiperSlider
                    data={data?.results}
                    loading={loading}
                    endpoint={mediaType}
                />
            </ContentWrapper>
        </div>
    )
}

export default Similar