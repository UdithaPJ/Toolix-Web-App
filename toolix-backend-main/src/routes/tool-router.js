const express = require("express");

const ToolController = require("../controller/tool-controller");

const Validator = require("../validation/tool-validator");

const {
  checkAdminToken,
  checkAllToken,
} = require("../middlewares/admin-middleware");

const router = express.Router();

router
  .route("/")
  .post(checkAdminToken, Validator.toolCreate, ToolController.createTool);

router.route("/").get(checkAllToken, ToolController.getTools);

router
  .route("/:id")
  .put(checkAdminToken, Validator.toolUpdate, ToolController.updateTool);

router.route("/:id").delete(checkAdminToken, ToolController.deleteTool);

module.exports = router;
