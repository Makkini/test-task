import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProductAsync } from '../slices/productsSlice';
import { DEFAULT_IMAGE_URL } from '../types';
import { Box, Button, Container, TextField, Typography, CircularProgress, Alert } from '@mui/material';

const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    imageUrl: yup.string().url('Enter a valid URL').required('Image URL is required'),
});

const CreateProductPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            imageUrl: DEFAULT_IMAGE_URL,
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            try {
                // @ts-ignore
                await dispatch(createProductAsync(values));
                navigate('/products');
            } catch (error) {
                setStatus('Failed to create product');
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Create New Product
            </Typography>

            {formik.status && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {formik.status}
                </Alert>
            )}

            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    id="imageUrl"
                    name="imageUrl"
                    label="Image URL"
                    value={formik.values.imageUrl}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
                    helperText={formik.touched.imageUrl && formik.errors.imageUrl}
                    sx={{ mb: 2 }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/products')}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? <CircularProgress size={24} /> : 'Create'}
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default CreateProductPage;