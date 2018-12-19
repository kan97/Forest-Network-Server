var express = require('express');
var router = express.Router();

const db = require('../connections/mongodb')
const userSchema = require('../models/user')
const postSchema = require('../models/post')

const {
  RpcClient
} = require('tendermint')
const client = RpcClient('wss://komodo.forest.network:443')

const {
  decode
} = require('../lib/tx/index');

// cách tuần tự
async function fetchAllBlocks() {
  for (let index = 1; index < 11000; index++) {
    res = await client.block({
      height: index
    });
    if (res.block.data.txs) {
      console.log(index);
      txs = decode(Buffer.from(res.block.data.txs[0], 'base64'))
      switch (txs.operation) {
        case 'create_account':
          // await userSchema.updateOne({
          //   public_key: txs.account
          // }, {
          //   $set: {
          //     sequence: txs.sequence,
          //   }
          // })
          // user = new userSchema({
          //   public_key: txs.params.address,
          // })
          // await user.save(function (err) {
          //   if (err) {
          //     console.log(err)
          //   }
          // })
          break;

        case 'payment':
          await userSchema.updateOne({
            public_key: txs.account
          }, {
            $set: {
              sequence: txs.sequence,
            },
            $inc: {
              balance: txs.params.amount * (-1),
            }
          })
          await userSchema.updateOne({
            public_key: txs.params.address
          }, {
            $inc: {
              balance: txs.params.amount,
            }
          })
          break;

        case 'post':

          break;

        case 'update_account':
          switch (txs.params.key) {
            // case 'name':
            //   await userSchema.updateOne({
            //     public_key: txs.account
            //   }, {
            //     $set: {
            //       sequence: txs.sequence,
            //       name: txs.params.value.toString('utf-8'),
            //     }
            //   })
            //   break;

            // case 'picture':
            //   await userSchema.updateOne({
            //     public_key: txs.account
            //   }, {
            //     $set: {
            //       sequence: txs.sequence,
            //       picture: 'data:image/jpeg;base64,' + txs.params.value.toString('base64'),
            //     }
            //   })
            //   break;

            // case 'followings':

            //   break;

            default:
              break;
          }

        case 'interact':

          break;

        default:
          break;
      }
    }
  }
}


/* GET home page. */
router.get('/', function (req, res, next) {
  fetchAllBlocks()
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;