import React, { useEffect, useState } from 'react'
import { HiBars3 } from "react-icons/hi2";
import { IoMdSearch, IoMdClose } from 'react-icons/io'
import logo from '../../../assets/img/movix-logo.svg'
import ContentWrapper from '../../lib/contentWrapper/ContentWrapper';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [show, setShow] = useState("top");
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])

  useEffect(() => {
    window.addEventListener('scroll', controlHeader)
    return () => {
      window.removeEventListener('scroll', controlHeader)
    }
  }, [window.scrollY])

  const controlHeader = () => {
    // console.log("window.scrollY", window.scrollY)
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow('hide')
      } else {
        setShow('show')
      }
    } else {
      setShow('top')
    }
    setLastScrollY(window.scrollY)
    // console.log("lastScrollY", lastScrollY)
  }

  const openMobileMenu = () => {
    setMobileMenu(true)
    setShowSearch(false)
  }

  const openSearch = () => {
    setMobileMenu(false)
    setShowSearch(true)
  }

  return (
    <header className={`header ${mobileMenu ? 'mobile-menu__view' : ''} ${show}`}>
      <ContentWrapper>
        <nav>
          <div className='logo'>
            <Link to='/'>
              <img src={logo} alt="" />
            </Link>
          </div>

          <div className='mobile-header__right'>
            <IoMdSearch onClick={openSearch} />
            {!mobileMenu ? <HiBars3 onClick={openMobileMenu} /> : <IoMdClose onClick={() => setMobileMenu(false)} />}
          </div>

          <div className='desktop-header__right'>
            <span>Movies</span>
            <span>TV Shows</span>
            <IoMdSearch onClick={() => openSearch()} />
          </div>
        </nav>
        {
          mobileMenu && (
            <ul className='mobile-menu'>
              <li
                className='menu-item'
                onClick={() => setMobileMenu(false)}
              >
                Movies
              </li>
              <li
                className='menu-item'
                onClick={() => setMobileMenu(false)}
              >
                TV Shows
              </li>
            </ul>
          )
        }
        {
          showSearch && (
            <div className='search-bar'>
              <ContentWrapper>
                <div className="search-input">
                  <input
                    type="text"
                    placeholder='Search for a movie or a TV show...'
                  />
                  <IoMdClose onClick={() => setShowSearch(false)} />
                </div>
              </ContentWrapper>
            </div>
          )
        }
      </ContentWrapper>
    </header>
  )
}

export default Header