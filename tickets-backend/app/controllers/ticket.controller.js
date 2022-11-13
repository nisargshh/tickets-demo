const Ticket = require("../models/ticket.model.js");

// Create and Save a new Ticket
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Tutorial
  const ticket = new Ticket({
    name: req.body.name,
    description: req.body.description,
    acceptance_criteria: req.body.acceptance_criteria,
    priority: req.body.priority,
    create_date: Date.now(),
  });

  // Save Ticket in the database
  Ticket.create(ticket, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ticket.",
      });
    else res.send(data);
  });
};

// Retrieve all Ticket from the database.
exports.findAll = (req, res) => {
  Ticket.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving ticket.",
      });
    else res.send(data);
  });
};

// Find a single Ticket by Id
exports.findOne = (req, res) => {
  Ticket.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ticket with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update a Ticket identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Ticket.updateById(req.params.id, new Ticket(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ticket with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Ticket with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Ticket with the specified id in the request
exports.delete = (req, res) => {
  Ticket.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ticket with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Ticket with id " + req.params.id,
        });
      }
    } else res.send({ message: `Ticket was deleted successfully!` });
  });
};
