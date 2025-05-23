import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Menu, menuClasses, MenuItem, Sidebar} from 'react-pro-sidebar';
import {SidebarHeader} from '../elements/sidebar.header';
import {Box} from '@mui/system';
import {DescriptionOutlined, EditDocument, Functions, GroupOutlined} from '@mui/icons-material';
import {Typography} from '@mui/material';

// Светлая тема напрямую
const sidebarColor = '#ffffff';
const sidebarTextColor = '#607489';
const menuDisabledText = '#9fb6cf';

export const CustomSidebar = ({roles}) => {
    const [collapsed, setCollapsed] = React.useState(false);
    const [toggled, setToggled] = React.useState(false);
    const [broken, setBroken] = React.useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <div style={{display: 'flex', height: '100%', direction: 'ltr'}}>
            <Sidebar
                collapsed={collapsed}
                toggled={toggled}
                onBackdropClick={() => setToggled(false)}
                onBreakPoint={setBroken}
                breakPoint="md"
                backgroundColor={sidebarColor}
                rootStyles={{color: sidebarTextColor}}
            >
                <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                    <SidebarHeader style={{marginBottom: '24px', marginTop: '16px'}}/>
                    {roles.includes("ROLE_MODERATOR") && (
                        <>
                            <Box sx={{flex: 1, marginBottom: '32px'}}>
                                <Box sx={{padding: '0 24px', marginBottom: '8px'}}>
                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                        style={{opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px'}}
                                    >
                                        Тестирование
                                    </Typography>
                                </Box>
                                <Menu
                                    menuItemStyles={{
                                        root: {fontSize: '13px', fontWeight: 400},
                                        icon: {
                                            color: '#0098e5',
                                            [`&.${menuClasses.disabled}`]: {color: menuDisabledText},
                                        },
                                        label: ({open}) => ({fontWeight: open ? 600 : undefined}),
                                        button: ({active}) => ({
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
                                    <MenuItem
                                        icon={<Functions/>}
                                        active={isActive('/formulas')}
                                        onClick={() => navigate('/formulas')}
                                    >
                                        Формулы
                                    </MenuItem>
                                    <MenuItem
                                        icon={<DescriptionOutlined/>}
                                        active={isActive('/tests')}
                                        onClick={() => navigate('/tests')}
                                    >
                                        Мои шаблоны
                                    </MenuItem>
                                </Menu>
                            </Box>
                            <Box sx={{flex: 8, marginBottom: '32px'}}>
                                <Box sx={{padding: '0 24px', marginBottom: '8px'}}>
                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                        style={{opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px'}}
                                    >
                                        Управление
                                    </Typography>
                                </Box>
                                <Menu
                                    menuItemStyles={{
                                        root: {fontSize: '13px', fontWeight: 400},
                                        icon: {
                                            color: '#0098e5',
                                            [`&.${menuClasses.disabled}`]: {color: menuDisabledText},
                                        },
                                        label: ({open}) => ({fontWeight: open ? 600 : undefined}),
                                        button: ({active}) => ({
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
                                    <MenuItem
                                        icon={<GroupOutlined/>}
                                        active={isActive('/groups')}
                                        onClick={() => navigate('/groups')}
                                    >
                                        Список групп
                                    </MenuItem>
                                    <MenuItem
                                        icon={<EditDocument/>}
                                        active={isActive('/assignments')}
                                        onClick={() => navigate('/assignments')}
                                    >
                                        Назначенные тесты
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </>
                    )}
                    {roles.includes("ROLE_USER") && (
                        <>
                            <Box sx={{flex: 1, marginBottom: '32px'}}>
                                <Box sx={{padding: '0 24px', marginBottom: '8px'}}>
                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                        style={{opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px'}}
                                    >
                                        Тестирование
                                    </Typography>
                                </Box>
                                <Menu
                                    menuItemStyles={{
                                        root: {fontSize: '13px', fontWeight: 400},
                                        icon: {
                                            color: '#0098e5',
                                            [`&.${menuClasses.disabled}`]: {color: menuDisabledText},
                                        },
                                        label: ({open}) => ({fontWeight: open ? 600 : undefined}),
                                        button: ({active}) => ({
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
                                    <MenuItem
                                        icon={<DescriptionOutlined/>}
                                        active={isActive('/student/tests')}
                                        onClick={() => navigate('/student/tests')}
                                    >
                                        Мои тесты
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </>
                    )}
                </Box>
            </Sidebar>
        </div>
    );
};