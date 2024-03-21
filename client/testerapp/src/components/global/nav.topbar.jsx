import { Box, IconButton } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";


/**
 * Рендер компонента верхней панели.
 *
 * @return {JSX.Element} Рендер компонента верхней панели.
 */
const Topbar = () => {

  return (
    <Box display="flex" p={2} justifyContent="space-between">
      {/* SEARCH BAR */}
      <Box display="flex"></Box>
      {/* ICONS */}
      <Box display="flex" justifyContent="flex-end">
        <IconButton>
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;