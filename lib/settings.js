/**
* The Settings Module reads the settings out of settings.json and provides
* this information to the other modules
*/

var fs = require("fs");
var jsonminify = require("jsonminify");


//The app title, visible e.g. in the browser window
exports.title = "Ladacoin";

//The url it will be accessed from
exports.address = "explorer.exip.net";

// logo
exports.logo = "/images/logo.png";


//The app favicon fully specified url, visible e.g. in the browser window
exports.favicon = "favicon.ico";

//Theme
exports.theme = "Cyborg";

//The Port ep-lite should listen to
exports.port = process.env.PORT || 3001;


//coin symbol, visible e.g. MAX, LTC, HVC
exports.symbol = "LDC";


//coin name, visible e.g. in the browser window
exports.coin = "Ladacoin";


//This setting is passed to MongoDB to set up the database
exports.dbsettings = { 
  "user": "iquidus",
  "password": "Mine3xp!0reR",
  "database": "explorerdb", 
  "address" : "localhost", 
  "port" : 27017 
};


//This setting is passed to the wallet 
exports.wallet = { "host" : "127.0.0.1", 
  "port" : 8833, 
  "user" : "ladacoinrpc", 
  "pass" : "password"
};


//Locale file
exports.locale = "locale/en.json",


//Menu items to display
exports.display = { 
  "api": true, 
  "market": true, 
  "twitter": true, 
  "search": true,  
  "richlist": true
};


//API view
exports.api = {
    "blockindex": 1,
    "blockhash": "6c33265c5c85807c289982a19591d1093cb7c135b8035acf155019c778edc039",
    "txhash": "11e9c174e91030491101605a37ab911e59b2b05c5f5e4c133afeca12ef4c2a41",
    "address": "1LxME4EQaqsBDkUkpVQr5sZxP1R28shKPs",
};
  
// markets
exports.markets = {
  "coin": "LDC",
  "exchange": "BTC",
  "enabled": [],
  "default": ""
};

// richlist/top100 settings
exports.richlist = {
  "distribution": true,
  "received": true,
  "balance": true
};

//index
exports.index = {
  "show_hashrate": false,
  "difficulty": "POW",
  "last_txs": 100
};

// twitter
exports.twitter = "iquidus";
exports.confirmations = 6;

//timeouts
exports.update_timeout = 125;
exports.check_timeout = 250;


//genesis
exports.genesis_tx = "7a756f67df28090833de8df9c15f36f9637306809443b3065dec5db903210566";
exports.genesis_block = "d77cb63a40042d73a83142383c7872c123cda7253db1d9c0effc8a029ca857b2";

exports.heavy = false;
exports.txcount = 100;
exports.show_sent_received = true;
exports.supply = "BALANCES";
exports.nethash = "getnetworkhashps";
exports.nethash_units = "G";

exports.labels = {};

exports.reloadSettings = function reloadSettings() {
  // Discover where the settings file lives
  var settingsFilename = "settings.json";
  settingsFilename = "./" + settingsFilename;

  var settingsStr;
  try{
    //read the settings sync
    settingsStr = fs.readFileSync(settingsFilename).toString();
  } catch(e){
    console.warn('No settings file found. Continuing using defaults!');
  }

  // try to parse the settings
  var settings;
  try {
    if(settingsStr) {
      settingsStr = jsonminify(settingsStr).replace(",]","]").replace(",}","}");
      settings = JSON.parse(settingsStr);
    }
  }catch(e){
    console.error('There was an error processing your settings.json file: '+e.message);
    process.exit(1);
  }

  //loop trough the settings
  for(var i in settings)
  {
    //test if the setting start with a low character
    if(i.charAt(0).search("[a-z]") !== 0)
    {
      console.warn("Settings should start with a low character: '" + i + "'");
    }

    //we know this setting, so we overwrite it
    if(exports[i] !== undefined)
    {
      exports[i] = settings[i];
    }
    //this setting is unkown, output a warning and throw it away
    else
    {
      console.warn("Unknown Setting: '" + i + "'. This setting doesn't exist or it was removed");
    }
  }

};

// initially load settings
exports.reloadSettings();
