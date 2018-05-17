var ChainList = artifacts.require("./ChainList.sol");

contract('ChainList', function(accounts) {
  var ChainListInstance;
  var seller = accounts[1];
  var articleName = "article 1";
  var articleDescription = "description of article 1";
  var articlePrice = 10;

  it("should be initialzed with empty values", function() {
    return ChainList.deployed().then(function(instance) {
      return instance.getArticle();
    }).then(function(data) {
      assert.equal(data[0], 0x0, "seller must be empty");
      assert.equal(data[1], "", "article name must be empty");
      assert.equal(data[2], "", "article description must be empty");
      assert.equal(data[3].toNumber(), 0, "article price must be zero")
    })
  });

  it("should sell an article", function() {
    return ChainList.deployed().then(function(instance) {
      ChainListInstance = instance;
      return ChainListInstance.sellArticle(articleName, articleDescription, web3.toWei(articlePrice, "ether"), { from: seller })
    }).then(function() {
      return ChainListInstance.getArticle();
    }).then(function(data) {
      assert.equal(data[0], seller, "seller must be sellers address");
      assert.equal(data[1], articleName, "article name must not be empty");
      assert.equal(data[2], articleDescription, "article description must not be empty");
      assert.equal(data[3].toNumber(), web3.toWei(articlePrice, "ether"), "article price must not be zero")
    })
  });
});
