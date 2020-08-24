var express = require('express')
var path = require('path')
var router = express.Router()
var loadSentences = require('../public/javascripts/sentences')
var $ = require('jquery')
// import 'jquery-sortablejs'
var Sortable = require('sortablejs')

// const test = wio.findOne()
// console.log(test)

var sentences = loadSentences([
  { code: "The first sentence.", words: "The first sentence."},
  { code: "The second sentence.", words: "The second sentence."},
  // { code: "git add <filename>", words: "Add files to the INDEX." },
  // { code: 'git commit -m "commit message"', words: "Commit the changes to the HEAD." },
  // { code: "git push origin master", words: "Send the changes to the remote repository." },
  // { code: "git branch feature_x", words: 'Create a new branch named "feature_x".'},
  // { code: "git merge feature_x", words: 'Merge branch named "feature_x" into your active branch.' },
])

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals = { sentences }
  res.render('index')
  res.sendFile(path.join(__dirname, '/', '../public', 'index.html'))

})

module.exports = router
