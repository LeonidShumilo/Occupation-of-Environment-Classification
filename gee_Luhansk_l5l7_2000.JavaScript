//var table - imported training points with atribute "CLASS"
//var table2 - imported boundaries of the area of interest (Luhansk region)
var l8_raw2 = ee.ImageCollection("LANDSAT/LT05/C01/T1");
var l7_1 = ee.ImageCollection("LANDSAT/LE07/C01/T1");
function CloudRemoval (image) {
  var removeCloud = image.mask(image.select('BQA').eq(672))
  return removeCloud
}

var l8_1_1 = l8_raw2.filterBounds(table2).filterDate('1999-05-01','1999-06-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_1_2 = l8_raw2.filterBounds(table2).filterDate('1999-05-01','1999-06-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_1 = ee.ImageCollection([l8_1_2,l8_1_1]).mosaic();
//Map.addLayer(l8_1)
var l8_2_1 = l8_raw2.filterBounds(table2).filterDate('1999-06-01','1999-07-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_2_2 = l8_raw2.filterBounds(table2).filterDate('1999-06-01','1999-07-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_2 = ee.ImageCollection([l8_1,l8_2_1]).mosaic();
//Map.addLayer(l8_2)

var l8_3_1 = l8_raw2.filterBounds(table2).filterDate('1999-07-01','1999-09-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_3_2 = l8_raw2.filterBounds(table2).filterDate('1999-07-01','1999-09-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_3 = ee.ImageCollection([l8_2,l8_3_1]).mosaic();
//Map.addLayer(l8_3)

var l8_4_1 = l8_raw2.filterBounds(table2).filterDate('1999-09-01','1999-12-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_4_2 = l8_raw2.filterBounds(table2).filterDate('1999-09-01','1999-12-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_4 = ee.ImageCollection([l8_4_2,l8_4_1]).mosaic();
//Map.addLayer(l8_4)

var l8_5_1 = l8_raw2.filterBounds(table2).filterDate('1999-03-01','1999-05-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_5_2 = l8_raw2.filterBounds(table2).filterDate('1999-03-01','1999-06-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_5 = ee.ImageCollection([l8_1,l8_5_1]).mosaic();
//Map.addLayer(l8_5)

var l8_7_1 = l8_raw2.filterBounds(table2).filterDate('2000-07-01','2000-09-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_7_2 = l8_raw2.filterBounds(table2).filterDate('2000-07-01','2000-09-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_7 = ee.ImageCollection([l8_7_2,l8_7_1]).mosaic();
//Map.addLayer(l8_7)

var l8_8_1 = l8_raw2.filterBounds(table2).filterDate('2000-04-01','2000-07-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).map(CloudRemoval).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_8_2 = l8_raw2.filterBounds(table2).filterDate('2000-04-01','2000-07-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).median().clip(table2).select(['B1','B2','B3','B4','B5','B6','B7']);
var l8_8 = ee.ImageCollection([l8_8_2,l8_8_1]).mosaic();
//Map.addLayer(l8_8)

var l7_col = l7_1.filterBounds(table2).filterDate('1999-01-01','2001-01-01').merge(l7_2.filterBounds(table2).filterDate('1999-01-01','2001-01-01'));

var l8_12_1 = l7_col.filterBounds(table2).filterDate('1999-06-01','1999-11-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).map(CloudRemoval).select(['B1','B2','B3','B4','B5','B7']).median().clip(table2);
var l8_12_2 = l7_col.filterBounds(table2).filterDate('1999-05-01','1999-11-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).map(CloudRemoval).select(['B1','B2','B3','B4','B5','B7']).median().clip(table2);
var l8_12_3 = l7_col.filterBounds(table2).filterDate('1999-05-01','1999-11-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).select(['B1','B2','B3','B4','B5','B7']).median().clip(table2);

var l8_12 = ee.ImageCollection([l8_12_3,l8_12_2,l8_12_1]).mosaic();
//Map.addLayer(l8_12)

var l8_13_1 = l7_col.filterBounds(table2).filterDate('2000-06-01','2000-09-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).map(CloudRemoval).select(['B1','B2','B3','B4','B5','B7']).median().clip(table2);
var l8_13_2 = l7_col.filterBounds(table2).filterDate('2000-03-01','2000-12-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).map(CloudRemoval).select(['B1','B2','B3','B4','B5','B7']).median().clip(table2);
var l8_13_3 = l7_col.filterBounds(table2).filterDate('2000-03-01','2000-12-01').merge(l8_raw.filterBounds(table2).filterDate(start_date,end_date)).select(['B1','B2','B3','B4','B5','B7']).median().clip(table2);

var l8_13 = ee.ImageCollection([l8_13_3,l8_13_2,l8_13_1]).mosaic();
Map.addLayer(l8_13)


var l8_merged = l8_1.addBands(l8_2).addBands(l8_3).addBands(l8_4).addBands(l8_5).addBands(l8_7).addBands(l8_8).addBands(l8_12).addBands(l8_13);
Map.addLayer(l8_merged)

var label = 'CLASS_2000'
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
'description': 'crop classification',
'fileNamePrefix': 'composites_1996',
'scale': 30,
'region': table2,
'crs': 'EPSG:32636',
'maxPixels' : 10000000000000})





