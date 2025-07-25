import { Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, Button, DialogActions } from "@mui/material";
import { PhotoCategory } from "../../utils/category.enum";
import { addPhoto } from "../../redux/photo/photo.slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadPhoto } from "../../services/photo.service";
import { useAppSelector } from "../../redux/store";
import { selectAuth } from "../../redux/auth/auth.selectors";

export default function UploadPhoto() {
    const {user} = useAppSelector(selectAuth)
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<PhotoCategory | ''>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const dispatch = useDispatch()

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
    
    const handleUploadPhoto = async () => {
        if (!selectedFile || !selectedCategory) {
            return;
        }

        const formData = new FormData();
        formData.append('photo', selectedFile);
        formData.append('category', selectedCategory);
        formData.append('userId', (user!.id).toString())
        try {
            const response = await uploadPhoto(formData)
            if (response.status === 200) {
                alert("התמונה נוספה לתמונות שלך בהצלחה!")
                dispatch(addPhoto(response.data))
                handleUploadDialogClose()
            } else {
                console.error('שגיאה בהעלאת התמונה');
            }
        } catch (error) {
            console.error('שגיאה בהעלאת התמונה', error);
        }
    };
    return <Dialog open={openDialog} onClose={handleUploadDialogClose}>
        <DialogTitle>העלאת תמונה</DialogTitle>
        <DialogContent>
            <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                <InputLabel id="category-select-label">בחר קטגוריה</InputLabel>
                <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={selectedCategory}
                    onChange={(event: SelectChangeEvent<PhotoCategory>) => {
                        setSelectedCategory(event.target.value as PhotoCategory);
                    }}
                    label="בחר קטגוריה"
                    fullWidth
                >
                    {Object.values(PhotoCategory).map((category) => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" component="label" fullWidth>
                בחר תמונה
                <input type="file" hidden onChange={handleFileChange} />
            </Button>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleUploadDialogClose} color="primary">
                ביטול
            </Button>
            <Button onClick={handleUploadPhoto} color="primary" disabled={!selectedCategory || !selectedFile}>
                העלאה
            </Button>
        </DialogActions>
    </Dialog>
}