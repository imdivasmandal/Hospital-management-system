import React, {useId} from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { about, about1, about2, about3 } from '../assets/index.js';

function AboutUs() {
  const id = useId();
  const slider = [ about1, about2, about3 ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    speed: 1000,
    autoplaySpeed: 4000,
    cssEase: "linear"
  };

  return (
    <div >
      <div className='mb-8 mt-7 w-svw '>
          <Slider {...settings}>
            {slider.map((item) => ( 
              <div key={id}><img src={item} alt='preview'/></div>
            ))}
          </Slider>
      </div>
      
      <div className="md:mt-7 mb-10 max-w-screen-2xl  container  flex flex-col md:flex-row">
          <div className="w-full order-2 md:order-1 md:w-1/2 ">
            <div className='mt-28 px-20'>
              <h1 className="text-xl md:text-4xl pb-2 font-bold">
                Our Mission{" "}
              </h1>
                <span className="text-black-600 mx-1">To make healthcare accessible to all.</span>
            </div>
          </div>
        <div className="flex justify-end order-1 w-full md:w-1/2">
          <img 
            src={about}           
            className="h-76  md:w-[650px] md:h-[350px]"
            alt="doctor"
          />
        </div>
      </div>
    </div>
  )
}

export default AboutUs;