import React from 'react'
import { useSelector } from 'react-redux'

function Genres({ data }) {
    const { genres } = useSelector(state => state.home);

    return (
        <div className='item-genres'>
            {
                data?.map(i => {
                    if (!genres[i]?.name) return;
                    return (
                        <div className="genre" key={i} >
                            {genres[i]?.name}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Genres