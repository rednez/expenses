import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Category } from '../../../data/category';
import CategoryDialog from './CategoryDialog';

interface NewOperationFormProps {
  categories: Category[];
  onAdd: (data: AddOperationsPayload) => void;
  onCancel: VoidFunction;
  onAddCategory: (categoryName: string) => void;
}

interface FormData {
  date: Date;
  description: string;
  amount: number;
  type: 'spense' | 'income';
  category: string;
}

export interface AddOperationsPayload extends Omit<FormData, 'date'> {
  date: string;
}

export default function NewOperationForm({
  categories = [],
  onAdd,
  onCancel,
  onAddCategory,
}: NewOperationFormProps) {
  const [isCategoryDialogOpened, setIsCategoryDialogOpened] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const onAddClick: SubmitHandler<FormData> = (data) => {
    onAdd({
      ...data,
      date: format(data.date, 'yyyy-MM-dd'),
      amount: parseFloat(String(data.amount)),
    });
  };

  const handleAddCategoryClick = () => {
    setIsCategoryDialogOpened(true);
  };

  const handleCloseCategoryDialog = () => {
    setIsCategoryDialogOpened(false);
  };

  const handleAddCategory = (categoryName: string) => {
    handleCloseCategoryDialog();
    onAddCategory(categoryName);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card elevation={4} sx={{ width: 400, borderRadius: 3 }}>
        <Box padding={3}>
          <Typography variant="h5">Add new operation</Typography>
        </Box>

        <Box marginTop={2} sx={{ padding: '8px 18px 24px 18px' }}>
          <form>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <Controller
                  name="date"
                  control={control}
                  defaultValue={new Date()}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        {...field}
                        maxDate={new Date()}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            helperText={null}
                            label="Date"
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                />

                <Controller
                  name="amount"
                  control={control}
                  defaultValue={0}
                  rules={{
                    required: 'Required',
                    min: {
                      value: 0.01,
                      message: 'Must be more than 0',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Amount"
                      type="number"
                      error={!!errors.amount}
                      helperText={errors.amount?.message}
                    />
                  )}
                />
              </Stack>

              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Required',
                  minLength: {
                    value: 5,
                    message: 'Must contains min 5 chars',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />

              <Stack direction="row" spacing={2}>
                <Controller
                  name="type"
                  control={control}
                  defaultValue="spense"
                  rules={{ required: 'Select a type' }}
                  render={({ field }) => (
                    <FormControl error={!!errors.type} fullWidth>
                      <InputLabel id="operation-type-label">Type</InputLabel>
                      <Select
                        labelId="operation-type-label"
                        id="operation-type-label"
                        {...field}
                        label="Type"
                      >
                        <MenuItem value={'spense'}>Spense</MenuItem>
                        <MenuItem value={'income'}>Income</MenuItem>
                      </Select>
                      {!!errors.type ? (
                        <FormHelperText>{errors.type.message}</FormHelperText>
                      ) : null}
                    </FormControl>
                  )}
                ></Controller>

                <Controller
                  name="category"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Select a category' }}
                  render={({ field }) => (
                    <FormControl error={!!errors.category} fullWidth>
                      <InputLabel id="operation-category-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="operation-category-label"
                        id="operation-category-label"
                        {...field}
                        label="Category"
                      >
                        {categories.map((i) => (
                          <MenuItem key={i.id} value={i.name}>
                            {i.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {!!errors.category ? (
                        <FormHelperText>
                          {errors.category.message}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  )}
                ></Controller>

                <Box>
                  <IconButton
                    sx={{ marginTop: '10px' }}
                    onClick={handleAddCategoryClick}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Box>
              </Stack>
            </Stack>
          </form>

          <CategoryDialog
            isOpen={isCategoryDialogOpened}
            onAdd={handleAddCategory}
            onCancel={handleCloseCategoryDialog}
          />

          <Stack direction="row" spacing={2} sx={{ marginTop: 3 }}>
            <Button variant="contained" onClick={handleSubmit(onAddClick)}>
              Add
            </Button>

            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}
