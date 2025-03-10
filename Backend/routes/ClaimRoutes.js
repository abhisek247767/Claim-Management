const express = require("express");
const ClaimController = require("../controllers/ClaimController");

const router = express.Router();

router.post("/claims", ClaimController.createClaim);
router.get("/claims", ClaimController.getAllClaims);
router.get("/claims/:id", ClaimController.getClaimById);
router.delete("/claims/:id", ClaimController.deleteClaim);

module.exports = router;
