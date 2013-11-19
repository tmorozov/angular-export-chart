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
    ph.createPage(function (error, page) {
      var data = "pass=my_pass";
      page.post("http://localhost:3000/render/pdf", data, function(err, status) {
      // page.open("http://localhost:3000/", function(status) {
        console.log("opened page? ", status);
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

