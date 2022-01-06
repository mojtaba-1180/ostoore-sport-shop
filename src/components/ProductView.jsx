import { useState, useEffect, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router'

import { useDispatch } from 'react-redux'

import { addItem } from '../redux/shopping-cart/cartItemsSlide'
import { remove } from '../redux/product-modal/productModalSlice'

import Button from './Button'
import numberWithCommas from '../utils/numberWithCommas'
import Api from '../utils/AxiosConfig'
const ProductView = props => {
    const dispatch = useDispatch()
    const [product, setproduct] = useState({
        name: "",
        basePrice: '',
        images: null,
        categorySlug: "",
        slug: "",
        size: [],
        description: ""
    })
    const [Size , setSize ] = useState([])
    useLayoutEffect(() => {
        props.product?.map(item => {
            setproduct(item)
        })
        console.log(props.product)
        return () => {
            setproduct({})
        };
    }, [props.product])
    useEffect(() => {
        Api.get('/size')
        .then(res => { 
            const data = res.result.filter(item => product.size.includes(item._id))
            // console.log({size: data})
            setSize(data)
        })
            .catch(err => {
            console.log(err)
        })
    },[product])

    const [previewImg, setPreviewImg] = useState(product.images ? product.images[0].url : '')

    const [descriptionExpand, setDescriptionExpand] = useState(false)

    const [selectedSize, setSelectedSize] = useState(undefined)

    const [quantity, setQuantity] = useState(1)

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }
    useEffect(() => {
        setPreviewImg(product.images ? product.images[0].url : '')
        setQuantity(1)
        setSize(undefined)
    }, [product])

    const check = () => {
        if (selectedSize === undefined) {
            alert('لطفا سایز انتخاب کنید')
            return false
        }
        return true
    }

    const addToCart = () => {
        if (check()) {
            let newItem = {
                slug: product?._id,
                size: selectedSize,
                price: product?.basePrice,
                quantity: quantity
            }
            if (dispatch(addItem(newItem))) {
                alert('  به سبد خرید اضافه شد ')
            } else {
                alert(' مشکل')
            }
        }
    }

    const goToCart = () => {
        if (check()) {
            let newItem = {
                slug: product?._id,
                size: selectedSize,
                price: product?.basePrice,
                quantity: quantity
            }
            if (dispatch(addItem(newItem))) {
                dispatch(remove())
                props.history.push('/cart')
            } else {
                alert('مشکل')
            }
        }
    }
    return (
        <div className="product">
            <div className="product__images">
                <div className="product__images__list">
                    {
                        product.images?.map(item => (
                            <div className="product__images__list__item" onClick={() => setPreviewImg(item.url)}>
                                <img src={item.url ? item.url : ''} alt="" />
                            </div>
                        ))
                    }
                </div>
                <div className="product__images__main">
                    <img src={previewImg} alt="" />
                </div>
                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">
                        توضیحات تکیملی 
                    </div>
                    <hr style={{marginBottom: '10px'}} />
                    <div className="product-description__content" dangerouslySetInnerHTML={{ __html: product?.description }}></div>
                    <div className="product-description__toggle">
                        <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                            {
                                descriptionExpand ? 'بیشتر' : 'کمتر'
                            }
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">{product?.name}</h1>
                <div className="product__info__item">
                    <span className="product__info__item__price">
                         قیمت : 
                        {numberWithCommas(product.basePrice ? product.basePrice : "0")}
                         تومان
                    </span>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        توضیحات
                    </div>
                    <div className="product__info__item__list">
                    <div className="product-abstract__content" dangerouslySetInnerHTML={{ __html: product?.abstract }}></div>
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        سایز
                    </div>
                    <div className="product__info__item__list">
                        {
                            Size?.map((item, index) => (
                                <div key={index} className={`product__info__item__list__item ${selectedSize === item._id ? 'active' : ''}`} onClick={() => setSelectedSize(item._id)}>
                                    <span className="product__info__item__list__item__size">
                                        {item.name}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        تعداد
                    </div>
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('minus')}>
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className="product__info__item__quantity__input">
                            {quantity}
                        </div>
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('plus')}>
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                </div>
                <div className="product__info__item">
                    <Button onClick={() => addToCart()}> افزودن به سبد خرید </Button>
                    <Button onClick={() => goToCart()}> سبد خرید </Button>
                </div>
            </div>
            <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                <div className="product-description__title">
                     توضیحات 
                </div>
                <div className="product-description__content" dangerouslySetInnerHTML={{ __html: product.description }}></div>
                <div className="product-description__toggle">
                    <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                        {
                            descriptionExpand ? 'بیشتر ' : 'کمتر '
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

ProductView.propTypes = {
    product: PropTypes.any
}

export default withRouter(ProductView)
