// var child_process, createScreenshot, phantom, url;

// phantom = require('phantom');

// child_process = require('child_process');

// url = process.argv[2];
// url = "http://localhost:3000/"

// createScreenshot = function(page, filename) {
//   return page.render(filename, function() {
//     child_process.exec("open " + filename);
//     return process.exit();
//   });
// };

// phantom.create(function(ph) {
//   return ph.createPage(function(page) {
//     page.set('viewportSize', {
//       width: 1000,
//       height: 1000
//     });
//     page.set('clipRect', {
//       top: 0,
//       left: 0,
//       width: 1000,
//       height: 1000
//     });
//     console.log("Opening " + url + " ...");
//     return page.open(url, function(status) {
//       console.log("Rendering screenshot ...");
//       return setTimeout((function() {
//         return createScreenshot(page, 'output.png');
//       }), 1000);
//     });
//   });
// });


exports.renderPdf = function(req, res){
  res.render('export', { title: 'PDF' });
};

exports.exportPdf = function(req, res){
  res.redirect('/exports/test.txt');
};