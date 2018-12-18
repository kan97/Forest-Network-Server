var express = require('express');
var router = express.Router();

const db = require('../connections/mongodb')
const userSchema = require('../models/user')
const postSchema = require('../models/post')

const {
  RpcClient
} = require('tendermint')
const client = RpcClient('wss://komodo.forest.network:443')

const { decode } = require('../lib/tx/index');

// save Kha account
user = new userSchema({
  public_key: 'GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI',
  balance: 9007199254740991,
})
user.save(function(err) {
  if(err) {
    console.log(err)
  }
})

// cách tuần tự
async function fetchAllBlocks() {
  for (let index = 1; index < 11000; index++) {
    res = await client.block({ height: index });
    if (res.block.data.txs) {
      console.log(index, res.block.data.txs.length);
      txs = decode(Buffer.from(res.block.data.txs[0], 'base64'))
      switch (txs.operation) {
        case 'create_account':
          transactions = userSchema.find(e => e.public_key === txs.account).transactions
          userSchema.updateOne(
            {public_key: txs.account},
            {
              $set: {
                sequence: txs.sequence,
                transactions: transactions + 1,
              }
            }
          )
          user = new userSchema({
            public_key: txs.params.address,
          })
          user.save(function(err) {
            if(err) {
              console.log(err)
            }
          })
          break;
      
        case 'payment':
        
          break;

        case 'post':
        
          break;

        case 'update_account':
        
          break;

        case 'interact':
        
          break;

        default:
          break;
      }
    }
  }
}


/* GET home page. */
router.get('/', function(req, res, next) {
  fetchAllBlocks()
  res.render('index', { title: 'Express' });
});

module.exports = router;
