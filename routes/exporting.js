var path = require('path');

var phantom = require('node-phantom');

var chartData = {};

exports.renderPdf = function(req, res) {
  // console.log(req.body);
  // chartData = req.body.chart;
  res.render('export', {
    title: 'PDF',
    chart: chartData
  });
};

exports.exportPdf = function(req, res) {
  console.log(req.body);
  chartData = req.body.chart;

  phantom.create(function (error, ph) {
    if(!ph) {
      res.status(500);
      console.log('no PhantomJS');
      return;
    }

    ph.createPage(function (error, page) {
      var data = "pass=my_pass";
      var port = req.app.settings.port || cfg.port;
      // var host = req.protocol + '://' + req.host  + ( port == 80 || port == 443 ? '' : ':'+port );

      // no port for heroku deployment
      var host = req.protocol + '://' + req.host;
      var url = host+"/render/pdf";

      page.post(url, data, function(err, status) {
      // page.open("http://localhost:3000/", function(status) {
        console.log("opened page? ", status, err, url);
          page.render('page.pdf', function (error) {
            if (error) {
              console.log('Error rendering PDF: %s', error);
            } else {
              res.download('page.pdf');
            }
          });

        ph.exit();
      });

      // page.set('content', html, function (error) {
      //   ph.exit();
      // });
    });
  });

};

