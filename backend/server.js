const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const port = 5001;

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

const client = new MongoClient(process.env.MONGODB_URI);
const dbname = 'MS_Customer_Management';

const sendMail = async (email, name) => {
    // Create a transporter object
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false, // Allow self-signed certificates
        },
    });

    // Define the email options
    let mailOptions = {
        from: `"Murugan Stores" <${process.env.EMAIL_USER}>`,
        to: `${name} <${email}>`,
        subject: 'Credit Purchase in Murugan Store',
        text: 'This is a test email sent from Node.js!',
    };

    // Send the email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email', error);
    }
};

app.post('/customer_details', async (req, res) => {
    try {
        const db = client.db(dbname);
        const collection = db.collection('customer');
        const { name, email, phone } = req.body;
        const newCustomer = { name, email, phone, date: new Date() };
        const result = await collection.insertOne(newCustomer);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error inserting Customer' });
    }
});

app.post('/transaction_details', async (req, res) => {
    try {
        const db = client.db(dbname);
        const collection = db.collection('transaction');
        const { name, transaction_type, transaction_amount } = req.body;
        const newTransaction = { name, transaction_type, transaction_amount, date: new Date() };
        const result = await collection.insertOne(newTransaction);
        if (transaction_type === 'Credit Sale') {
            const customerCollection = db.collection('customer');
            const customer = await customerCollection.findOne({ name });
            if (customer && customer.email) {
                await sendMail(customer.email, customer.name);
            }
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error inserting Transaction' });
    }
});

app.get('/customer_table', async (req, res) => {
    try {
        const db = client.db(dbname);
        const collection = db.collection('customer');
        const customers = await collection.find({}).toArray();
        res.status(200).json(customers); // Use 200 for successful retrieval
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch",error });
    }
});

app.get('/transaction_table', async (req, res) =>{
    try {
        const db = client.db(dbname);
        const collection = db.collection('transaction');
        const transaction = await collection.find({}).toArray();
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({error : "Unable to fetch", error});
    }
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
