import React from 'react'

import { Link } from 'react-router-dom'

import Grid from './Grid'

import logo from '../assets/images/Logo-2.png'

const footerAboutLinks = [
    {
        display: "درباره ما",
        path: "/about"
    },
    {
        display: "تماس با ما",
        path: "/about"
    },
    {
        display: "ضوابط و مقررات",
        path: "/about"
    }
]

const footerCustomerLinks = [
    {
        display: "فروشگاه",
        path: "/about"
    },
    {
        display: "اکسسوری",
        path: "/about"
    },
    {
        display: "کفش مردانه",
        path: "/about"
    }
]
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <Grid
                    col={4}
                    mdCol={2}
                    smCol={1}
                    gap={10}
                >
                    <div>
                    <div className="footer__title">
                           
                           </div>
                        <div className="footer__content">
                            <p>
                                تماس :  <strong>0123456789</strong>
                            </p>
                            <p>
                                ایمیل :  <strong>info@example.ir</strong>
                            </p>
                            <p>
                               آدرس : <strong>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک و</strong>
                            </p>
                        </div>
                    </div>
                    <div>
                    <div className="footer__title">
                           
                           </div>
                        <div className="footer__content">
                            {
                                footerAboutLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                           
                        </div>
                        <div className="footer__content">
                            {
                                footerCustomerLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="footer__about">
                        <p>
                            <Link to="/">
                                <img src={logo} className="footer__logo" alt="" />
                            </Link>
                        </p>
                        <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوعلورم ایپسوم متن ساختگی با تولید  </p>
                    </div>
                </Grid>
            </div>
        </footer>
    )
}

export default Footer
