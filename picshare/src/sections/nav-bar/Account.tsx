import { Typography, Box, IconButton, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { useAppSelector } from "../../redux/store";
import { selectAuth } from "../../redux/auth/auth.selectors";
import { useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import AccountMenu from "./Menu";
import UploadPhoto from "./UploadPhoto";

export default function Account() {
    const { user, isAuthenticated } = useAppSelector(selectAuth);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {!isAuthenticated && (
                <Typography variant="h6" component="div">
                    <Link to={`/${PATHS.SignIn}`} style={{ textDecoration: 'none', color: 'inherit' }}>כניסה</Link>
                </Typography>
            )}
            {isAuthenticated && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        size="large"
                        aria-label="חשבון משתמש נוכחי"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        {!(user?.profilePictureUrl) && <AccountCircle />}
                        {user?.profilePictureUrl && <Avatar alt="תמונת פרופיל" src={user?.profilePictureUrl} />}
                    </IconButton>
                    <AccountMenu anchorEl={anchorEl} onClose={handleClose} />

                    <UploadPhoto />
                </Box>
            )}
        </>
    );
}
