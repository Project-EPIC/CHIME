
var fs = require('fs');

var _ = require('lodash');

var geojson = JSON.parse(fs.readFileSync("hurricane-matthew-36k-geotagged-keyword.geojson"))

console.error("Read " + geojson.features.length + " features")


geojson.features.forEach(function(feat){

  feat.properties.seconds = Date.parse(feat.properties.time)/1000

  delete feat.properties.time
  delete feat.properties.text

})

fs.writeFileSync('thousand_sample.geojson', JSON.stringify({"type":"FeatureCollection","features":geojson.features.slice(0,1000)}));

fs.writeFileSync('simplified.geojson', JSON.stringify(geojson));

var times = _.map(geojson.features, function(f){
  return +f.properties.seconds
})

console.log("MIN: " + _.min(times) + " MAX: " + _.max(times))
