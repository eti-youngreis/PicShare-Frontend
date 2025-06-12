import { Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { PATHS } from "../../routes/paths";
import { removeSession } from "../../auth/utils";
type MenuProps = {
    anchorEl: null | HTMLElement,
    onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void
}
export default function AccountMenu({ anchorEl, onClose }: MenuProps) {
    const [anchor, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleLogout = () => {
        removeSession();
        window.location.href = `${PATHS.Home}`;
    };

    const handleUploadDialogOpen = () => {
        setOpenDialog(true);
    };

    return <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={onClose}
        PaperProps={{
            elevation: 4,
            sx: {
                minWidth: '150px',
                backgroundColor: '#f5f5f5',
                borderRadius: '5px',
            },
        }}
    >
        <MenuItem sx={{ justifyContent: 'flex-end' }}>
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#333' }}>
                לחשבון שלי
            </Typography>
        </MenuItem>
        <MenuItem onClick={handleUploadDialogOpen} sx={{ justifyContent: 'flex-end' }}>
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#333' }}>
                העלה תמונה
            </Typography>
        </MenuItem>
        <MenuItem onClick={() => { window.location.href = `${PATHS.Home}/${PATHS.Gallery}` }} sx={{ justifyContent: 'flex-end' }}>
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#333' }}>
                התמונות שלי
            </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ justifyContent: 'flex-end' }}>
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#f44336' }}>
                יציאה
            </Typography>
        </MenuItem>
    </Menu>
}