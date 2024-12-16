import { Typography, Box, IconButton, Avatar, Menu, MenuItem, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, SelectChangeEvent, DialogActions, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { ImageCategory } from "../../utils/category.enum";
import { useAppSelector } from "../../redux/store";
import { selectAuth } from "../../redux/auth/auth.selectors";
import { useState } from "react";
import { removeSession } from "../../auth/utils";
import { uploadImage } from "../../services/image.service";
import { useDispatch } from "react-redux";
import { addImage } from "../../redux/image/image.slice";
import { AccountCircle } from "@mui/icons-material";
import AccountMenu from "./Menu";
import UploadImage from "./UploadImage";

export default function Account() {
    const { user, isAuthenticated } = useAppSelector(selectAuth);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<ImageCategory | ''>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const dispatch = useDispatch()
    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUploadDialogClose = () => {
        setOpenDialog(false);
        setSelectedCategory('');
        setSelectedFile(null);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUploadImage = async () => {
        if (!selectedFile || !selectedCategory) {
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('category', selectedCategory);
        formData.append('userId', (user!.id).toString())
        try {
            const response = await uploadImage(formData)
            if (response.status === 200) {
                alert("התמונה נוספה לתמונות שלך בהצלחה!")
                dispatch(addImage(response.data))
                handleUploadDialogClose()
            } else {
                console.error('שגיאה בהעלאת התמונה');
            }
        } catch (error) {
            console.error('שגיאה בהעלאת התמונה', error);
        }
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
                        {!(user?.profileImagePath) && <AccountCircle />}
                        {user?.profileImagePath && <Avatar alt="תמונת פרופיל" src={user?.profileImagePath} />}
                    </IconButton>
                    <AccountMenu anchorEl={anchorEl} onClose={handleClose}/>

                    <UploadImage/>
                </Box>
            )}
        </>
    );
}
