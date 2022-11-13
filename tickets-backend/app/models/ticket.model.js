const sql = require("./db.js");

// constructor
const Ticket = function (ticket) {
  this.name = ticket.name;
  this.description = ticket.description;
  this.acceptance_criteria = ticket.acceptance_criteria;
  this.priority = ticket.priority;
  this.create_date = ticket.create_date;
};

Ticket.create = (newTicket, result) => {
  sql.query("INSERT INTO ticket SET ?", newTicket, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created ticket: ", { id: res.insertId, ...newTicket });
    result(null, { id: res.insertId, ...newTicket });
  });
};

Ticket.findById = (id, result) => {
  sql.query(`SELECT * FROM ticket WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found ticket: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Ticket with the id
    result({ kind: "not_found" }, null);
  });
};

Ticket.getAll = (result) => {
  let query = "SELECT * FROM ticket";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tickets: ", res);
    result(null, res);
  });
};

Ticket.updateById = (id, ticket, result) => {
  sql.query(
    "UPDATE ticket SET name = ?, description = ?, acceptance_criteria = ?, priority = ? WHERE id = ?",
    [
      ticket.name,
      ticket.description,
      ticket.acceptance_criteria,
      ticket.priority,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Ticket with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated ticket: ", { id: id, ...ticket });
      result(null, { id: id, ...ticket });
    }
  );
};

Ticket.remove = (id, result) => {
  sql.query("DELETE FROM ticket WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Ticket with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted ticket with id: ", id);
    result(null, res);
  });
};

module.exports = Ticket;
