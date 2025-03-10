const ClaimService = require("../services/ClaimService");

class ClaimController {
  async createClaim(req, res) {
    try {
      const claim = await ClaimService.createClaim(req.body);
      res.status(201).json({ message: "Claim submitted successfully!", claim });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllClaims(req, res) {
    try {
      const claims = await ClaimService.getAllClaims();
      res.json(claims);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getClaimById(req, res) {
    try {
      const claim = await ClaimService.getClaimById(req.params.id);
      if (!claim) return res.status(404).json({ error: "Claim not found" });
      res.json(claim);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteClaim(req, res) {
    try {
      await ClaimService.deleteClaim(req.params.id);
      res.json({ message: "Claim deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ClaimController();
