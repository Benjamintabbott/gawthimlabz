import React, { useState, useEffect } from "react";

const Community = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const links = [
    {
      platform: "Telegram",
      icon: "/images/telegram-logo.png",
      url: "https://t.me/baptman_community",
    },
    {
      platform: "X",
      icon: "/images/x-logo.png",
      url: "https://twitter.com/gawthimlabz",
    },
    {
      platform: "Medium",
      icon: "/images/medium-logo.png",
      url: "https://medium.com/@gawthimlabz",
    },
  ];

  return (
    <div
      style={{
        margin: isMobile ? "100px 20px" : "100px 200px",
        boxSizing: "border-box",
        maxWidth: isMobile ? "90vw" : "80vw",
      }}
    >
      {/* Title Section */}
      <h1 style={{ 
        marginBottom: "20px"
        }}>
      Join Our Community
      </h1>
      <p style={{ marginBottom: "30px", fontSize: "18px" }}>
        Connect with us through your favorite platform. We’re excited to have
        you join our growing community!
      </p>

      {/* Links Section */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "column",
          gap: "20px",
          justifyContent: isMobile ? "flex-start" : "center",
          alignItems: "center",
          marginTop: isMobile ? "50px" : "75px",
        }}
      >
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: isMobile ? "10px 30px" : "15px 50px",
              minWidth: isMobile ? "60vw" : "40vw",
              textDecoration: "none",
              color: "#fff",
              borderStyle: "solid",
              borderWidth: "1px",
              borderRadius: "15px",
              fontSize: "18px",
              fontWeight: "bold",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "rgb(0, 225, 255)", e.target.style.color = "black")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "rgba(255, 0, 0, 0)", e.target.style.color = "white")
            }
          >
            <img
              src={link.icon}
              alt={`${link.platform} logo`}
              style={{ 
                width: "50px", 
                height: "50px", 
                marginRight: "40px", 
                marginLeft: isMobile ? "30px" : "60px"
              }}
            />
            {link.platform}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Community;
