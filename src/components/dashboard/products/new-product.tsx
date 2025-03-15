'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhotoCamera } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const itemSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  updatedAt: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date'),
  image: z.instanceof(File).optional(),
});

type Item = z.infer<typeof itemSchema>;

export default function AddItemForm() {
  const [open, setOpen] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Item>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: '',
      description: '',
      updatedAt: new Date().toISOString().split('T')[0],
    },
  });

  const imageFile = watch('image');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('image', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: Item) => {
    console.log('New Item:', data);
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ backgroundColor: '#6366F1', color: '#fff' }}>
        + Add Item
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2} mt={1}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar src={preview || '/default-icon.png'} sx={{ width: 80, height: 80 }} />
              <input
                accept="image/*"
                id="upload-image"
                type="file"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <label htmlFor="upload-image">
                <IconButton color="primary" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </Box>

            <TextField
              label="Title"
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
            />
            <TextField
              label="Description"
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Updated At"
              type="date"
              {...register('updatedAt')}
              error={!!errors.updatedAt}
              helperText={errors.updatedAt?.message}
              fullWidth
            />

            <DialogActions>
              <Button onClick={() => setOpen(false)} color="error">
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#6366F1', color: '#fff' }}>
                Add Item
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
