import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem as SelectMenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { PhotoCategory } from '../../utils/category.enum';

const UploadDialog: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory | ''>('');

  const handleUploadDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleUploadDialogClose = () => {
    setOpenDialog(false);
  };

  const handleUploadPhoto = () => {
    console.log('תמונה הועלתה בהצלחה עם הקטגוריה:', selectedCategory);
    handleUploadDialogClose();
  };

  return (
    <Dialog open={openDialog} onClose={handleUploadDialogClose}>
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
              <SelectMenuItem key={category} value={category}>{category}</SelectMenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUploadDialogClose} color="primary">
          ביטול
        </Button>
        <Button onClick={handleUploadPhoto} color="primary" disabled={!selectedCategory}>
          העלאה
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadDialog;
