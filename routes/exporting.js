var path = require('path');

var phantom = require('node-phantom');

exports.renderPdf = function(req, res) {
  chartData = JSON.parse(req.body.chart);
  res.render('export', {
    title: 'PDF',
    chart: chartData
  });
};

exports.exportPdf = function(req, res) {
  var data = "chart="+JSON.stringify(req.body.chart);
  var host = req.protocol + '://' + req.get('Host');
  var url = host+"/render/pdf";

  phantom.create(function (error, ph) {
    if(!ph) {
      res.status(500);
      console.log('no PhantomJS');
      return;
    }

    ph.createPage(function (error, page) {

      page.setViewport({width: 640, height: 480}, function(err) {

        page.post(url, data, function(err, status) {
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

      });

    });
  });

};

