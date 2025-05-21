import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';
import { SidebarHeader } from '../elements/sidebar.header';
import { Box } from '@mui/system';
import {BarChart, Functions, Build, DescriptionOutlined} from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Badge } from '../elements/sidebar.badge';

// Светлая тема напрямую
const sidebarColor = '#ffffff';
const sidebarTextColor = '#607489';
const menuDisabledText = '#9fb6cf';

export const CustomSidebar = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const [toggled, setToggled] = React.useState(false);
    const [broken, setBroken] = React.useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <div style={{ display: 'flex', height: '100%', direction: 'ltr' }}>
            <Sidebar
                collapsed={collapsed}
                toggled={toggled}
                onBackdropClick={() => setToggled(false)}
                onBreakPoint={setBroken}
                breakPoint="md"
                backgroundColor={sidebarColor}
                rootStyles={{ color: sidebarTextColor }}
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
                                Тестирование
                            </Typography>
                        </Box>
                        <Menu
                            menuItemStyles={{
                                root: { fontSize: '13px', fontWeight: 400 },
                                icon: {
                                    color: '#0098e5',
                                    [`&.${menuClasses.disabled}`]: { color: menuDisabledText },
                                },
                                label: ({ open }) => ({ fontWeight: open ? 600 : undefined }),
                                button: ({ active }) => ({
                                    backgroundColor: active ? '#c5e4ff' : 'transparent',
                                    color: active ? '#44596e' : '#607489',
                                    fontWeight: active ? 600 : 400,
                                    '&:hover': {
                                        backgroundColor: '#c5e4ff',
                                        color: '#44596e',
                                    },
                                }),
                            }}
                        >
                        <SubMenu
                                label="Charts"
                                icon={<BarChart />}
                                suffix={<Badge variant="danger" shape="circle">6</Badge>}
                                defaultOpen={isActive('/charts')}
                            >
                                <MenuItem active={isActive('/charts/pie')} onClick={() => navigate('/charts/pie')}>
                                    Pie charts
                                </MenuItem>
                                <MenuItem active={isActive('/charts/line')} onClick={() => navigate('/charts/line')}>
                                    Line charts
                                </MenuItem>
                                <MenuItem active={isActive('/charts/bar')} onClick={() => navigate('/charts/bar')}>
                                    Bar charts
                                </MenuItem>
                            </SubMenu>

                            <MenuItem
                                icon={<Functions />}
                                active={isActive('/formulas')}
                                onClick={() => navigate('/formulas')}
                            >
                                Формулы
                            </MenuItem>
                            <MenuItem
                                icon={<Build />}
                                active={isActive('/home')}
                                onClick={() => navigate('/home')}
                            >
                                Главная
                            </MenuItem>
                            <MenuItem
                                icon={<DescriptionOutlined/>}
                                active={isActive('/tests')}
                                onClick={() => navigate('/tests')}
                            >
                                Тесты
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Sidebar>
        </div>
    );
};