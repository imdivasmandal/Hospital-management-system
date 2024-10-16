import React, {useId} from 'react'
import {img1, img2, img3, img4} from "../assets/index.js"
import {brainImg, cancerImg, heartImg, gastroImg } from "../assets/index.js"
import {  patient1,
          patient2,
          patient3,
          patient4, } from "../assets/index.js"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


function Home() {

  const slider = [img1, img2, img3];

  const patients = [
      {
        image:patient1,
        story: "Successful Treatment of Rectal Cancer | A Patient Patient's Story..."
      }, 
      {
        image:patient2,
        story: "Osteosarcoma: Overcoming Bone Cancer with Expertise | Patient Testimonial..."
      }, 
      {
        image:patient3,
        story: "Successful Treatment of Bone Cancer | Patient Success Story..." 
      },
      {
        image:patient4,
        story: "Beating Rectal Cancer at Narayana Hospital | A Patient's Story..."
      }
    ];
    const expertDoc = [
      {
        image: heartImg,
        title: "Cardiac Sciences",
        story: "We've been at the forefront of heart care for 24+ years, combining advanced technology with expert treatment to deliver the best outcomes."
      }, 
      {
        image: cancerImg,
        title: "Cancer Care",
        story: "We excel in cancer care leveraging cutting-edge methods & expertise to offer comprehensive treatment across all oncology specialties."
      }, 
      {
        image: brainImg,
        title: "Neuro Sciences",
        story: "We offer specialised care for a wide range of neurological disorders in adults & children and are equipped with advanced technologies." 
      },
      {
        image:gastroImg,
        title: "Gastro Sciences",
        story: "We're one of the leading gastroenterology hospitals in India, specialising in treating digestive & liver-related diseases in adults & kids."
      }
    ];  

  const id = useId()

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
    <div className=''>

      <div className='mb-8 mt-7'>
          <Slider {...settings} cl>
            {slider.map((item) => ( 
              <div key={id}><img src={item} alt='preview'/></div>
            ))}
          </Slider>
      </div>


      <div className="text-3xl flex justify-center md:text-5xl font-bold">
        Message From Our Chairman
      </div>


      <div className="mt-5 md:mt-20 max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row">
        <div className="w-full order-2 md:order-1 md:w-1/2 ">
          <div>
            <h1 className="text-xl md:text-4xl pb-7 font-bold">
              Hello, welcomes here to{" "}
              <span className="text-blue-600">online Hospital services!!!</span>
            </h1>
            <p className="text-sm font-medium md:text-xl mt-3 bold">
              Back in the day, we realised that just as innovation in medical science is elementary to the growth of healthcare, we need to bring innovation in how we take quality healthcare to everyone.
            </p>
            <p className="text-sm font-medium md:text-xl mt-3">
            We realised that it is not merely a transaction of health services between a patient and doctor. It is trust that fosters a healthy relationship in the journey of health.
            </p>
            <p className="text-sm font-medium md:text-xl mt-3">
            As we move with the times, we realise that technology has a huge role in making our services way more efficient. And by its application, way more human as well.
            </p>
            <p className="text-sm font-medium md:text-xl mt-3">
            We have a dream. Our dream is to be available to you round the clock, wherever you are and whenever you want. We want to be just one tap away from you, and this will be the beginning of consumer-centric healthcare.
            </p>
          </div>
      </div>
        <div className="flex justify-center order-1 w-full mt-4 pb-5 md:w-1/2">
          <img 
            src={img4}           
            className="h-96 rounded-xl md:w-[550px] md:h-[560px] md:ml-12"
            alt="doctor"
          />
        </div>
      </div>


      <div className="text-xl mt-5 flex justify-center md:text-3xl font-bold">
        Take Care
      </div>
      
      <div className="text-2xl mt-2 flex justify-center md:text-3xl font-bold">
          Dr. Devi Prasad Shetty
      </div>

      <div className="text-xl mt-2 flex justify-center md:text-xl font-bold">
      Founder and Chairman
      </div>


      <div className='bg-gray-300 border-y-2 border-y-black border-opacity-15 mt-10 pb-5 pt-5 flex flex-wrap justify-center content-center'>
        <div className="text-3xl mt-5 flex justify-center md:text-4xl font-bold ">Expert Care Nationwide</div>
        <p className='text-center p-3 mt-2 md:px-9'>Our expert doctors provide specialized care across 21 hospitals nationwide, covering 110+ specialties such as cardiac sciences, cancer care, orthopaedics, neurology, gastroenterology, liver and kidney transplants etc.</p>

            {expertDoc.map((doc) => (
              <div className="card bg-white image-full w-72 h-72 m-4 shadow-xl">
                <figure>
                  <img
                    className='rounded-md'
                    src={doc.image}
                    alt="images" />
                </figure>
                <div className="card-body">
                <h2 className="card-title">{doc.title}</h2>
                  <p className='mt-10'>{doc.story}</p>
                </div>
              </div>
            ))}
      </div>

      <div className='flex flex-wrap pb-7 justify-center content-center bg-gray-100'>
          <div className="text-3xl mt-5 flex justify-center md:text-4xl font-bold ">Healthcare Insights</div>
          <p className='text-center p-3 mt-2 md:px-9'>Read about Narayana Health's success stories, stay informed with the latest news and media updates, and explore informative blogs from our experts.</p>


          {patients.map((patient) => (
            <div className="card bg-base-100 w-72 m-4 shadow-xl">
            <figure>
              <img
                className='rounded-md'
                src={patient.image}
                alt="Shoes" />
            </figure>
            <div className="card-body">
              <p className='font-medium '>{patient.story}</p>
            </div>
          </div>
          ))}
      </div>

    </div>
  )
}

export default Home;