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

const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  joined: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date'),
  image: z.instanceof(File).optional(),
});

type Customer = z.infer<typeof customerSchema>;

export default function AddCustomerForm() {
  const [open, setOpen] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Customer>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      location: '',
      joined: new Date().toISOString().split('T')[0],
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

  const onSubmit = (data: Customer) => {
    console.log('New Customer:', data);
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ backgroundColor: '#6366F1', color: '#fff' }}>
        + Add
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2} mt={1}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar src={preview || '/default-avatar.png'} sx={{ width: 80, height: 80 }} />
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
              label="Name"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
            />
            <TextField
              label="Email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />
            <TextField
              label="Phone"
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              fullWidth
            />
            <TextField
              label="Location"
              {...register('location')}
              error={!!errors.location}
              helperText={errors.location?.message}
              fullWidth
            />
            <TextField
              label="Joined Date"
              type="date"
              {...register('joined')}
              error={!!errors.joined}
              helperText={errors.joined?.message}
              fullWidth
            />
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="error">
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#6366F1', color: '#fff' }}>
                Add Customer
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
