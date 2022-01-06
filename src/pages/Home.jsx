import { Link } from 'react-router-dom'
import { useState, useLayoutEffect } from 'react'
import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import PolicyCard from '../components/PolicyCard'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
// import heroSliderData from '../assets/fake-data/hero-slider'
import policy from '../assets/fake-data/policy'
// import productData from '../assets/fake-data/products'
import API from '../utils/AxiosConfig'
import banner from '../assets/images/banner.jpg'
// import { createSlice } from '@reduxjs/toolkit'
import { SwiperSlide } from 'swiper/react';
import Carousel from '../components/Carousel'
import PageLoader from '../components/PageLoader'
const Home = () => {
    const [ProductsNew, setProductsNew] = useState(null)
    const [Category, setCategory] = useState(null)
    const [Loader, setLoader] = useState(true)
    useLayoutEffect(() => {
        API.get('/product').then(res => {
            console.log(res)
            setProductsNew(res.result)
        }).catch(err => {
            console.log(err)
        })
        return () => {
            setProductsNew(null)
        };
    }, [])
    useLayoutEffect(() => {
        setTimeout(() => {
            API.get('/category').then(res => {
                console.log(res)
                setCategory(res.result)
            }).catch(err => {
                console.log(err)
            })
        }, 1000)
        return () => {
            setCategory(null)
        };
    }, [])

    // useLayoutEffect(() => {
    //     setTimeout(() => {
    //         setLoader(false)
    //     }, 3000)
    // }, [])
    return (
        <>
          
                 {/* <PageLoader loader={Loader} /> */}
          
            <Helmet title="صفحه اصلی">
                {/* hero slider */}
                <HeroSlider
                    dataCategory={Category}
                    control={true}
                    auto={false}
                    timeOut={5000}
                />
                {/* end hero slider */}

                {/* best selling section */}
                <Section>
                    <SectionTitle color="red">
                        <img src='/assets/images/section/tshirt.png' />
                        محصولات جدید
                    </SectionTitle>
                    <SectionBody>
                        <Carousel itemsNumber={5} space={20} itemTablet={3.3} itemMobile={2.3} >
                            {
                                ProductsNew?.map((item, index) => (
                                    <SwiperSlide>
                                        <ProductCard
                                            key={index}
                                            img01={item.images[0]?.url}
                                            img02={item.images[1]?.url}
                                            name={item.name}
                                            price={Number(item.basePrice)}
                                            slug={item._id}
                                        />
                                    </SwiperSlide>
                                ))
                            }
                        </Carousel>
                    </SectionBody>
                </Section>
                {/* end best selling section */}
                {/* new arrival section */}
                <Section>
                    <SectionTitle color="purple">
                        <img src='/assets/images/section/boat.png' />

                        کفش ورزشی
                    </SectionTitle>
                    <SectionBody>
                        <Carousel itemsNumber={5} itemTablet={3.3} itemMobile={2.3} space={20} >
                            {
                                ProductsNew?.map((item, index) => (
                                    <SwiperSlide>
                                        <ProductCard
                                            key={index}
                                            img01={item.images[0]?.url}
                                            img02={item.images[1]?.url}
                                            name={item.name}
                                            price={Number(item.basePrice)}
                                            slug={item._id}
                                        />
                                    </SwiperSlide>
                                ))
                            }
                        </Carousel>
                    </SectionBody>
                </Section>
                {/* end new arrival section */}

                {/* banner */}
                <Section>
                    <SectionBody>
                        <Link to="/catalog">
                            <div className='banner'>
                                <img src={banner} alt="" />
                            </div>
                        </Link>
                    </SectionBody>
                </Section>
                {/* end banner */}

                {/* popular product section */}
                <Section>
                    <SectionTitle color="aqua">
                        <img src='/assets/images/section/ball.png' />
                        اکسسوری ورزشی
                    </SectionTitle>
                    <SectionBody>
                        {/* <Grid
                        col={5}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                           ProductsNew?.slice(0,3).map((item, index) => (
                            <ProductCard
                                key={index}
                                img01={item.images[0].url}
                                img02={item.images[1]?.url}
                                name={item.name}
                                price={Number(item.basePrice)}
                                slug={item.slug}
                            />
                        ))
                        }
                    </Grid> */}
                        <Carousel itemsNumber={5} space={10} itemTablet={3.3} itemMobile={2.3} >
                            {
                                ProductsNew?.map((item, index) => (
                                    <SwiperSlide>
                                        <ProductCard
                                            key={index}
                                            img01={item.images[0]?.url}
                                            img02={item.images[1]?.url}
                                            name={item.name}
                                            price={Number(item.basePrice)}
                                            slug={item._id}
                                        />
                                    </SwiperSlide>
                                ))
                            }
                        </Carousel>
                    </SectionBody>
                </Section>
                {/* end popular product section */}
                {/* policy section */}
                <Section>
                    <SectionBody>
                        <Grid
                            col={4}
                            mdCol={2}
                            smCol={1}
                            gap={20}
                        >
                            {
                                policy.map((item, index) => <Link key={index} to="/policy">
                                    <PolicyCard
                                        name={item.name}
                                        description={item.description}
                                        icon={item.icon}
                                    />
                                </Link>)
                            }
                        </Grid>
                    </SectionBody>
                </Section>
                {/* end policy section */}
            </Helmet>
        </>

    )
}

export default Home
