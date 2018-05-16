pragma solidity ^0.4.18;

contract ChainList {

  address seller;
  string description;
  string name;
  uint256 price;


  function sellArticle(string _name, string _description, uint256 _price) public {
    seller = msg.address;
    name = _name;
    description = _description;
    price = _price;
  }

  function getArticle() public view returns (
    address _seller,
    string _description,
    string _name,
    uint256 _price
    ) {
      return(seller, name, description, price);
    }
}
