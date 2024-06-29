import styled from '@emotion/styled';
import React from 'react';
import { Typography } from '@mui/material';
import LogoIcon from '../../assets/logo-icon.png';
import LogoText from '../../assets/logo-text.png';

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;

const StyledLogo = styled.img(props => ({
  height: '60px',
  minHeight: '60px',
  display: 'block',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledName = styled.img(props => ({
height: '35px',
display: 'block',
alignItems: 'center',
justifyContent: 'center',
marginLeft: '4px',
marginRight: '2px',
}));

const SidebarHeader = ({ children, ...rest }) => {
  return (
    <StyledSidebarHeader {...rest}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <StyledLogo src={LogoIcon}/>
      <StyledName src={LogoText}/>
      </div>
    </StyledSidebarHeader>
  );
};

export { SidebarHeader };