import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track hover state
  const cardRefs = useRef([]);
  const [sliderVisible, setSliderVisible] = useState(false);

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 1000;
      setIsMobile(mobileView);

      setSliderImages(
        mobileView
          ? ["/images/welcome-to-mobile.png", "/images/live-games-mobile.png", "/images/weekly-events-nft-mobile.png"]
          : ["/images/welcome-to.png", "/images/free-live-games-desk.png", "/images/weekly-events-nft-desk.png"]
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trigger hero slider fade-in
  useEffect(() => {
    const timer = setTimeout(() => setSliderVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Card fade-in with staggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0px)";
            entry.target.style.transitionDelay = `${index * 0.3}s`;
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  const cardBackgrounds = isMobile
    ? [
        "/images/mobile-card-background1.png",
        "/images/mobile-card-background2.png",
        "/images/mobile-card-background3.png",
      ]
    : [
        "/images/card-background1.png",
        "/images/card-background2.png",
        "/images/card-background3.png",
      ];

  const cardTexts = [
    { title: "Discover Games", description: "Dive into the latest games and earn while you play", button: "Explore Games", link: "/games" },
    { title: "Explore NFTs", description: "View your NFTs and Earnings", button: "NFTs", link: "/nfts" },
    { title: "Join the Community", description: "Level up your social life. Join our gaming community", button: "Community", link: "/community" },
  ];

  return (
    <div 
      style={{ 
        paddingTop: "100px", 
        paddingLeft: isMobile ? "0px" : "150px",
        margin: "0 auto", 
        maxWidth: isMobile ? "90vw" : "80vw" }}>
      {/* Hero Slider */}
      <div
        style={{
          width: "100%",
          margin: "0 auto",
          paddingTop: isMobile ? "10px" : "20px",
          overflow: "hidden",
          opacity: sliderVisible ? 1 : 0,
          transform: sliderVisible ? "translateY(0px)" : "translateY(20px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <Slider {...sliderSettings}>
          {sliderImages.map((image, index) => (
            <div key={index}>
              <div
                style={{
                  height: isMobile ? "400px" : "55vh",
                  width: "100%",
                  backgroundImage: `url('${image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "25px",
                }}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Cards Section */}
      <div
        style={{
          display: "flex",
          flexWrap: isMobile ? "nowrap" : "wrap",
          flexDirection: isMobile ? "column" : "row",
          gap: "20px",
          justifyContent: "center",
          marginTop: "40px",
          marginBottom: "40px"
        }}
      >
        {cardTexts.map((card, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              position: "relative",
              flex: isMobile ? "1 1 100%" : "1 1 300px",
              maxWidth: isMobile ? "100%" : "400px",
              height: "40vh",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
              padding: "20px",
              opacity: 0,
              transform: "translateY(40px)",
              transition: "opacity 2s ease, transform 2s ease",
            }}
          >
            {/* Background */}
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${cardBackgrounds[index]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "10px",
                filter: hoveredIndex === index ? "brightness(3)" : "brightness(1)",
                transition: "filter 0.3s ease",
                zIndex: 0,
              }}
            />
            {/* Overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: isMobile ? "rgba(0, 0, 0, 0.0)" : "rgba(0, 0, 0, 0.5)",
                borderRadius: "10px",
                zIndex: 1,
              }}
            />
            {/* Card Content */}
            <div
              style={{
                transform: isMobile ? "none" : hoveredIndex === index ? "scale(1.2)" : "scale(1)",
                transition: "transform 0.3s ease",
                zIndex: 2,
                textAlign: "center",

              }}
            >
              <h2 
                style={{ 
                  color: "white", 
                  marginBottom: isMobile ? "20px" : "30px", 
                }}
                >{card.title}</h2>
              <p
                style={{ 
                  color: "white", 
                  marginBottom: isMobile ? "20px" : "30px", 
                  paddingLeft: "40px",
                  paddingRight: "40px",
                }}
                >{card.description}</p>
              <Link to={card.link} style={{ textDecoration: "none" }}>
                <button
                  style={{
                    backgroundColor: "teal",
                    color: "white",
                    padding: isMobile ? "10px 20px" : "15px 30px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: isMobile ? "14px" : "16px",
                  }}
                >
                  {card.button}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
