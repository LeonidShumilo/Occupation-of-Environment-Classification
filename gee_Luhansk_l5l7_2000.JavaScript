//Import of training data feature collection and AOI polygon

//var table - imported training points with atribute "CLASS"
//var table2 - imported boundaries of the area of interest (Luhansk region)
var l8_raw2 = ee.ImageCollection("LANDSAT/LT05/C01/T1");
var l8_raw = ee.ImageCollection("LANDSAT/LT05/C01/T2");
var l7_1 = ee.ImageCollection("LANDSAT/LE07/C01/T1");

//Functions for the cloud masking and images processing

function CloudRemoval (image) {
  var removeCloud = image.mask(image.select('BQA').eq(672))
  return removeCloud
}

// Satellite images compositing

var l8_1_1 = l8_raw2.filterBounds(table2).filterDate('1999-05-01','1999-06-01').merge(l8_raw.filterBounds(table2).filterDate('1999-05-01','1999-06-01')).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_1_2 = l8_raw2.filterBounds(table2).filterDate('1999-05-01','1999-06-01').merge(l8_raw.filterBounds(table2).filterDate('1999-05-01','1999-06-01')).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_1 = ee.ImageCollection([l8_1_2,l8_1_1]).mosaic();

var l8_2_1 = l8_raw2.filterBounds(table2).filterDate('1999-06-01','1999-07-01').merge(l8_raw.filterBounds(table2).filterDate('1999-06-01','1999-07-01')).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_2_2 = l8_raw2.filterBounds(table2).filterDate('1999-06-01','1999-07-01').merge(l8_raw.filterBounds(table2).filterDate('1999-06-01','1999-07-01')).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_2 = ee.ImageCollection([l8_1,l8_2_1]).mosaic();

var l8_3_1 = l8_raw2.filterBounds(table2).filterDate('1999-07-01','1999-09-01').merge(l8_raw.filterBounds(table2).filterDate('1999-07-01','1999-09-01')).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_3_2 = l8_raw2.filterBounds(table2).filterDate('1999-07-01','1999-09-01').merge(l8_raw.filterBounds(table2).filterDate('1999-07-01','1999-09-01')).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_3 = ee.ImageCollection([l8_2,l8_3_1]).mosaic();

var l8_4_1 = l8_raw2.filterBounds(table2).filterDate('1999-09-01','1999-12-01').merge(l8_raw.filterBounds(table2).filterDate('1999-09-01','1999-12-01')).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_4_2 = l8_raw2.filterBounds(table2).filterDate('1999-09-01','1999-12-01').merge(l8_raw.filterBounds(table2).filterDate('1999-09-01','1999-12-01')).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_4 = ee.ImageCollection([l8_4_2,l8_4_1]).mosaic();

var l8_5_1 = l8_raw2.filterBounds(table2).filterDate('1999-03-01','1999-05-01').merge(l8_raw.filterBounds(table2).filterDate('1999-03-01','1999-05-01')).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_5_2 = l8_raw2.filterBounds(table2).filterDate('1999-03-01','1999-06-01').merge(l8_raw.filterBounds(table2).filterDate('1999-03-01','1999-05-01')).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_5 = ee.ImageCollection([l8_1,l8_5_1]).mosaic();

var l8_7_1 = l8_raw2.filterBounds(table2).filterDate('2000-07-01','2000-09-01').merge(l8_raw.filterBounds(table2).filterDate('2000-07-01','2000-09-01')).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_7_2 = l8_raw2.filterBounds(table2).filterDate('2000-07-01','2000-09-01').merge(l8_raw.filterBounds(table2).filterDate('2000-07-01','2000-09-01')).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_7 = ee.ImageCollection([l8_7_2,l8_7_1]).mosaic();

var l8_8_1 = l8_raw2.filterBounds(table2).filterDate('2000-04-01','2000-07-01').merge(l8_raw.filterBounds(table2).filterDate('2000-04-01','2000-07-01')).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_8_2 = l8_raw2.filterBounds(table2).filterDate('2000-04-01','2000-07-01').merge(l8_raw.filterBounds(table2).filterDate('2000-04-01','2000-07-01')).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_8 = ee.ImageCollection([l8_8_2,l8_8_1]).mosaic();

var l7_col = l7_1.filterBounds(table2).filterDate('1999-01-01','2001-01-01').merge(l7_2.filterBounds(table2).filterDate('1999-01-01','2001-01-01'));

var l8_12_1 = l7_col.filterBounds(table2).filterDate('1999-06-01','1999-11-01').merge(l8_raw.filterBounds(table2).filterDate('1999-06-01','1999-11-01')).map(CloudRemoval).select(['B1','B2','B3','B4','B5','B7']).median().clip(table2);
var l8_12_2 = l7_col.filterBounds(table2).filterDate('1999-05-01','1999-11-01').merge(l8_raw.filterBounds(table2).filterDate('1999-06-01','1999-11-01')).map(CloudRemoval).select(['B1','B2','B3','B4','B5','B7']).median().clip(table2);
var l8_12_3 = l7_col.filterBounds(table2).filterDate('1999-05-01','1999-11-01').merge(l8_raw.filterBounds(table2).filterDate('1999-06-01','1999-11-01')).select(['B1','B2','B3','B4','B5','B7']).median().clip(table2);

var l8_12 = ee.ImageCollection([l8_12_3,l8_12_2,l8_12_1]).mosaic();

var l8_13_1 = l7_col.filterBounds(table2).filterDate('2000-06-01','2000-09-01').merge(l8_raw.filterBounds(table2).filterDate('2000-06-01','2000-09-01')).map(CloudRemoval).select(['B1','B2','B3','B4','B5','B7']).median().clip(table2);
var l8_13_2 = l7_col.filterBounds(table2).filterDate('2000-03-01','2000-12-01').merge(l8_raw.filterBounds(table2).filterDate('2000-03-01','2000-12-01')).map(CloudRemoval).select(['B1','B2','B3','B4','B5','B7']).median().clip(table2);
var l8_13_3 = l7_col.filterBounds(table2).filterDate('2000-03-01','2000-12-01').merge(l8_raw.filterBounds(table2).filterDate('2000-03-01','2000-12-01')).select(['B1','B2','B3','B4','B5','B7']).median().clip(table2);

var l8_13 = ee.ImageCollection([l8_13_3,l8_13_2,l8_13_1]).mosaic();

//Merging of datasets

var l8_merged = l8_1.addBands(l8_2).addBands(l8_3).addBands(l8_4).addBands(l8_5).addBands(l8_7).addBands(l8_8).addBands(l8_12).addBands(l8_13);

//Sampling, model's training and classification 

var label = 'CLASS_2000'
var training = l8_merged.sampleRegions({
  collection: table,
  properties: [label],
  scale: 30
});
var trained = ee.Classifier.smileRandomForest(10).train(training, label)
var classified = l8_merged.classify(trained).clip(table2)

// Export resulting GeoTiff

Export.image.toDrive({
'image': classified,
'description': 'land_cover_classification',
'fileNamePrefix': 'Luhansk_L5L7_2000',
'scale': 30,
'region': table2,
'crs': 'EPSG:32636',
'maxPixels' : 10000000000000})





