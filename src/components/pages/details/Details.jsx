import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux';
import Img from '../../lib/lazyLoadImg/Img';
import ContentWrapper from '../../lib/contentWrapper/ContentWrapper';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './cast/Cast';
import VideosSection from './videosSection/VideosSection';
import Similar from './sliders/Similar';
import Recommendations from './sliders/Recommendations';

function Details() {
  const { mediaType, id } = useParams();
  const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);
  const { data: video, loading: videoLoading } = useFetch(`/${mediaType}/${id}/videos`);

  // console.log("video", video)
  return (
    <div className='details'>
      <DetailsBanner
        crew={credits?.crew}
        video={video?.results?.[0]}
      />
      <Cast
        data={credits?.cast}
        loading={creditsLoading}
      />
      <VideosSection
        data={video}
        loading={videoLoading}
      />
      <Similar mediaType={mediaType} id={id} />
      <Recommendations mediaType={mediaType} id={id} />
    </div>
  )
}

export default Details