import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { AppBar, Modal, Toolbar, Grid, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Collapse, Box, CssBaseline, Container } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./../App.css"
import logo from '../assets/images/logo_prueba.png';

function OrdenesList() {
    const [ordenes, setOrdenes] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [formData, setFormData] = useState({
        sku: '',
        name: '',
        quantity: '',
        price: ''
    });

    const [openModal, setOpenModal] = useState(false);

    const [formErrors, setFormErrors] = useState({
        sku: false,
        name: false,
        quantity: false,
        price: false
    });
    
    const [touchedFields, setTouchedFields] = useState({
        sku: false,
        name: false,
        quantity: false,
        price: false
    });

    const [detallesVisibles, setDetallesVisibles] = useState({});


    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const newOrderItem = { ...formData };
    const updatedOrdenes = ordenes.map(orden => {
        if (orden.id === selectedOrderId) {
            return {
                ...orden,
                items: [...orden.items, newOrderItem]
            };
        }
        return orden;
    });

    const [clickedOutside, setClickedOutside] = useState(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'price' && !/^\d*\.?\d*$/.test(value)) {
            return;
        }
        if (name === 'quantity' && !/^\d*\.?\d*$/.test(value)) {
            return;
        }
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: false });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (!Object.values(errors).some(error => error)) {
            console.log('Datos del formulario:', formData);
            setFormData({
                sku: '',
                name: '',
                quantity: '',
                price: ''
            });
        } else {
            setFormErrors(errors);
        }

        setOrdenes(updatedOrdenes);
        setFormData({
            sku: '',
            name: '',
            quantity: '',
            price: ''
        });
    };


    const validateForm = () => {
        const errors = {};
        Object.keys(formData).forEach(key => {
            if (formData[key].trim() === '') {
                errors[key] = true;
            } else {
                errors[key] = false;
            }
        });
        return errors;
    };

    const isFormValid = () => {
        return Object.values(formData).every(value => value.trim() !== '');
    };

    const handleInputBlur = (fieldName) => {
        setTouchedFields({ ...touchedFields, [fieldName]: true });
        if (formData[fieldName].trim() === '') {
            setFormErrors({ ...formErrors, [fieldName]: true });
            setClickedOutside(true);
        }
    };

    const handleAgregarItem = (ordenId) => {
        setSelectedOrderId(ordenId);
        setOpenModal(true);
    };

    const verDetalleOrden = (ordenId) => {
        setSelectedOrderId(ordenId === selectedOrderId ? null : ordenId);
        setDetallesVisibles({ ...detallesVisibles, [ordenId]: true });
    };

    useEffect(() => {
        const fetchOrdenes = async () => {
            try {
                const response = await api.getOrdenes();
                setOrdenes(response.data.orders);
            } catch (error) {
                console.error('Error al obtener las órdenes:', error);
            }
        };

        fetchOrdenes();
    }, []);

    return (
        <div className="orden-list-container">
            <AppBar position="static" sx={{ marginBottom: '20px', borderRadius: '4px' }}>
                <Container maxWidth="lg">
                    <Toolbar>
                        <img src={logo} alt="Logo" style={{ marginRight: '10px' }} />
                        <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
                            Prueba Axented
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Paper style={{ padding: '20px' }}>
                        <Typography variant="h6" gutterBottom>
                            Agregar Nuevo Item
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Sku"
                                name="sku"
                                value={formData.sku}
                                onChange={handleInputChange}
                                onBlur={() => handleInputBlur('sku')}
                                fullWidth
                                margin="normal"
                                error={formErrors.sku || (formErrors.sku && clickedOutside)}
                                helperText={formErrors.sku && "Este campo es obligatorio"}
                                disabled={!selectedOrderId}
                            />
                            <TextField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                onBlur={() => handleInputBlur('name')}
                                fullWidth
                                margin="normal"
                                error={formErrors.name || (formErrors.name && clickedOutside)}
                                helperText={formErrors.name && "Este campo es obligatorio"}
                                disabled={!selectedOrderId}
                            />
                            <TextField
                                label="Quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                onBlur={() => handleInputBlur('quantity')}
                                fullWidth
                                margin="normal"
                                error={formErrors.quantity || (formErrors.quantity && clickedOutside)}
                                helperText={formErrors.quantity && "Este campo es obligatorio"}
                                disabled={!selectedOrderId}
                            />
                            <TextField
                                label="Price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                onBlur={() => handleInputBlur('price')}
                                fullWidth
                                margin="normal"
                                error={formErrors.price || (formErrors.price && clickedOutside)}
                                helperText={formErrors.price && "Este campo es obligatorio"}
                                disabled={!selectedOrderId}
                            />
                            <Button type="submit" variant="contained" color="primary" disabled={!isFormValid()}>
                                Agregar
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Paper style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                        <CssBaseline />
                        <Container maxWidth="lg">
                            <Typography variant="h4" gutterBottom>
                                Lista de Órdenes
                            </Typography>
                            <TableContainer component={Paper} elevation={0} >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Número de Orden</TableCell>
                                            <TableCell>Cliente</TableCell>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {ordenes.map(orden => (
                                            <React.Fragment key={orden.id}>
                                                <TableRow>
                                                    <TableCell>{orden.number}</TableCell>
                                                    <TableCell>{orden.customer.firstName} {orden.customer.lastName}</TableCell>
                                                    <TableCell>{orden.id}</TableCell>
                                                    <TableCell>
                                                        <Button onClick={() => verDetalleOrden(orden.id)} className="icono-con-texto">
                                                            <VisibilityIcon className="icono" />
                                                            {selectedOrderId === orden.id ? 'Ocultar Detalle' : 'Ver Detalle'}
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: '#e8f3ff' }} colSpan={4}>
                                                        <Collapse in={selectedOrderId === orden.id} timeout="auto" unmountOnExit>
                                                            <Box margin={1}>
                                                                <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginBottom: 10 }}>
                                                                    <Typography gutterBottom component="div" style={{ marginBottom: 0 }}>
                                                                        Detalle de la Orden <span style={{ color: '#1976d2' }}>#{orden.id}</span>
                                                                    </Typography>
                                                                    <Button onClick={() => handleAgregarItem(orden.id)} variant="contained" color="primary">
                                                                        Pagar
                                                                    </Button>
                                                                    {/* Modal de confirmación */}
                                                                    <Modal
                                                                        open={openModal}
                                                                        onClose={handleCloseModal}
                                                                        aria-labelledby="modal-modal-title"
                                                                        aria-describedby="modal-modal-description"
                                                                    >
                                                                        <Box sx={{
                                                                            position: 'absolute',
                                                                            top: '50%',
                                                                            left: '50%',
                                                                            transform: 'translate(-50%, -50%)',
                                                                            width: 400,
                                                                            bgcolor: 'background.paper',
                                                                            boxShadow: 24,
                                                                            p: 4,
                                                                        }}>
                                                                            <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
                                                                                Compra Exitosa
                                                                            </Typography>
                                                                            <Typography id="modal-modal-description" variant="body1" gutterBottom>
                                                                                ¡La compra se ha guardado exitosamente!
                                                                            </Typography>
                                                                            <Button onClick={handleCloseModal} variant="contained" color="primary">
                                                                                Ok
                                                                            </Button>
                                                                        </Box>
                                                                    </Modal>
                                                                </Box>

                                                                <TableContainer component={Paper} elevation={0} >
                                                                    <Table>
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <TableCell>Sku</TableCell>
                                                                                <TableCell>Name</TableCell>
                                                                                <TableCell>Quantity</TableCell>
                                                                                <TableCell>Price</TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {orden.items.map(item => (
                                                                                <TableRow key={item.id}>
                                                                                    <TableCell>{item.sku ? item.sku : 'no sku'}</TableCell>
                                                                                    <TableCell>{item.name}</TableCell>
                                                                                    <TableCell>{item.quantity}</TableCell>
                                                                                    <TableCell>${parseFloat(item.price).toLocaleString('en-US')}</TableCell>
                                                                                </TableRow>
                                                                            ))}
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableContainer>
                                                            </Box>
                                                        </Collapse>
                                                    </TableCell>
                                                </TableRow>
                                            </React.Fragment>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Container>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default OrdenesList;
