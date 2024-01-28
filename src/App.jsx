import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/home/Home'
import { fetchDataFromApi } from './components/utils/api';
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
import Details from './components/pages/details/Details'
import './assets/css/styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration, getGenres } from './slices/homeSlice';

function App() {
  const [data, setData] = useState('');
  const { imgUrls, genres } = useSelector(state => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
    fetchGenres();
  }, [])

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
      .then(resp => {
        const urls = {
          backdrop: resp.images.secure_base_url + "original",
          poster: resp.images.secure_base_url + "original",
          profile: resp.images.secure_base_url + "original"
        }
        dispatch(getApiConfiguration(urls));
      })
  }

  const fetchGenres = async () => {
    const endpoints = ['tv', 'movie'];
    const promises = [];
    const allGenres = {};

    endpoints.forEach(url => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    })

    const data = await Promise.all(promises);

    data.map(({genres}) => {
      return genres.map(item => allGenres[item.id] = item);
    })

    dispatch(getGenres(allGenres));
  }

  return (
    <div className='app'>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/:type/:id' element={<Details />} />
      </Routes>

      {/* <Footer /> */}

    </div>
  )
}

export default App