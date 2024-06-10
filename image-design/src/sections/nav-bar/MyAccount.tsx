import React, { useState, useEffect, ChangeEvent } from 'react';
import { Typography, Box, Avatar, Button, Grid, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useAppSelector } from '../../redux/store';
import { selectAuth } from '../../redux/auth/auth.selectors';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageType from '../../types/image.type';
import { useDispatch } from 'react-redux';
import { deleteImage } from '../../services/image.service';

export default function MyAccount() {
    const { user } = useAppSelector(selectAuth);
    const [images, setImages] = useState<ImageType[]>([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [name, setName] = useState(user?.fullName || '');

    const dispatch = useDispatch();

    const handleDeleteImage = async (imageId: number) => {
        const response = await deleteImage(imageId);
        if (response.status === 200) {
            setImages(images.filter(image => image.id !== imageId));
        } else {
            console.error('Error deleting image');
        }
    };

    const handleEditProfile = async () => {
        const formData = new FormData();
        formData.append('fullName', name);
        if (profileImage) {
            formData.append('image', profileImage);
        }

        try {
            const response = await updateProfile(user!.id, formData);
            if (response.status === 200) {
                alert('Profile updated successfully');
                setOpenEditDialog(false);
                // Ideally, you should update the Redux store here with the new user data.
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

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                My Account
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Avatar
                    alt="Profile Picture"
                    src={user?.profileImagePath || ''}
                    sx={{ width: 80, height: 80, mr: 2 }}
                />
                <Typography variant="h6">{user?.name}</Typography>
                <Button variant="outlined" sx={{ ml: 2 }} onClick={() => setOpenEditDialog(true)}>
                    Edit Profile
                </Button>
            </Box>
            <Typography variant="h5" gutterBottom>
                My Images
            </Typography>
            <Grid container spacing={2}>
                {images.map(image => (
                    <Grid item xs={12} sm={6} md={4} key={image.id}>
                        <Box sx={{ position: 'relative' }}>
                            <img src={image.url} alt={image.title} style={{ width: '100%', borderRadius: '8px' }} />
                            <IconButton
                                aria-label="delete"
                                sx={{ position: 'absolute', top: 8, right: 8, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                                onClick={() => handleDeleteImage(image.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button variant="contained" component="label" fullWidth>
                        Upload Profile Image
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditProfile} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
