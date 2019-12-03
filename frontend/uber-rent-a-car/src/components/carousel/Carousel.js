import React, { Component } from 'react';
import Slider from "react-slick";
import './Carousel.css'
import Car from '../../assets/images/car.png';
import Motorcycle from '../../assets/images/moto1.png';

export default class Carousel extends Component {
    render() {
        var settings = {
            autoplaySpeed: 5000,
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            centerMode: true,
        };


        return (
            <div className="container-uber">
                <Slider className="slider-uber" {...settings}>
                    <div className="car-container">
                        <img alt="Car" src={Car} className="car-image"/>
                        <h2 className="uber-h1">Rent now, <span>  just a few clicks.</span></h2>
                    </div>
                    <div className="car-container"> 
                        <img alt="Motorcycle" src={Motorcycle} className="motorcycle-image"/>
                        <h2 className="uber-h1">You are agile, <span>we are too.</span></h2>
                    </div>
                </Slider>
            </div>
        );
    }
}
