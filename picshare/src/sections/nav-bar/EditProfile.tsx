import React, { useState, ChangeEvent, useEffect } from 'react';
import { Typography, Box, Avatar, Button, Grid, IconButton, TextField } from '@mui/material';
import { useAppSelector } from '../../redux/store';
import { selectAuth } from '../../redux/auth/auth.selectors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deletePhoto } from '../../services/photo.service';
import { editProfile } from '../../services/user.service';
import { UserUpdateType } from '../../types/user.types';
import { setUser } from '../../redux/auth/auth.slice';
import { selectPhotos } from '../../redux/photo/photo.selectors';
import { setPhotos } from '../../redux/photo/photo.slice';

export default function EditProfile() {
    const { user } = useAppSelector(selectAuth);
    const photos = useAppSelector(selectPhotos).filter(photo => photo.userId === user?.id);
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [name, setName] = useState<string>(user?.fullName || '');
    const dispatch = useDispatch();

    const handleEditProfile = async () => {
        try {
            const updateData: UserUpdateType = {
                fullName: name,
                profilePicture: profilePicture || undefined
            };

            const updatedUser = await editProfile(updateData);
            dispatch(setUser(updatedUser));
            // TODO: Replace alert with proper notification
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setProfilePicture(event.target.files[0]);
        }
    };

    async function handleDeletePhoto(id: number) {
        await deletePhoto(id);
        dispatch(setPhotos(photos.filter(photo => photo.id !== id)));
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
                        src={user?.profilePictureUrl || ''}
                        sx={{ width: 120, height: 120, mr: 2, cursor: 'pointer' }}
                    />
                    <label htmlFor="profile-picture-upload">
                        <input
                            id="profile-picture-upload"
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
                {photos.map(photo => (
                    <Grid item xs={3} sm={2} md={2} key={photo.id!}>
                        <Box sx={{ position: 'relative' }}>
                            <img 
                                src={photo.url} 
                                alt={`Uploaded by ${user?.fullName}`}
                                style={{ width: '100%', borderRadius: '8px' }} />
                            <IconButton
                                aria-label="delete"
                                sx={{ position: 'absolute', top: 8, right: 8, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                                onClick={() => handleDeletePhoto(photo.id!)}
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
