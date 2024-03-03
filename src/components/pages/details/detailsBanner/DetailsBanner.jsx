import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import useFetch from '../../../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import Img from '../../../lib/lazyLoadImg/Img';
import ContentWrapper from '../../../lib/contentWrapper/ContentWrapper';
import PosterFallback from '../../../../assets/img/no-poster.png';
import dayjs from 'dayjs';
import Genres from '../../home/genres/Genres';
import CircleRating from '../../../lib/circleRating/CircleRating';
import { PlayIcon } from './PlayBtn.jsx'
import VideoPopup from './VideoPopup.jsx';

function DetailsBanner({ crew, video }) {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const { imgUrls } = useSelector(state => state.home);

    const _genres = data?.genres?.map((g) => g.id)
    const director = crew?.filter(c => c.job === 'Director');
    const writer = crew?.filter(c => c.job === 'Writer' || c.job === 'Story' || c.job === 'Screenplay');

    const toHoursAndMinutes = (totalRuntime) => {
        const hour = Math.floor(totalRuntime / 60);
        const minutes = totalRuntime % 60;
        return `${hour}h ${minutes > 0 ? ` ${minutes}m` : ""}`
    }

    return (
        <>
            {
                !loading ? (
                    !!data && (
                        <div className='details-banner-section' >
                            <div className="bg-img">
                                <Img
                                    src={imgUrls?.backdrop + data?.backdrop_path}
                                />
                            </div>
                            <div className='opacity-layer'></div>

                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {
                                            data?.poster_path ? (
                                                <Img
                                                    className='poster-img'
                                                    src={imgUrls?.poster + data?.poster_path}
                                                />
                                            ) : (
                                                <Img
                                                    className='poster-img'
                                                    src={PosterFallback}
                                                />
                                            )
                                        }
                                    </div>

                                    <div className="right">
                                        <div className="title">
                                            {`
                                                    ${data.name || data.title}
                                                    (${dayjs(data.release_date).format('YYYY')})
                                                `}
                                        </div>

                                        <div className="subtitle">
                                            {data.subtitle || data.tagline}
                                        </div>

                                        <Genres data={_genres} />

                                        <div className="row">
                                            <CircleRating rating={data.vote_average.toFixed(1)} />
                                            <div
                                                className="play-btn"
                                                onClick={() => {
                                                    setShow(true)
                                                    setVideoId(video?.key)
                                                }}
                                            >
                                                <PlayIcon />
                                                <span className="text">
                                                    Watch Trailer
                                                </span>
                                            </div>
                                        </div>

                                        <div className='overview'>
                                            <h2>Overview</h2>
                                            <p>{data.overview}</p>
                                        </div>

                                        <div className="info">
                                            {
                                                data?.status && (
                                                    <div className="info-item">
                                                        <span className='text bold'>Status:</span>
                                                        <span className='text'>{data.status}</span>
                                                    </div>
                                                )
                                            }
                                            {
                                                data?.release_date && (
                                                    <div className="info-item">
                                                        <span className='text bold'>Release Date:</span>
                                                        <span className='text'>{dayjs(data.release_date).format("MMM D, YYYY")}</span>
                                                    </div>
                                                )
                                            }
                                            {
                                                data?.runtime && (
                                                    <div className="info-item">
                                                        <span className="text bold">Runtime:</span>
                                                        <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        {
                                            director?.length > 0 && (
                                                <div className="info">
                                                    <span className="text bold">Director:</span>
                                                    <span className="text">
                                                        {
                                                            director.map((d, i) => (
                                                                <span key={i}>
                                                                    {d.name}
                                                                    {director.length - 1 !== i && ", "}
                                                                </span>
                                                            ))
                                                        }
                                                    </span>
                                                </div>
                                            )
                                        }

                                        {
                                            writer?.length > 0 && (
                                                <div className="info">
                                                    <span className='text bold'>Writer:</span>
                                                    <span className='text'>
                                                        {
                                                            writer.map((d, i) => (
                                                                <span key={i}>
                                                                    {d.name}
                                                                    {writer.length - 1 !== i && ", "}
                                                                </span>
                                                            ))
                                                        }
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </ContentWrapper>
                            <VideoPopup
                                show={show}
                                setShow={setShow}
                                videoId={videoId}
                                setVideoId={setVideoId}
                            />
                        </div >
                    )
                ) : (
                    <div className="detailsBannerSkeleton">
                        <ContentWrapper>
                            <div className="left skeleton"></div>
                            <div className="right">
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                            </div>
                        </ContentWrapper>
                    </div>
                )
            }
        </>
    )
}

export default DetailsBanner