import PropTypes from 'prop-types'; import { useState } from 'react';

// @mui

import { Link, Stack, Select, FormHelperText, MenuItem, CircularProgress, InputLabel, IconButton, InputAdornment, TextField, Input, Checkbox, Box, Card, Typography, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';

// utils
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';

// components

// ----------------------------------------------------------------------
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// ----------------------------------------------------------------------

// ShopProductCard.propTypes = {
//     product: PropTypes.object,
// };

export default function AddBrand({ open, onPopUpClose, loading, onSubmit }) {

    const [selectedBrand, setSelectedBrand] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [formError, setFormError] = useState(false);

    const handleClick = (event) => {

        event.preventDefault(); setFormError(false);

        const formElement = document.querySelector('#loginForm');
        const formData = new FormData(formElement);
        console.log(formData);
        const formDataJSON = Object.fromEntries(formData);
        console.log(formDataJSON);
        if (formDataJSON.brandId === '0' || formDataJSON.categoryId === '0') {
            setFormError(true);
            return false;
        } return true
        // onSubmit(formDataJSON)
    };

    // console.log('addProduct', props);
    // const { open } = props;
    const handleClose = () => {
        onPopUpClose()
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"


        >
            <Box sx={style} >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <h2 style={{ marginLeft: '10px' }}>Add Brand</h2>
                    <IconButton onClick={handleClose}>
                        X
                    </IconButton>
                </Stack>
                <form id='loginForm' onSubmit={handleClick} >

                    <Stack spacing={3}>
                        <TextField name="productName" label="Category Name" required />
                        <TextField name="description" label="Description" />
                       
                        <TextField type='file' name="imageUrl"  />
                        {formError && (
                            <FormHelperText error>
                                This field is required.
                            </FormHelperText>
                        )}

                        <Stack alignItems="center" spacing={2}>
                            {loading ? (
                                <Stack alignItems="center" justifyContent="center">
                                    <CircularProgress />
                                </Stack>
                            ) : (
                                <LoadingButton fullWidth size="large" type="submit" variant="contained">
                                    Add Brand
                                </LoadingButton>
                            )}
                        </Stack>


                    </Stack>
                </form>
            </Box>
        </Modal>
    );
}
