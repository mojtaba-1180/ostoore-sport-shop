import { Swiper  } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';
import 'swiper/components/navigation/navigation.min.css';
import SwiperCore, {
    Navigation,Pagination
  } from 'swiper';
  
  // install Swiper modules
  SwiperCore.use([Navigation,Pagination]);


const Carousel = props => {
    const carouselResponsive = {
        "1280": {
            slidesPerView: props.itemsNumber? props.itemsNumber : 4,
            spaceBetween: 28,
        },
        "768": {
            slidesPerView: props.itemTablet? props.itemTablet : 3,
            spaceBetween: 24,
        },
        "380": {
            slidesPerView: props.itemMobile? props.itemMobile : 1,
            spaceBetween: 20,
        },
        "0": {
            slidesPerView: 1,
            spaceBetween: 12,
        },
    };
    return (
                    <Swiper
                    navigation={true}
                    mousewheel={props.mousewheel}
                    centeredSlides={false} autoplay={true}
                    direction={props.direction? props.direction : 'horizontal'}
                    spaceBetween={props.space ? props.space : 50}
                    slidesPerView={props.itemsNumber? props.itemsNumber : 4}
                    pagination={true}
                    breakpoints={carouselResponsive}
                    // onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}

                >
                    {props.children}
                   
                </Swiper>
    )
}

export default Carousel
