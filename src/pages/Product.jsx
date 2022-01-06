import { useLayoutEffect,useEffect, useState } from 'react'

import Helmet from '../components/Helmet'
import Section, { SectionBody, SectionTitle } from '../components/Section'
import ProductCard from '../components/ProductCard'
import ProductView from '../components/ProductView'
import API from '../utils/AxiosConfig'
import {  SwiperSlide  } from 'swiper/react';
import Carousel from '../components/Carousel'

const Product = props => {
    const [productData, setProductData] = useState([])
    const [productDataAll, setProductDataAll] = useState([])
    useLayoutEffect(() => {
        API.get(`/product`).then(res => {
            // console.log(res.result.filter(item => item._id === props.match.params.slug))
            setProductData(res.result.filter(item => item._id === props.match.params.slug))
            setProductDataAll(res.result)
        }).catch(err => {
            console.log(err)
        })
        return () => {
            setProductData(null)
        };
    }, [])
    const relatedProducts = productDataAll?.slice(0, 5)
    useEffect(() => {
        window.scrollTo(0,0)
    }, [productData])
    console.log({productData})
    return (
        <Helmet title={productData.length >= 1 ? productData[0].name : 'محصول'}  >
            <Section>
                <SectionBody>
                    <ProductView product={productData}/>
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>
                    محصولات مشابه
                </SectionTitle>
                <SectionBody>
                    <Carousel itemsNumber={6} space={20}  itemTablet={3.3} itemMobile={2.3} >
                    {
                            relatedProducts?.map((item, index) => (
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
        </Helmet>
    )
}

export default Product
