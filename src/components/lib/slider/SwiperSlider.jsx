import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import PosterFallback from '../../../assets/img/no-poster.png';
import CircleRating from '../circleRating/CircleRating';
import Genres from '../../pages/home/genres/Genres';
import Img from '../lazyLoadImg/Img';


function SwiperSlider({ data, loading, endpoint }) {
    const { imgUrls } = useSelector(state => state.home);
    const navigate = useNavigate();

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton">
                    <div className="textBlock">
                        <div className="title skeleton"></div>
                        <div className="date skeleton"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            spaceBetween={20}
            slidesPerView={2.5}
            slidesPerGroup={3}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            // scrollbar={{draggable: true}}
            navigation={{
                prevEl: '.swiper-btn-prev',
                nextEl: '.swiper-btn-next',
            }}
            breakpoints={{
                375: {
                    slidesPerView: 2.5,
                    slidesPerGroup: 2
                },
                500: {
                    slidesPerView: 3.5,
                    slidesPerGroup: 3
                },
                690: {
                    slidesPerView: 4.5,
                    slidesPerGroup: 4
                },
                768: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    // spaceBetween: 30
                },
                1024: {
                    slidesPerView: 5,
                    slidesPerGroup: 5
                    // spaceBetween: 60
                }
            }}

        >
            {
                !loading > 0 ? (
                    data?.map(item => {
                        const itemPosterUrl = item.poster_path ?
                            imgUrls?.poster + item.poster_path : PosterFallback

                        return (
                            <SwiperSlide key={item.id}>
                                <div
                                    className='slider-item'
                                    onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}
                                >
                                    <div className="poster-block">
                                        <Img src={itemPosterUrl} />
                                        <CircleRating rating={item.vote_average.toFixed(1)} />
                                        <Genres data={item.genre_ids.slice(0, 2)} />
                                    </div>
                                    <div className='item-text'>
                                        <span className='item-title'>
                                            {item.name || item.title}
                                        </span>
                                        <span className='item-date'>
                                            {dayjs(item.release_date).format("MMM D, YYYY")}
                                        </span>
                                    </div>
                                </div>

                            </SwiperSlide>
                        )
                    })
                ) : (
                    <>
                        {
                            [1, 2, 3, 4, 5].map(index => (
                                <SwiperSlide key={index}>{skItem()}</SwiperSlide>
                            ))
                        }
                    </>
                )
            }

            <div className='swiper-btn-prev'>
                <button>
                    <BsArrowLeft />
                </button>
            </div>
            <div className='swiper-btn-next'>
                <button>
                    <BsArrowRight />
                </button>
            </div>
        </Swiper>
    )
}

export default SwiperSlider