import { ChangeEvent, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';

interface AddCategoryDialogProps {
  isOpen: boolean;
  onAdd: (name: string) => void;
  onCancel: VoidFunction;
}

export default function CategoryDialog(props: AddCategoryDialogProps) {
  const [name, setName] = useState('');

  const handleAdd = () => {
    props.onAdd(name);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <Dialog open={props.isOpen} onClose={props.onCancel}>
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter category name</DialogContentText>
        <TextField
          autoFocus
          id="category-name"
          label="Category name"
          onChange={handleChange}
          fullWidth
          sx={{ marginTop: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel}>Cancel</Button>
        <Button color="success" onClick={handleAdd}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
