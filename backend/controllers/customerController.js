const Customer = require('../models/customer');
const User = require('../models/user');

// Create a new Customer
exports.createCustomer = async (req, res) => {
    try {
        const { userId, firstName, lastName } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const customer = await Customer.create({ userId, firstName, lastName });
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Customers
exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll({ include: User });
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a Customer by ID
exports.getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(id, { include: User });
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Customer
exports.updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName } = req.body;
        const customer = await Customer.findById(id);
        if (customer) {
            customer.firstName = firstName;
            customer.lastName = lastName;
            await customer.save();
            res.status(200).json(customer);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Soft delete a Customer
exports.deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(id);
        if (customer) {
            // TODO: Soft Delete customer with User.
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};