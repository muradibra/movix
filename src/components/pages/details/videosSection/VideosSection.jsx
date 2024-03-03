import React, { useState } from 'react'
import ContentWrapper from '../../../lib/contentWrapper/ContentWrapper'
import Img from '../../../lib/lazyLoadImg/Img'
import { PlayIcon } from '../detailsBanner/PlayBtn'
import VideoPopup from '../detailsBanner/VideoPopup';

function VideosSection({ data, loading }) {
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className='videos-section'>
            <ContentWrapper>
                <div className="section-heading">Official Videos</div>
                <div className="videos">
                    {
                        !loading ? (
                            data?.results?.map((video) => (
                                <div className='video' key={video.id}>
                                    <div
                                        className="thumbnail"
                                        onClick={() => {
                                            setVideoId(video.key);
                                            setShow(true);
                                        }}
                                    >
                                        <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                                        <PlayIcon />
                                    </div>
                                    <div className="title">{video.name}</div>
                                </div>
                            ))
                        ) : (
                            <div className="videoSkeleton">
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                            </div>
                        )
                    }
                </div>
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    )
}

export default VideosSection