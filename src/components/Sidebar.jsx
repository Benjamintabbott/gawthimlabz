import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

// Define the images for each menu item
const menuImages = {
  home: {
    default: "/images/home-icon.png",
    active: "/images/home-icon-chosen.png",
  },
  games: {
    default: "/images/games-icon.png",
    active: "/images/games-icon-chosen.png",
  },
  nfts: {
    default: "/images/nfts-icon.png",
    active: "/images/nfts-icon-chosen.png",
  },
  events: {
    default: "/images/events-icon.png",
    active: "/images/events-icon-chosen.png",
  },
  community: {
    default: "/images/community-icon.png",
    active: "/images/community-icon-chosen.png",
  },
  account: {
    default: "/images/account-icon.png",
    active: "/images/account-icon-chosen.png",
  },
};

const SidebarContainer = styled.nav`
  width: ${({ isMobile }) => (isMobile ? "100%" : "150px")};
  height: ${({ isMobile }) => (isMobile ? "100px" : "100%")};
  background-color: #060606;
  color: white;
  padding: 10px;
  border-right: ${({ isMobile }) => (isMobile ? "none" : "1px solid teal")};
  box-sizing: border-box;
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? "row" : "column")};
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: hidden;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 10px;
  margin: 0;
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? "row" : "column")};
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

const MenuItem = styled.li`
  margin: ${({ isMobile }) => (isMobile ? "0" : "10px 0")};
  text-align: center;
  flex: ${({ isMobile }) => (isMobile ? "1" : "unset")};
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: ${({ isMobile }) => (isMobile ? "16px" : "12px")};
`;

const MenuIcon = styled.img`
  width: ${({ isMobile }) => (isMobile ? "50px" : "75px")};
  height: auto;
  transition: transform 0.3s ease;

  &:hover {
    transform: ${({ isMobile }) => (isMobile ? "none" : "scale(1.2)")};
  }
`;

const MenuText = styled.span`
  display: block;
  font-size: ${({ isMobile }) => (isMobile ? "12px" : "16px")};
  color: white;
`;

const Sidebar = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuItems = [
    { name: "Home", key: "home", path: "/" },
    { name: "Games", key: "games", path: "/games" },
    { name: "NFTs", key: "nfts", path: "/nfts" },
    { name: "Events", key: "events", path: "/events" },
    { name: "Community", key: "community", path: "/community" },
    { name: "Account", key: "account", path: "/account" },
  ];

  return (
    <SidebarContainer isMobile={isMobile}>
      <MenuList isMobile={isMobile}>
        {menuItems.map((item) => (
          <MenuItem key={item.key} isMobile={isMobile}>
            <MenuLink to={item.path} isMobile={isMobile}>
              <MenuIcon
                src={
                  location.pathname === item.path
                    ? menuImages[item.key].active
                    : menuImages[item.key].default
                }
                alt={item.name}
                isMobile={isMobile}
              />
              <MenuText isMobile={isMobile}>{item.name}</MenuText>
            </MenuLink>
          </MenuItem>
        ))}
      </MenuList>
    </SidebarContainer>
  );
};

export default Sidebar;