import { MenuItem as SelectMenuItem, Grid, Typography, Box, IconButton, Avatar, Menu, MenuItem, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, SelectChangeEvent, DialogActions, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { ImageCategory } from "../../utils/category.enum";
import { useAppSelector } from "../../redux/store";
import { selectAuth } from "../../redux/auth/auth.selectors";
import { useState } from "react";
import { removeSession } from "../../auth/utils";

export default function Account() {
    const { user, isAuthenticated } = useAppSelector(selectAuth)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<ImageCategory | undefined>(undefined);

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        removeSession()
        window.location.href = `${PATHS.Home}`
    };

    const handleUploadDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleUploadDialogClose = () => {
        setOpenDialog(false);
    };

    const handleUploadImage = () => {
        // כאן להוסיף את הלוגיקה להעלאת התמונה והקטגוריה
        console.log('תמונה הועלתה בהצלחה עם הקטגוריה:', selectedCategory);
        handleUploadDialogClose();
    };

    return <>
        {!isAuthenticated &&
            (<Typography variant="h6" component="div">
                <Link to={`/${PATHS.SignIn}`} style={{ textDecoration: 'none', color: 'inherit' }}>כניסה</Link>
            </Typography>)
        }
        {isAuthenticated &&
            (<Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                    size="large"
                    aria-label="חשבון משתמש נוכחי"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    {user?.profileImagePath && <Avatar alt="תמונת פרופיל" src={user?.profileImagePath} />}
                </IconButton>
                <Menu
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
                    onClose={handleClose}
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
                    <MenuItem onClick={() => { window.location.href = `${PATHS.Home}/${PATHS.MyGallery}` }} sx={{ justifyContent: 'flex-end' }}>
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

                <Dialog open={openDialog} onClose={handleUploadDialogClose}>
                    <DialogTitle>העלאת תמונה</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                            <InputLabel id="category-select-label">בחר קטגוריה</InputLabel>
                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                value={selectedCategory}
                                onChange={(event: SelectChangeEvent<ImageCategory>) => {
                                    setSelectedCategory(event.target.value as ImageCategory);
                                }}
                                label="בחר קטגוריה"
                                fullWidth
                            >
                                {Object.values(ImageCategory).map((category) => (
                                    <SelectMenuItem key={category} value={category}>{category}</SelectMenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <DialogActions>
                            <Button onClick={handleUploadDialogClose} color="primary">
                                ביטול
                            </Button>
                            <Button onClick={handleUploadImage} color="primary" disabled={!selectedCategory}>
                                העלאה
                            </Button>
                        </DialogActions>
                    </DialogActions>
                </Dialog>
            </Box>)
        }
    </>
}