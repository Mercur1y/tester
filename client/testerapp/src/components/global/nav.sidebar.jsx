import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses, MenuItemStyles } from 'react-pro-sidebar';
import { SidebarHeader } from './sidebar_elements/sidebar.header';
import { Box } from '@mui/system';
import { BarChart, Language, Create, MenuBook, Event, ShoppingCart, Build } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Badge } from './sidebar_elements/sidebar.badge';

const themes = {
  light: {
    sidebar: {
      backgroundColor: '#ffffff',
      color: '#607489',
    },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#0098e5',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
      disabled: {
        color: '#9fb6cf',
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: '#0b2948',
      color: '#8ba1b7',
    },
    menu: {
      menuContent: '#082440',
      icon: '#59d0ff',
      hover: {
        backgroundColor: '#00458b',
        color: '#b6c8d9',
      },
      disabled: {
        color: '#3e5e7e',
      },
    },
  },
};

// hex to rgba converter
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const CustomSidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(false);

  const [hasImage, setHasImage] = React.useState(false);

  const menuItemStyles = {
    root: {
      fontSize: '13px',
      fontWeight: 400,
    },
    icon: {
      color: themes['light'].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes['light'].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(themes['light'].menu.menuContent, hasImage && !collapsed ? 0.4 : 1)
          : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes['light'].menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: hexToRgba(themes['light'].menu.hover.backgroundColor, hasImage ? 0.8 : 1),
        color: themes['light'].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <div style={{ display: 'flex', height: '100%', direction: 'ltr'}}>
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
        breakPoint="md"
        backgroundColor={hexToRgba(themes['light'].sidebar.backgroundColor, 0.9)}
        rootStyles={{
          color: themes['light'].sidebar.color,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <SidebarHeader style={{ marginBottom: '24px', marginTop: '16px' }} />
          <Box sx={{ flex: 1, marginBottom: '32px' }}>
            <Box sx={{ padding: '0 24px', marginBottom: '8px' }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
              >
                General
              </Typography>
            </Box>
            <Menu menuItemStyles={menuItemStyles}>
              <SubMenu
                label="Charts"
                icon={<BarChart />}
                suffix={
                  <Badge variant="danger" shape="circle">
                    6
                  </Badge>
                }
              >
                <MenuItem> Pie charts</MenuItem>
                <MenuItem> Line charts</MenuItem>
                <MenuItem> Bar charts</MenuItem>
              </SubMenu>
              <SubMenu label="Maps" icon={<Language />}>
                <MenuItem> Google maps</MenuItem>
                <MenuItem> Open street maps</MenuItem>
              </SubMenu>
              <SubMenu label="'light'" icon={<Create />}>
                <MenuItem> Dark</MenuItem>
                <MenuItem> Light</MenuItem>
              </SubMenu>
              <SubMenu label="Components" icon={<Build />}>
                <MenuItem> Grid</MenuItem>
                <MenuItem> Layout</MenuItem>
                <SubMenu label="Forms">
                  <MenuItem> Input</MenuItem>
                  <MenuItem> Select</MenuItem>
                  <SubMenu label="More">
                    <MenuItem> CheckBox</MenuItem>
                    <MenuItem> Radio</MenuItem>
                  </SubMenu>
                </SubMenu>
              </SubMenu>
              <SubMenu label="E-commerce" icon={<ShoppingCart />}>
                <MenuItem> Product</MenuItem>
                <MenuItem> Orders</MenuItem>
                <MenuItem> Credit card</MenuItem>
              </SubMenu>
            </Menu>

            <Box sx={{ padding: '0 24px', marginBottom: '8px', marginTop: '32px' }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
              >
                Extra
              </Typography>
            </Box>

            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem icon={<Event />} suffix={<Badge variant="success">New</Badge>}>
                Calendar
              </MenuItem>
              <MenuItem icon={<MenuBook />}>Documentation</MenuItem>
              <MenuItem disabled icon={<BarChart />}>
                Examples
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Sidebar>
    </div>
  );
};
