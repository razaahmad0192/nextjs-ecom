'use client'
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { IoStar } from 'react-icons/io5';
import { BsChatQuote } from 'react-icons/bs';

const Testimonial = () => {
    const testimonials = [
        {
            name: "Ava Johnson",
            review: "The checkout flow was smooth, fast, and easy to understand.\nI found exactly what I needed without any confusion.\nThe overall shopping experience felt polished and reliable.",
            rating: 5,
        },
        {
            name: "Noah Smith",
            review: "Product pages loaded quickly and the details were clear.\nCustomer support answered my question in a helpful way.\nI would definitely shop here again for future purchases.",
            rating: 4,
        },
        {
            name: "Sophia Brown",
            review: "The design makes browsing products simple and enjoyable.\nImages looked great and the descriptions matched what I received.\nDelivery arrived on time and everything was well packed.",
            rating: 5,
        },
        {
            name: "Liam Wilson",
            review: "I liked how easy it was to compare different products.\nThe site felt responsive on both desktop and mobile.\nIt gave me confidence to place my order without hesitation.",
            rating: 4,
        },
        {
            name: "Olivia Taylor",
            review: "The product quality exceeded my expectations right away.\nThe store layout made it simple to find the right category.\nI had a very smooth experience from start to finish.",
            rating: 5,
        },
        {
            name: "Ethan Anderson",
            review: "Navigation was straightforward and the menus were intuitive.\nI appreciated how clearly the pricing and offers were shown.\nThis is one of the better shopping experiences I have had online.",
            rating: 4,
        },
        {
            name: "Mia Thomas",
            review: "The website feels modern, fast, and well organized.\nI could search for items quickly and filter results with ease.\nEverything from browsing to payment felt secure and professional.",
            rating: 5,
        },
        {
            name: "James Martin",
            review: "I received exactly what I ordered and the quality was excellent.\nThe cart and checkout steps were simple enough to follow instantly.\nI will recommend this store to friends and family.",
            rating: 5,
        },
        {
            name: "Charlotte Lee",
            review: "The product selection is strong and the categories are well grouped.\nI liked the clean interface and the helpful product information.\nIt made shopping feel easy instead of overwhelming.",
            rating: 4,
        },
        {
            name: "Benjamin Harris",
            review: "This store combines good visuals with a practical shopping flow.\nI could move through the site without lag or confusion.\nThe whole experience felt trustworthy and user friendly.",
            rating: 5,
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,


        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                    infinite: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                }
            }
        ]
    };
    return (
        <div className='lg:px-32 px-4 sm:py-10'>
            <h2 className='text-center sm:text-4xl text-2xl mb-5 font-semibold '>Customer Review</h2>
            <Slider {...settings}>
                {testimonials.map((item, index) => (
                    <div key={index} className='p-5 '>
                        <div className='border rounded-lg p-5'>
                            <BsChatQuote size={30} className='mb-3'/>
                            <p className="mb-5 text-sm">{item.review}</p>
                            <p className="font-semibold">{item.name}</p>
                            <div className="flex  mt-1">
                                {Array.from({ length: item.rating }).map((_, i) => (
                                    <IoStar key={`star${i}`} className="text-yellow-400" size={20} />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default Testimonial
