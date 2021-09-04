import React from 'react';
import { IconContainer, Icon, IconWrapper, MainMenuContainer, Menu } from "./left-sidebar.styles";
import LogoIcon from "../../assets/images/logo.svg";
import settingsIcon from "../../assets/images/settings.svg";
import homeIcon from "../../assets/images/home.svg";
import chatIcon from "../../assets/images/chats.svg";
import contactsIcon from "../../assets/images/contact.svg";
import { Link } from 'react-router-dom';

const LeftSidebar = () => {
  return (
    <Menu>
      <Link to="/">
        <IconWrapper>
          <IconContainer activeVideoCamera>
            <Icon src={LogoIcon} />
          </IconContainer>
        </IconWrapper>
      </Link>
      <MainMenuContainer>
      <Link to="/home">
          <IconWrapper menuList>
            <Icon src={homeIcon} />
          </IconWrapper>
        </Link>
        <Link to="/chats">
          <IconWrapper menuList>
            <Icon src={chatIcon} width={30} height={30} />
          </IconWrapper>
        </Link>
        <Link to="/contacts">
          <IconWrapper menuList>
            <Icon src={contactsIcon} width={30} height={30} />
          </IconWrapper>
        </Link>
      </MainMenuContainer>
      <Link to="/settings">
        <IconWrapper>
          <IconContainer defaultIconBackground>
            <Icon src={settingsIcon} />
          </IconContainer>
        </IconWrapper>
      </Link>
    </Menu>
  )
}

export default LeftSidebar;