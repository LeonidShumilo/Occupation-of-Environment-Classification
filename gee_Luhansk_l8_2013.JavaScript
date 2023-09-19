//Import of training data feature collection and AOI polygon

//var table - imported training points with atribute "CLASS"
//var table2 - imported boundaries of the area of interest (Luhansk region)
var region = table2;
var train_set = table

//Functions for the cloud masking and images processing

function maskL8sr(image) {
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  var qa = image.select('pixel_qa');
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}

var bb = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7']; //Bands for selection

// Satellite images compositing

var dataset1 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').filterDate('2013-04-01', '2013-06-01').map(maskL8sr).select(bb).median().clip(region);
var dataset2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').filterDate('2013-06-01', '2013-07-01').map(maskL8sr).select(bb).median().clip(region);
var dataset3 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').filterDate('2013-07-01', '2013-09-01').map(maskL8sr).select(bb).median().clip(region);
var dataset4 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').filterDate('2013-08-01', '2013-12-01').map(maskL8sr).select(bb).median().clip(region);

//Merging of datasets

var dataset = dataset1.addBands(dataset2).addBands(dataset3).addBands(dataset4).clip(region);
Map.addLayer(dataset)

var train_set = train_set.filterBounds(region);
train_set = train_set.map(function(f) { return f.buffer(15)});

var training_scale = 10;
var training_property = 'CLASS';

var training = dataset.sampleRegions(train_set, null, training_scale);

var trained = ee.Classifier.randomForest(100).train(training, training_property);
var classified = dataset.classify(trained).clip(region);


Export.image.toDrive({
  image: classified.toByte(),
  description: 'Luhansk_2013',
 'fileNamePrefix': 'composites_2013',
  scale: 30,
  region: region,
  fileFormat: 'GeoTIFF',
  'crs': 'EPSG:32636',
  'maxPixels' : 10000000000000,
  formatOptions: {
    cloudOptimized: true
  }
});
