import getQuerieString from 'utility/getQuerieString';
define(function(require) {
  function getDistributor() {
    let {productowner} = getQuerieString();
    var vendor = window.location.host.replace(/\..+/, '') || 'cavalier';
    var owner;
    var url;
    var distributor;
    var vendorNames;
    var prodcutOwnerQuery;
    switch (vendor) {
    case 'cavalier':
        vendor = "cavalier";
        url = 'http://cavbeer.com/';
        distributor = "cavalier";
        break;
    case 'jackieos':
        vendor = "Jackie O's";
        vendorNames=["jackie o's", "jackie o's", "jackieos", "jackieos"];
        owner = true;
        url = 'http://jackieos.com/';
        distributor = "cavalier";
        break;
    case 'fatheads':
        vendor = "Fat Head's Brewery";
        url = 'http://cavbeer.com/';
        owner = true;
        break;
    case 'localhost:8585':
        vendor = "cavalier";
        url = 'http://cavbeer.com/';
        distributor = "cavalier";
        break;
    }

    if (productowner) {
      const productownerTL = productowner.toLowerCase();
      vendorNames = [productownerTL.replace(/ /g, ''), productownerTL.replace("'", ''), productownerTL.replace('brewery', ''), productownerTL.replace('brewing', ''), productownerTL.replace('co.', ''),productownerTL.replace('co', ''), productownerTL.replace('company', '')]
      owner = true;
      vendor = productowner;
      prodcutOwnerQuery = true;
    }

    return {
      vendor: vendor,
      owner: owner,
      url: url,
      distributor: distributor,
      vendorNames: vendorNames,
      prodcutOwnerQuery: prodcutOwnerQuery 
    };
  }

  return {
    getDistributor: getDistributor
  };

});