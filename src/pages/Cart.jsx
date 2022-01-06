import React, {useLayoutEffect, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import API from '../utils/AxiosConfig'
import Helmet from '../components/Helmet'
import CartItem from '../components/CartItem'
import Button from '../components/Button'


import numberWithCommas from '../utils/numberWithCommas'

const Cart = () => {

    const [CartproductData, setCartProductData] = useState(null)
    const cartItems = useSelector((state) => state.cartItems.value)
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [Size , setSize ] = useState([])

    useLayoutEffect(() => {
        API.get(`/product`).then(res => {
           setCartProductData(res.result.filter(item => cartItems.map(citem => citem.slug ).includes(item._id)))
        }).catch(err => {
            console.log(err)
        })
        return () => {
            // setProductData(null)
        };
    }, [])
    useEffect(() => {
        // setCartProducts(productData.getCartItemsInfo(cartItems))
        // setTotalPrice(cartItems.reduce((total, item) => total + (Number(item.quantity) * Number(item.price)), 0))
        // setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))
    }, [cartItems])
    useEffect(() => {
        API.get('/size')
        .then(res => { 
            const data = res.result.filter(item => cartItems.map(citem => citem.size ).includes(item._id))
            // console.log({size: data})
            setSize(data)
        })
            .catch(err => {
            console.log(err)
        })
    },[cartItems])
    return (
        <Helmet title="سبد خرید">
            <div className="cart">
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>
                           تعداد محصولات  {totalProducts}
                        </p>
                        <div className="cart__info__txt__price">
                            <span>مجموع مبلغ :</span> <span>{numberWithCommas(Number(totalPrice))}</span>
                        </div>
                    </div>
                    <div className="cart__info__btn">
                        <Button size="block">
                            تصفیه حساب
                        </Button>
                        <Link to="/">
                            <Button size="block">
                                فروشگاه
                            </Button>
                        </Link>
                        
                    </div>
                </div>
                {/* {
                    console.log(Size)
                } */}
                <div className="cart__list">
                    {
                        CartproductData?.map((item, index) => (
                            <CartItem product={item} cart={CartItem} size={Size} key={index}/>
                        ))
                    }
                </div>
            </div>
        </Helmet>
    )
}

export default Cart
