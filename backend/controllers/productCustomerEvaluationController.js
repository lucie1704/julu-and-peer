const productCustomerEvaluation = require('../models/productcustomerevaluation');

exports.getAllProductCustomerEvaluations = async (req, res) => {
    try {
        const evaluations = await productCustomerEvaluation.getAllProductCustomerEvaluations();
        res.status(200).json(evaluations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductCustomerEvaluationById = async (req, res) => {
    try {
        const evaluation = await productCustomerEvaluation.getProductCustomerEvaluationById(req.params.id);
        if (evaluation) {
            res.status(200).json(evaluation);
        } else {
            res.status(404).json({ message: 'Evaluation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProductCustomerEvaluation = async (req, res) => {
    try {
        const evaluation = await productCustomerEvaluation.createProductCustomerEvaluation(req.body);
        res.status(201).json(evaluation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProductCustomerEvaluation = async (req, res) => {
    try {
        const evaluation = await productCustomerEvaluation.updateProductCustomerEvaluation(req.params.id, req.body);
        if (evaluation) {
            res.status(200).json(evaluation);
        } else {
            res.status(404).json({ message: 'Evaluation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProductCustomerEvaluation = async (req, res) => {
    try {
        const success = await productCustomerEvaluation.deleteProductCustomerEvaluation(req.params.id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Evaluation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};