//var geometry - imported boundaries of the area of interest (Luhansk region)
//var train_set - imported training points with atribute "CLASS"
function maskL8sr(image) {
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  var qa = image.select('pixel_qa');
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}

var rg = ['B4', 'B3', 'B2'];
var bb = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'];

var dataset1 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate('2013-03-01', '2014-04-30')
                  .map(maskL8sr).select(bb);

var dataset1 = (dataset1.median()).clip(kiev_reg_districts).select(bb);


var dataset2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate('2014-05-01', '2014-05-30')
                  .map(maskL8sr).select(bb);

var dataset2 = (dataset2.median()).clip(kiev_reg_districts).select(bb);

var rgbVis = {
  min: 0,
  max: 3000,
  bands: rg,
};
var dataset = dataset1.addBands(dataset2).clip(geometry);
var train_set = train_set.filterBounds(kiev_reg_districts);
train_set = train_set.map(function(f) { return f.buffer(15)});
var s1stack = (dataset);
var training_scale = 10;
var training_property = 'CLASS';
var training = s1stack.sampleRegions(train_set, null, training_scale);

var trained = ee.Classifier.randomForest(100).train(training, training_property);
var classified = s1stack.classify(trained).clip(geometry);
Export.image.toDrive({
  image: classified.toByte(),
  description: 'Luhansk_2014',
 'fileNamePrefix': 'Luhansk_2014',
  scale: 30,
  region: geometry,
  fileFormat: 'GeoTIFF',
  'maxPixels' : 10000000000000,
  formatOptions: {
    cloudOptimized: true
  }
});
