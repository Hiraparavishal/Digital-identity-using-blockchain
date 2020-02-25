const SHA256 = require('crypto-js/sha256');
function Block(time,data,prehash='') {
    this.index = 0;
    this.data = data;
    this.time = time;
    this.hash = this.calculatehash();
    this.prehash = prehash;
    this.sub = 'no';
  }
  // Sets the age
  // 
  Block.prototype.calculatehash = function() {
    return SHA256(this.index + this.time + JSON.stringify(this.data) + this.time).toString();
  };
  module.exports =Block;