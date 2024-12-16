import React, { useState, ChangeEvent, useEffect } from 'react';
import { Typography, Box, Avatar, Button, Grid, IconButton, TextField } from '@mui/material';
import { useAppSelector } from '../../redux/store';
import { selectAuth } from '../../redux/auth/auth.selectors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteImage } from '../../services/image.service';
import { updateProfile } from '../../services/user.service';
import { selectImages } from '../../redux/image/image.selectors';
import { setImages } from '../../redux/image/image.slice';

export default function EditProfile() {
    const { user } = useAppSelector(selectAuth);
    const images = useAppSelector(selectImages).filter(image => image.userId === user?.id);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [name, setName] = useState<string>(user?.fullName || '');
    const dispatch = useDispatch();

    const handleEditProfile = async () => {
        const formData = new FormData();
        formData.append('fullName', name);
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            const response = await updateProfile(user!.id!, formData);
            if (response.status === 200) {
                alert('Profile updated successfully');
            } else {
                console.error('Error updating profile');
            }
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setProfileImage(event.target.files[0]);
        }
    };

    async function handleDeleteImage(id: number) {
        await deleteImage(id);
        dispatch(setImages(images.filter(image => image.id !== id)));
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                החשבון שלי
            </Typography>
            <Box sx={{ display: 'flex',flexDirection:'column', alignItems: 'flex-start', mb: 4 }}>
                <Box sx={{ position: 'relative' }}>
                    <Avatar
                        alt="Profile Picture"
                        src={user?.profileImagePath || ''}
                        sx={{ width: 120, height: 120, mr: 2, cursor: 'pointer' }}
                    />
                    <label htmlFor="profile-image-upload">
                        <input
                            id="profile-image-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <EditIcon
                            sx={{ position: 'absolute', bottom: 4, right: 22,
                                border:'solid 0.2px gray', backgroundColor: 'white', borderRadius: '50%', 
                                cursor: 'pointer', width: 30, height: 30 }}
                        />
                    </label>
                </Box>
                <TextField
                    margin="dense"
                    label="שם מלא"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    margin="dense"
                    label="אימייל"
                    fullWidth
                    value={user?.email}
                    disabled
                    sx={{ marginRight: 2 }}
                />
            </Box>
            <Typography variant="h5" gutterBottom>
                התמונות שלי
            </Typography>
            <Grid container spacing={2}>
                {images.map(image => (
                    <Grid item xs={3} sm={2} md={2} key={image.id!}>
                        <Box sx={{ position: 'relative' }}>
                            <img src={image.imagePath} alt={"תמונה"} style={{ width: '100%', borderRadius: '8px' }} />
                            <IconButton
                                aria-label="delete"
                                sx={{ position: 'absolute', top: 8, right: 8, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                                onClick={() => handleDeleteImage(image.id!)}
                            >
                                <DeleteIcon sx={{height:20, width:20}}/>
                            </IconButton>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Button sx={{marginTop: 5}} variant="contained" onClick={handleEditProfile}>
                שמירת שינויים
            </Button>
        </Box>
    );
}
