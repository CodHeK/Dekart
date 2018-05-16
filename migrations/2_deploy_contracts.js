var ChainList = artifacts.require("./ChainList.sol");

module.exports = function(depolyer) {
  depolyer.depoly(ChainList);
}
