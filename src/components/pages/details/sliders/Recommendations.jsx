import React from 'react'
import useFetch from '../../../../hooks/useFetch'
import SwiperSlider from '../../../lib/slider/SwiperSlider'
import ContentWrapper from '../../../lib/contentWrapper/ContentWrapper'

function Recommendations({ mediaType, id }) {
    const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`)

    return (
        <div className="recommendations-section">
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
                    Recommendations
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

export default Recommendations