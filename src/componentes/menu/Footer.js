import React from 'react';
import { BsGithub, BsYoutube, BsFacebook, BsTwitter } from "react-icons/bs";
import { GiRaceCar } from "react-icons/gi";
import circuito from '../imagen/circuito.jpg';

const Footer = () => {
  return (
    <div className='navfoo' style={{ backgroundImage: `url(${circuito})`, boxShadow: "0px 5px 5px -2px black inset", transition: "5s" }} >
      <div align='center' className='p-3'>
        <a className='m-5 logo' ><BsFacebook style={{ fontSize: '40px', color: "white" }} /></a>
        <a className='m-5' ><BsGithub style={{ fontSize: '40px', color: "white" }} /></a>
        <a className='m-5' ><BsYoutube style={{ fontSize: '40px', color: "white" }} /></a>
        <a className='m-5' ><BsTwitter style={{ fontSize: '40px', color: "white" }} /></a>
      </div>

      <div className='text-center text-black p-3' style={{ backgroundColor: 'rgba(251, 251, 251, 0.5)' }}>
        <div className='marquee'>© 2023 <GiRaceCar style={{ fontSize: '40px', color: "black" }} /></div>
      </div>
    </div>
  )
}

export default Footer