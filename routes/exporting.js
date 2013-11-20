var path = require('path');
var phantom = require('node-phantom');
var fs = require('fs');

exports.renderPng = function(req, res) {
  chartData = JSON.parse(req.body.chart);
  res.render('export', {
    title: 'PNG',
    chart: chartData
  });
};

exports.exportPng = function(req, res) {
  var data = "chart="+JSON.stringify(req.body.chart);
  var host = req.protocol + '://' + req.get('Host');
  var url = host+"/render/png";

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

          page.render('page.png', function (error) {
            if (error) {
              console.log('Error rendering PDF: %s', error);
            } else {
              res.download('page.png');
            }
          });

          ph.exit();
        });

      });

    });
  });

};


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
      page.setPaperSize({ width: '800px', height: '600px', border: '0px' },
        function(err) {

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


function convert2Str(data, separator) {
  var res = "";
  if(data.length) {

    var keys = Object.keys(data[0]);
    res += keys.join(separator)+"\n";

    data.forEach(function(item) {
      var values = keys.map(function(key){
        return item[key];
      });
      res += values.join(separator)+"\n";
    });

  }

  return res;
}

exports.exportXls = function(req, res) {
  var chart = JSON.parse(req.body.chart);
  var fileName = 'page.xls';

  fs.writeFile(fileName, convert2Str(chart.data, "\t"), function(err) {
    if(err) {
      console.log(err);
    } else {
      res.download(fileName);
    }
  });
};

exports.exportCsv = function(req, res) {
  var chart = JSON.parse(req.body.chart);
  var fileName = 'page.csv';

  fs.writeFile(fileName, convert2Str(chart.data, ","), function(err) {
    if(err) {
      console.log(err);
    } else {
      res.download(fileName);
    }
  });
};

