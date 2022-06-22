const express = require("express");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Project = require("../models/projectModel");
const {
  auth,
  authAdmin,
  authDeveloper,
  authProjectManager,
} = require("../middleware/authMiddleware");
const authService = require("../services/authService");

const router = express.Router();

// get logged in user details
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.userId)
    .select("-password")
    .populate("assignedProject");

  const tickets = [];
  for (const tid of user.assignedTickets) {
    tickets.push(await Ticket.findById(tid));
  }

  user.assignedTickets = tickets;

  res.json({ success: true, message: "User details", user });
});

// get all users
router.get("/all", authAdmin, async (req, res) => {
  const users = await User.find()
    .select("-password")
    .populate("assignedProject");
  const otherUsers = users.filter((user) => user.id !== req.user.userId);
  res.json({
    success: true,
    message: `Found ${otherUsers.length} other users`,
    otherUsers,
  });
});

// register || sign up user
router.post("/register", async (req, res) => {
  const { name, email, password, role = "DEFAULT" } = req.body;

  const emailTaken = await User.findOne({ email });
  if (emailTaken) {
    return res
      .status(400)
      .json({ success: false, message: "User email already registered" });
  }

  if ("DEFAULT" === role || "PROJECT_MANAGER" === role || "ADMIN" === role) {
    assignedTickets = null;
  }
  if ("DEVELOPER" !== role || "PROJECT_MANAGER" !== role) {
    assignedProject = null;
  }

  const user = new User({ name, email, password, role });
  await user.save();

  res.json({ success: true, message: "User registered" });
});

// login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const validPassword = await User.comparePassword(password, user?.password);

  if (!validPassword) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid email or password" });
  }

  authService.login(req, res, user);

  res.json({ success: true, message: "User logged in" });
});

// logout user
router.post("/logout", async (req, res) => {
  authService.logout(req, res);
  res.json({ success: true, message: "User logged out" });
});

// update user role
router.put("/update/role", authAdmin, async (req, res) => {
  const { userId, role } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User was not found" });
  }

  if ("DEFAULT" === role || "PROJECT_MANAGER" === role || "ADMIN" === role) {
    assignedTickets = null;
  }
  if ("DEVELOPER" !== role || "PROJECT_MANAGER" !== role) {
    assignedProject = null;
  }

  user.role = role;
  await user.save();

  res.json({ success: true, message: "User role updated" });
});

// assign project to user
router.put("/assign/project", authAdmin, async (req, res) => {
  const { userId, projectId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User was not found" });
  }

  const project = await Project.findById(projectId);
  if (!project) {
    return res
      .status(404)
      .json({ success: false, message: "Project was not found" });
  }

  user.assignedProject = project._id;
  await user.save();

  project.developers = [...project.developers, user._id];
  await project.save();

  res.json({ success: true, message: "Project assigned to user" });
});

// assign ticket to user
router.put("/assign/ticket", authAdmin, async (req, res) => {
  const { userId, ticketId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User was not found" });
  }

  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    return res
      .status(404)
      .json({ success: false, message: "Ticket was not found" });
  }

  user.assignedTickets = [...user.assignedTickets, ticket._id];
  await user.save();

  ticket.assignedDeveloper = user._id;
  await ticket.save();

  res.json({ success: true, message: "Ticket assigned to user" });
});

module.exports = router;
