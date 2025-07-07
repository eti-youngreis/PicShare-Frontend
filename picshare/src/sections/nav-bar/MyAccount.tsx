import { useState, ChangeEvent, useEffect } from 'react';
import { Typography, Box, Avatar, Button, Grid, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { selectAuth } from '../../redux/auth/auth.selectors';
import DeleteIcon from '@mui/icons-material/Delete';
import { PhotoType } from '../../types/photo.type';
import { UserUpdateType } from '../../types/user.types';
import { deletePhoto, getCurrentUserPhotos } from '../../services/photo.service';
import { editProfile } from '../../services/user.service';
import { setUser } from '../../redux/auth/auth.slice';

export default function MyAccount() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(selectAuth);
    const [photos, setPhotos] = useState<PhotoType[]>([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [name, setName] = useState(user?.fullName || '');

    useEffect(() => {
        const loadUserPhotos = async () => {
            try {
                const userPhotos = await getCurrentUserPhotos();
                setPhotos(userPhotos);
                // TODO: Show error notification if needed
            } catch (error) {
                console.error('Error loading photos:', error);
                setPhotos([]);
                // TODO: Show error notification
            }
        };
        loadUserPhotos();
    }, []);

    const handleDeletePhoto = async (photoId: number) => {
        try {
            await deletePhoto(photoId);
            setPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== photoId));
            // TODO: Show success notification
        } catch (error) {
            console.error('Error deleting image:', error);
            // TODO: Show error notification
        }
    };

    const handleEditProfile = async () => {
        try {
            const updateData: UserUpdateType = {
                fullName: name,
                profilePicture: profilePicture || undefined
            };

            const updatedUser = await editProfile(updateData);
            dispatch(setUser(updatedUser));
            setOpenEditDialog(false);
            // TODO: Show success notification
        } catch (error) {
            console.error('Error updating profile:', error);
            // TODO: Show error notification
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setProfilePicture(event.target.files[0]);
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
                    src={user?.profilePictureUrl || ''}
                    sx={{ width: 80, height: 80, mr: 2 }}
                />
                <Typography variant="h6">{user?.fullName}</Typography>
                <Button variant="outlined" sx={{ ml: 2 }} onClick={() => setOpenEditDialog(true)}>
                    Edit Profile
                </Button>
            </Box>
            <Typography variant="h5" gutterBottom>
                My Photos
            </Typography>
            <Grid container spacing={2}>
                {photos.map(photo => (
                    <Grid item xs={12} sm={6} md={4} key={photo.id}>
                        <Box sx={{ position: 'relative' }}>
                            <img 
                                src={photo.url} 
                                alt={`Uploaded by ${user?.fullName}`}
                                style={{ width: '100%', borderRadius: '8px', maxHeight: '300px', objectFit: 'cover' }} 
                            />
                            <IconButton
                                aria-label="delete"
                                sx={{ position: 'absolute', top: 8, right: 8, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                                onClick={() => handleDeletePhoto(photo.id)}
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
                        Upload Profile Picture
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
