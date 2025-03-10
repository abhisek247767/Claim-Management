const Claim = require("../models/claim");

class ClaimRepository {
  async createClaim(data) {
    return await Claim.create(data);
  }

  async getAllClaims() {
    return await Claim.findAll();
  }

  async getClaimById(id) {
    return await Claim.findByPk(id);
  }

  async deleteClaim(id) {
    return await Claim.destroy({ where: { id } });
  }
}

module.exports = new ClaimRepository();
