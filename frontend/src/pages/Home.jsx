import React from 'react'
import Header from '../components/Header'
import Speciality from '../components/Speciality'
import TpDoctors from '../components/TpDoctors'
import Banner from '../components/Banner'

export const Home = () => {
    return (
        <div>
          <Header/>
          <Speciality/>
          <TpDoctors/>
          <Banner/>
        </div>
    )
}
export default Home 