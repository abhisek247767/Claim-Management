const ClaimRepository = require("../repositories/ClaimRepository");

class ClaimService {
  async createClaim(data) {
    return await ClaimRepository.createClaim(data);
  }

  async getAllClaims() {
    return await ClaimRepository.getAllClaims();
  }

  async getClaimById(id) {
    return await ClaimRepository.getClaimById(id);
  }

  async deleteClaim(id) {
    return await ClaimRepository.deleteClaim(id);
  }
}

module.exports = new ClaimService();
