import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { createSlice } from '@reduxjs/toolkit'
import {  SwiperSlide  } from 'swiper/react';
import Carousel from '../components/Carousel'
const HeroSlider = props => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const item = [
        {
            item: "/assets/images/banner.jpg",
            color: "bg-green-800",
            title: "روز گذشته",
        },
        {
            item: "/assets/images/banner-2.jpg",
            color: "bg-green-600",
            title: "هفته گذشته",
        },
        {
            item: "/assets/images/banner-3.jpg",
            color: "bg-green-200",
            title: "ماه گذشته",
        },
    ];


    const [imageIndex, setImageIndex] = useState(0);

    return (
        <div className="hero-slider">
            <div className='hero-slider_category desktop' >
                {props.dataCategory ? (
                     <Carousel itemsNumber={4.3} direction={'vertical'} mousewheel={true}  itemTablet={2.3} itemMobile={1.4} space={10} >
                     {
                         props.dataCategory?.map((items, index) => (
                             <SwiperSlide key={index} >
                                 <div className='hero-slider_category_content' >
                                     <div className='hero-slider_category_content_item image'> <img src={items.images[0]?.url} alt="" /></div>
                                     <div className='hero-slider_category_content_item title'> {items.name} </div>
                                     <div className='hero-slider_category_content_item number'><span> {items.number ? items.number : 12}</span> <i class='bx bx-chevron-left'></i></div>
                                 </div>
                             </SwiperSlide>
                         ))
                     }
                 </Carousel>
                )
                    : (
                        <>
                            <div className='loader'>
                                درحال بارگزاری ...
                            </div>
                        </>
                    )
                }
            </div>
            {/* <div className='hero-slider_category tablet' >
                {props.dataCategory ? (
                    <Carousel itemsNumber={6} itemTablet={2.3} itemMobile={1.4} space={20} >
                        {
                            props.dataCategory?.map((items, index) => (
                                <SwiperSlide key={index} >
                                    <div className='hero-slider_category_content' >
                                        <div className='hero-slider_category_content_item image'> <img src={items.images[0]?.url} alt="" /></div>
                                        <div className='hero-slider_category_content_item title'> {items.name} </div>
                                        <div className='hero-slider_category_content_item number'><span> {items.number ? items.number : 12}</span> <i class='bx bx-chevron-left'></i></div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Carousel>
                )
                    : (
                        <>
                            <div>
                                درحال بارگزاری ...
                            </div>
                        </>
                    )
                }
            </div> */}
            <div className='sliders' >
                <Slider {...settings}>
                    {item.map((item, index) => (

                        <div
                            key={index}
                            className={
                                index === imageIndex
                                    ? "slide activeSlide " + item.color
                                    : "slide " + item.color
                            }
                        >
                            <img src={item.item} width="100" height="100" />
                        </div>
                    ))}
                </Slider>
            </div>

        </div>
    )
}

HeroSlider.propTypes = {
    dataCategory: PropTypes.array.isRequired,
    control: PropTypes.bool,
    auto: PropTypes.bool,
    timeOut: PropTypes.number
}

export default HeroSlider
