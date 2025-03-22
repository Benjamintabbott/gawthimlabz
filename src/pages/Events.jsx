import React, { useState, useEffect } from "react";

const Events = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const events = [
    {
      title: "Daily Trivia",
      date: "Daily at 3PM EST",
      description: "Same time. Every day. Play and win USDT instantly!",
    },
    {
      title: "Weekly NFT Holder Trivia",
      date: "Every Thursday at 10AM EST",
      description: "Play for BIGGER prizes every week!",
    },
  ];

  return (
    <div
      style={{
        margin: isMobile ? "100px 20px" : "100px 200px",
        boxSizing: "border-box",
        maxWidth: "100vw",
      }}
    >
      {/* Title Section */}
      <h1 style={{ marginBottom: "50px" }}>Upcoming Events</h1>

      {/* Events List */}
      <div>
        {events.map((event, index) => (
          <div
            key={index}
            style={{
              marginBottom: "30px",
              padding: "20px",
              border: "1px solid white",
              borderRadius: "15px",
              backgroundColor: isMobile ? "rgba(0,0,0,0)" : "rgba(0,0,0,0)",
            }}
          >
            <h2 style={{ marginBottom: "10px", color: "teal" }}>{event.title}</h2>
            <p style={{ marginBottom: "10px", fontWeight: "bold" }}>
              Date: {event.date}
            </p>
            <p style={{ marginBottom: 0 }}>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
