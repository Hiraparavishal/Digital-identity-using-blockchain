const SHA256 = require('crypto-js/sha256');
var block = require('./blockchain2.js/index.js');



  function BlockChain(){
    this.chain = [this.firstblock()];
    
  }
  BlockChain.prototype.firstblock= function(){
    return new block(1,"12512","first-block","000");
  };
BlockChain.prototype.getLastBlock= function(){
    return this.chain[this.chain.length - 1];
  }
    

  BlockChain.prototype.getBlock = function(n){
    return this.chain[n];
  }
    BlockChain.prototype.getSubBlock = function(hash){
        for(this.i=0;this.i<this.chain.length+1;this.i=this.i+1){
             
            if(this.chain[this.i].prehash == hash){
                if(this.chain[this.i].sub == 'yes' ){
                     return this.chain[this.i];
                }
                
             }
         }
    }
   BlockChain.prototype.getMainBlock= function(hash){
    for(this.i=0;this.i<this.chain.length+1;this.i=this.i+1){
            
        if(this.chain[this.i].hash == hash){
            return this.chain[this.i];
         }
     }
   }
    BlockChain.prototype.addBlock= function(newBlock){
        newBlock.index = this.getLastBlock().index + 1;
        newBlock.prehash = this.getLastBlock().hash;
        newBlock.hash = newBlock.calculatehash();
        this.chain.push(newBlock);
    }
    BlockChain.prototype.addSubBlock= function(newBlock,preh){
        newBlock.sub = 'yes';
        newBlock.index = this.getLastBlock().index + 1;
        newBlock.prehash = preh;
        newBlock.hash = newBlock.calculatehash();
        this.chain.push(newBlock);
    }
    BlockChain.prototype.getLength = function(){
        return this.getLastBlock().index + 1;
    }
   module.exports = BlockChain;
    
    