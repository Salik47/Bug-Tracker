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

const router = express.Router();

// get projects based on user role logged in
// admin - all projects
// project manager, developer - assigned project
router.get("/", auth, async (req, res) => {
  const { userId, role } = req.user;

  if (role === "DEFAULT") {
    return res
      .status(400)
      .json({ success: false, message: "User role is not set" });
  }

  let searchQuery = {}; // also for ADMIN
  if (role === "DEVELOPER") {
    searchQuery = { developers: userId };
  } else if (role === "PROJECT_MANAGER") {
    searchQuery = { projectManager: userId };
  }

  const projects = await Project.find(searchQuery)
    .populate("projectManager", "-password")
    .populate("admin", "-password");

  const developers = [];
  for (const project of projects) {
    for (const did of project.developers) {
      developers.push(await User.findById(did).select("-password"));
    }
    projects.developers = developers;
  }

  res.json({
    success: true,
    message: `Found ${project.length} projects`,
    projects,
  });
});

// create project
router.post("/", authAdmin, async (req, res) => {
  const { projectName, projectManager, status } = req.body;

  let projectDoc = { projectName, status, admin: req.user.userId };

  if (projectManager) {
    const projectManagerUser = await User.findById(projectManager);
    if (!projectManager) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid project manager id" });
    }
    projectDoc = { ...projectDoc, projectManager };
  }

  const project = new Project(projectDoc);
  await project.save();

  res.json({ success: true, message: "Project created", project });
});

// get project by id
router.get("/:projectId", auth, async (req, res) => {
  const { userId, role } = req.user;

  if (role === "DEFAULT") {
    return res
      .status(400)
      .json({ success: false, message: "User role is not set" });
  }

  const { projectId } = req.params;

  let searchQuery = { _id: projectId }; // also for ADMIN
  if (role === "DEVELOPER") {
    searchQuery = { ...searchQuery, developers: userId };
  } else {
    searchQuery = { ...searchQuery, projectManager: userId };
  }

  const project = await Project.findOne(searchQuery)
    .populate("projectManager", "-password")
    .populate("admin", "-password");

  if (!project) {
    return res
      .status(404)
      .json({ success: false, message: "Project not found" });
  }

  const developers = [];
  for (const did of project.developers) {
    developers.push(await User.findById(did).select("-password"));
  }
  project.developers = developers;

  res.json({ success: true, message: "Project found", project });
});

// TODO: update project by id
// TODO: delete project by id

module.exports = router;
