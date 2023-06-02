//var table - imported training points with atribute "CLASS"
//var table2 - imported boundaries of the area of interest (Luhansk region)
var l8_raw2 = ee.ImageCollection("LANDSAT/LT05/C01/T1");
var start_date = '1996-08-01';
var end_date = '1996-11-01';
var step = 30;
function CloudRemoval (image) {
  var removeCloud = image.mask(image.select('BQA').eq(672))
  return removeCloud
}
var l8_1_1 = l8_raw2.filterBounds(table2).filterDate('1996-08-01','1996-09-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_1_2 = l8_raw2.filterBounds(table2).filterDate('1996-08-01','1996-09-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_1 = ee.ImageCollection([l8_1_2,l8_1_1]).mosaic();

var l8_3_1 = l8_raw2.filterBounds(table2).filterDate('1996-04-01','1996-05-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_3_2 = l8_raw2.filterBounds(table2).filterDate('1996-04-01','1996-05-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_3 = ee.ImageCollection([l8_3_2,l8_3_1]).mosaic();

var l8_5_1 = l8_raw2.filterBounds(table2).filterDate('1996-09-01','1996-11-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_5 = ee.ImageCollection([l8_1,l8_5_1]).mosaic();

var l8_6_1 = l8_raw2.filterBounds(table2).filterDate('1995-06-01','1995-07-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_6_2 = l8_raw2.filterBounds(table2).filterDate('1995-06-01','1995-07-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_6 = ee.ImageCollection([l8_6_2,l8_6_1]).mosaic();

var l8_7_1 = l8_raw2.filterBounds(table2).filterDate('1995-06-01','1995-07-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_7 = ee.ImageCollection([l8_6,l8_7_1]).mosaic();

var l8_8_1 = l8_raw2.filterBounds(table2).filterDate('1995-07-01','1995-08-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_8_2 = l8_raw2.filterBounds(table2).filterDate('1995-07-01','1995-08-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_8 = ee.ImageCollection([l8_7,l8_8_1]).mosaic();

var l8_9_1 = l8_raw2.filterBounds(table2).filterDate('1995-08-01','1995-09-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_9_2 = l8_raw2.filterBounds(table2).filterDate('1995-08-01','1995-09-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_9 = ee.ImageCollection([l8_8,l8_9_1]).mosaic();

var l8_10_1 = l8_raw2.filterBounds(table2).filterDate('1995-09-01','1995-10-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_10_2 = l8_raw2.filterBounds(table2).filterDate('1995-09-01','1995-10-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_10 = ee.ImageCollection([l8_9,l8_10_1]).mosaic();
//Map.addLayer(l8_9)


var l8_merged = l8_1.addBands(l8_3).addBands(l8_6).addBands(l8_8).addBands(l8_9).addBands(l8_10);
Map.addLayer(l8_merged)

var label = 'CLASS_1996'
Map.addLayer(table)
print(l8_merged)
var training = l8_merged.sampleRegions({
  collection: table,
  properties: [label],
  scale: 30
});
print(training)
var trained = ee.Classifier.smileRandomForest(10).train(training, label)
var classified = l8_merged.classify(trained).clip(table2)
print(classified)
Map.addLayer(classified.randomVisualizer(), {}, 'crop classification')

Export.image.toDrive({
'image': classified,
'description': 'Luhansk_1996',
'fileNamePrefix': 'composites_1996',
'scale': 30,
'region': table2,
'crs': 'EPSG:32636',
'maxPixels' : 10000000000000})
