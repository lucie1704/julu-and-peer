const CustomerAddress = require('../models/customeraddress');
const Customer = require('../models/customer');

// Create a new CustomerAddress
exports.createCustomerAddress = async (req, res) => {
    try {
        const customer = await Customer.findById(req.body.customerId);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        const customerAddress = await CustomerAddress.create(req.body);
        res.status(201).json(customerAddress);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all CustomerAddresses
exports.getAllCustomerAddresses = async (req, res) => {
    try {
        const customerAddresses = await CustomerAddress.findAll();
        res.status(200).json(customerAddresses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single CustomerAddress by id
exports.getCustomerAddressById = async (req, res) => {
    try {
        const customerAddress = await CustomerAddress.findById(req.params.id);
        if (!customerAddress) {
            return res.status(404).json({ error: 'CustomerAddress not found' });
        }
        res.status(200).json(customerAddress);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a CustomerAddress
exports.updateCustomerAddress = async (req, res) => {
    try {
        const customerAddress = await CustomerAddress.findById(req.params.id);
        if (!customerAddress) {
            return res.status(404).json({ error: 'CustomerAddress not found' });
        }
        await customerAddress.update(req.body);
        res.status(200).json(customerAddress);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a CustomerAddress
exports.deleteCustomerAddress = async (req, res) => {
    try {
        const customerAddress = await CustomerAddress.findById(req.params.id);
        if (!customerAddress) {
            return res.status(404).json({ error: 'CustomerAddress not found' });
        }
        await customerAddress.destroy();
        res.status(204).json({ message: 'CustomerAddress deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};