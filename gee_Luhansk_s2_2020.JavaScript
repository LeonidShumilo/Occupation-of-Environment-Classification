var train_set = table

train_set = train_set.filterBounds(geometry)
train_set = train_set.map(function(f) { return f.buffer(3)});
Map.addLayer(train_set)
//train_set = train_set.map(function(f) { return f.buffer(3)});
//==============================S2=======================
//geometry = geometry2

function maskS2clouds(image) {
  var qa = image.select('QA60');
  //var qa = qa.fastDistanceTransform(1,"pixels","squared_euclidean").lt(1000) // !!!!!!!!!!!!!!!!!
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;

  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));

  return image.updateMask(mask).divide(10000);
}


function maskS2clouds3(image) {
  var qa = image.select('SCL');

  // Bits 10 and 11 are clouds and cirrus, respectively.
  
  var mask = qa.eq(1).or(qa.eq(2)).or(qa.eq(4)).or(qa.eq(5)).or(qa.eq(6)).or(qa.eq(7))

  return image.updateMask(mask);
}

function addNdvi(img) {
  var nd = img.normalizedDifference(['B8', 'B4']);
  return img.float().addBands(nd.rename('NDVI'));
}


// Composit

function composit(image) {
  var ndvi = image.map(addNdvi);
  var greenest = ndvi.qualityMosaic('NDVI');
  image =  image.median().clip(geometry).select(s2b);
  greenest = greenest.clip(geometry).select(s2b);
  image = image.select(s2b).min(greenest.select(s2b)).clip(geometry);
  return image.select(s2b)
}

// Load Sentinel-2 TOA reflectance data.
var s2bands = ['B2', 'B3', 'B4', 'B8', 'QA60'];
var s2bands1 = ['B2', 'B3', 'B4', 'B8', 'QA60', 'SCL'];
var s2b = ['B2', 'B3', 'B4', 'B8'];

//================================kviten========================================


var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2020-03-01', '2020-04-01')
                  // Pre-filter to get less cloudy granules.
                  //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 40))
				          //.select(s2bands)
                  //.map(maskS2clouds3)
                  .map(maskS2clouds);

var dataset2 = composit(dataset.select(s2b));
//var dataset2 = (dataset.median()).clip(geometry).select(s2b);

var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2020-04-01', '2020-04-30')
                  // Pre-filter to get less cloudy granules.
                  //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
				          //.select(s2bands)
                  //.map(maskS2clouds3)
                  .map(maskS2clouds);
                
var dataset3 = composit(dataset.select(s2b));
//var dataset3 = (dataset.median()).clip(geometry).select(s2b);

var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2020-05-01', '2020-07-03')
                  // Pre-filter to get less cloudy granules.
                  //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
				          //.select(s2bands)
                  //.map(maskS2clouds3)
                  .map(maskS2clouds);
                
var dataset4 = composit(dataset.select(s2b));
//var dataset4 = (dataset.median()).clip(geometry).select(s2b);

var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2020-06-20', '2020-07-15')
                  // Pre-filter to get less cloudy granules.
                  //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
				          //.select(s2bands)
                  //.map(maskS2clouds3)
                  .map(maskS2clouds);
                
var dataset5 = composit(dataset.select(s2b));
//var dataset5 = (dataset.median()).clip(geometry).select(s2b);

var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2020-06-20', '2020-08-05')
                  // Pre-filter to get less cloudy granules.
                  //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
				          //.select(s2bands)
                  //.map(maskS2clouds3)
                  .map(maskS2clouds);
                
var dataset6 = composit(dataset.select(s2b));
//var dataset5 = (dataset.median()).clip(geometry).select(s2b);

var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2020-08-05', '2020-09-01')
                  // Pre-filter to get less cloudy granules.
                  //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
				          //.select(s2bands)
                  //.map(maskS2clouds3)
                  .map(maskS2clouds);
                
var dataset7 = composit(dataset.select(s2b));
//var dataset5 = (dataset.median()).clip(geometry).select(s2b);


var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2020-09-01', '2020-09-21')
                  // Pre-filter to get less cloudy granules.
                  //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
				          //.select(s2bands)
                  //.map(maskS2clouds3)
                  .map(maskS2clouds);
                
var dataset8 = composit(dataset.select(s2b));

var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2020-09-18', '2020-10-15')
                  // Pre-filter to get less cloudy granules.
                  //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
				          //.select(s2bands)
                  //.map(maskS2clouds3)
                  .map(maskS2clouds);
                
var dataset9 = composit(dataset.select(s2b));

//================================travem========================================

var rgbVis = {
  min: 200,
  max: 1500,
  bands: ['B4', 'B3', 'B2'],
};

var rgbViss = {
  min: 0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};


//Map.addLayer(dataset5, rgbViss, '5');
//Map.addLayer(dataset2, rgbViss, '2');
//Map.addLayer(dataset3, rgbViss, '3');
//Map.addLayer(dataset4, rgbViss, '4');
//Map.addLayer(dataset6, rgbViss, '6');
//Map.addLayer(dataset6, rgbViss, '7');
//Map.addLayer(dataset8, rgbViss, '8');
//Map.addLayer(dataset9, rgbViss, '9');



var dataset = dataset2
              .addBands(dataset3)
              .addBands(dataset4)
              //.addBands(dataset5)
              .addBands(dataset6)
              .addBands(dataset7)
              .addBands(dataset8)
              .addBands(dataset9)
              .clip(geometry);



var training_scale = 10;
var training_property = 'CLASS';
var training = dataset.sampleRegions({
  collection:train_set, 
  scale: training_scale,
  tileScale: 8});

var trained = ee.Classifier.smileRandomForest(200).train(training, training_property);
var classified = dataset.classify(trained).clip(geometry);

// Export a cloud-optimized GeoTIFF.
Export.image.toDrive({
  image: classified.toByte(),
  description: 'Map2020_15102020',
 'fileNamePrefix': 'Class_1510',
  scale: 10,
  region: geometry,
  fileFormat: 'GeoTIFF',
  'maxPixels' : 10000000000000,
  formatOptions: {
    cloudOptimized: true
  }
});
