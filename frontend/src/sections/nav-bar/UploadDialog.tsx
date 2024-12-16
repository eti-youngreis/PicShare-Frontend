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
import { ImageCategory } from '../../utils/category.enum';

const UploadDialog: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ImageCategory | ''>('');

  const handleUploadDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleUploadDialogClose = () => {
    setOpenDialog(false);
  };

  const handleUploadImage = () => {
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
        <Button onClick={handleUploadDialogClose} color="primary">
          ביטול
        </Button>
        <Button onClick={handleUploadImage} color="primary" disabled={!selectedCategory}>
          העלאה
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadDialog;
