/**
 * An express server providing a fake GitHub stats endpoint
 * for use in delivering the presentation offline.
 */

var cors = require('cors');
var express = require('express');
var fs = require('fs');

var app = express();
app.use(cors());
app.get('/repos/:organization/:repo/stats/participation', function (req, res) {
  var org = req.params['organization'].toLowerCase();
  var repo = req.params['repo'].toLowerCase();
  var repoDataFile = 'data/' + org + '-' + repo + '.json';
  fs.readFile(repoDataFile, 'utf8', function (err, data) {
    if (err) {
      res.status(500).json({message: 'Failed to load JSON data for repo: ' + err.message});
      return;
    }
    try {
      var json = JSON.parse(data);
      res.json(json);
    } catch (err) {
      res.status(500).json({message: 'Failed to decode JSON data for repo: ' + err.message});
    }
  });
});

var PORT = 3002;
app.listen(PORT, function () {
  console.log('Fake GitHub API server is listening at http://localhost:' + PORT);
});

