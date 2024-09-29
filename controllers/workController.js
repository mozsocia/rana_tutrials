const Work = require('../models/Work');

exports.getAllWorks = async (req, res) => {
  const { employee, month } = req.query;
  const query = {};
  if (employee && employee !== "null") {
    query.name = employee;
  }

  if (month && month !== "null") {
    const monthRegex = month.replace(/\//g, "\\/");
    query.date = { $regex: monthRegex };
  }

  try {
    const works = await Work.find(query);
    res.json(works);
  } catch (error) {
    console.error("Error fetching work records:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createWork = async (req, res) => {
  try {
    const newWork = new Work(req.body);
    const result = await newWork.save();
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating work:", error);
    res.status(500).json({ message: "Error creating work" });
  }
};

exports.getWorkByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const works = await Work.find({ userEmail: email }).sort({ createdAt: -1 });
    res.json(works);
  } catch (error) {
    console.error("Error fetching works by email:", error);
    res.status(500).json({ message: "Error fetching works" });
  }
};