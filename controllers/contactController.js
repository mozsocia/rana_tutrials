const Contact = require('../models/Contact');

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
};

exports.createContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const result = await newContact.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating contact" });
  }
};