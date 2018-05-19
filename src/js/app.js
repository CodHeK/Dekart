App = {
     web3Provider: null,
     contracts: {},
     account: 0x0,

     init: function() {

          return App.initWeb3();
     },

     initWeb3: function() {

          //if web3 not injected by metamask automatically
          if(typeof web3 !== 'undefined') {
            //using the web3 provider injected by metamask
            App.web3Provider = web3.currentProvider;
          }
          else {
            //we need to create new Provider and plug it directly into our local node
            App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
          }

          web3 = new Web3(App.web3Provider);

          App.displayAccountInfo();

          return App.initContract();
     },

     displayAccountInfo: function() {
       web3.eth.getCoinbase(function(err, account) {
         if(err === null) {
           App.account = account;
           $("#account").text(account);
           web3.eth.getBalance(account, function(err, balance) {
             if(err === null) {
               $("#accountBalance").text(web3.fromWei(balance, "ether") + " ETH");
             }
           });
         }
       });
     },

     initContract: function() {
        $.getJSON('ChainList.json', function(ChainListArtifact) {
          //get the artifact file and use it to instantiate a truffle contract abstraction
          App.contracts.ChainList = TruffleContract(ChainListArtifact);
          //set provider for our contract
          App.contracts.ChainList.setProvider(App.web3Provider);
          //retrive the article from the contract
          return App.reloadArticles();
        });
     },

     reloadArticles: function() {
       //refresh acc info
       App.displayAccountInfo();

       //clear the article placeholder
       $("#articlesRow").empty();

       App.contracts.ChainList.deployed().then(function(instance) {
         return instance.getArticle();
       }).then(function(article) {
         if(article[0] == 0x0) { //still unset in intial state, no article to display
           //no articles to display
           return;
         }


         var articleTemplate = $("#articleTemplate");

         articleTemplate.find(".panel-title").text(article[1]);
         articleTemplate.find(".article-description").text(article[2]);
         articleTemplate.find(".article-price").text(web3.fromWei(article[3], "ether"));

         var seller = article[0];
         if(seller == App.account) {
           seller = "YOU";
         }
         articleTemplate.find(".article-seller").text(seller);


         $("#articlesRow").append(articleTemplate.html());
       }).catch(function(err) {
         console.error(err.message);
       })
     },
};

$(function() {
     $(window).load(function() {
          App.init();
     });
});
