import React from 'react'
import Herobg from '../images/hero-bg-Photoroom.png'

const Section1 = () => {
    return (
        <div>
            <div className="main w-full bg-[#000] text-[#aaa]">
                <nav className="fixed bg-[#ddd] w-90 mx-225 translate-x-0/50 flex">
                    <div className="logo">
                        <h1>VB</h1>
                    </div>
                    <ul className="flex">
                        <li><a href="">Home</a></li>
                        <li><a href="">About M</a></li>
                        <li><a href="">Contact</a></li>
                    </ul>
                    <div className="button">Hire me</div>
                </nav>
                <div className="hero-section">
                    <img src={Herobg} className="bg-center w-full" alt="" />
                    <div className="hero-content">
                        <h1>Vinit Bhatnagar</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea error a labore placeat quasi rem iusto quis. Totam, autem consectetur?</p>
                        <button>Hire Me</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section1
