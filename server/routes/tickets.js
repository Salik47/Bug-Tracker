const express = require("express");
const Ticket = require("../models/ticketModel");
const Project = require("../models/projectModel");
const User = require("../models/userModel");

const {
  auth,
  authAdmin,
  authDeveloper,
  authProjectManager,
} = require("../middleware/authMiddleware");

const router = express.Router();

// create a ticket
router.post("/create", auth, async (req, res) => {
  const { assignedDeveloper, project } = req.body;
  let assignedProject = Project.findById({ id: project });
  if (!assignedProject) {
    return res
      .status(404)
      .json({ success: false, message: "Specified project does not exist" });
  }

  let dev = User.findById({ id: assignedDeveloper });
  if (!dev) {
    return res
      .status(404)
      .json({ success: false, message: "Developer not found" });
  }
  if (dev.role !== "DEVELOPER") {
    return res
      .status(404)
      .json({ success: false, message: "Selected user is not a developer" });
  }

  const ticket = new Ticket(req.body);
  assignedProject.tickets.push(ticket.id);
  dev.assignedTickets.push(ticket.id);

  await ticket.save();
  await assignedProject.save();
  await dev.save();

  res.json({ success: true, message: "Ticket created", ticket });
});

// find a ticket

// view all tickets for a specified project - pm

// view all tickets for all projects - admin

// update ticket

// delete ticket

module.exports = router;
