import React from 'react'
import { useSelector } from 'react-redux'
import ContentWrapper from '../../../lib/contentWrapper/ContentWrapper';
import Avatar from '../../../../assets/img/avatar.png';
import Img from '../../../lib/lazyLoadImg/Img';

function Cast({ data, loading }) {
    const { imgUrls } = useSelector(state => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    }

    return (
        <div className='cast-section'>
            <ContentWrapper>
                <div className="section-heading">Top Cast</div>
                <div className="cast-members">
                    {
                        !loading ? (
                            data?.map((item) => {
                                let imgUrl = item.profile_path ? imgUrls.profile + item.profile_path : Avatar

                                return (
                                    <div className='cast-member' key={item.id}>
                                        <div className="profile-img">
                                            <Img src={imgUrl} />
                                        </div>

                                        <div className="name">{item.name}</div>
                                        <div className="character">{item.character}</div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className='cast-skeleton'>
                                {skeleton()}
                                {skeleton()}
                                {skeleton()}
                                {skeleton()}
                                {skeleton()}
                                {skeleton()}
                            </div>
                        )
                    }
                </div>
            </ContentWrapper>
        </div>
    )
}

export default Cast