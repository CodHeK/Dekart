var ChainList = artifacts.require("./ChainList.sol");

module.exports = function(depolyer) {
  depolyer.deploy(ChainList);
}
