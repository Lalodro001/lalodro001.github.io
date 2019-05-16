function runAmchart() {
	//am4core.useTheme(am4themes_dark);
	
	var staticExcludeCodes = ['AQ'];
	var excludeCodes = [];
	
	$('.fn-chartdata>div').each(function(i,v) {
		excludeCodes.push($(v).data('isoa2'));
	});
	
	var chart = am4core.create("chartdiv", am4maps.MapChart);
	chart.geodata = am4geodata_worldLow;
	chart.projection = new am4maps.projections.Miller();
	chart.maxZoomLevel = 1;
	chart.chartContainer.wheelable = false;
	chart.seriesContainer.draggable = false;
	chart.seriesContainer.resizable = false;
	
	// Series for World map
	var worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
	worldSeries.exclude = $.merge(staticExcludeCodes, excludeCodes);
	worldSeries.useGeodata = true;
	
	var polygonTemplate = worldSeries.mapPolygons.template;
	//polygonTemplate.fill = '#d9d9d9';
	//polygonTemplate.propertyFields.fill = 'fill';
	
	var selectedSeries = chart.series.push(new am4maps.MapPolygonSeries());
	selectedSeries.geodata = am4geodata_worldLow;
	selectedSeries.include = excludeCodes;
	
	var pattern_default = new am4core.Pattern();
	
	var markedCountries = [];
	
	$('.fn-chartdata>div').each(function(i,v) {
		var isoCode = $(v).data('isoa2');
		var toolTip = $(v).data('tooltip');
		var pattern = $(v).data('pattern');
		
		var image = new am4core.Image();
		image.href = pattern;
		image.width = 10;
		image.height = 10;
		pattern_default.width = 10;
		pattern_default.height = 10;
		pattern_default.addElement(image.element);
		
		var tmpDataObj = {
			'id': isoCode,
			'fill': pattern_default,
			'tooltip': toolTip
		};
		markedCountries.push(tmpDataObj);
	});
	
	selectedSeries.data = markedCountries; 
	
	
	var polygonTemplate = selectedSeries.mapPolygons.template;
	selectedSeries.tooltip.background.strokeWidth = 0;
	selectedSeries.tooltip.background.cornerRadius = 0;
	selectedSeries.tooltip.background.filters.clear();
	polygonTemplate.tooltipHTML = '{tooltip}';
	polygonTemplate.propertyFields.fill = "fill";


	// Hover state
	var hs = polygonTemplate.states.create("hover");
	hs.properties.fill = am4core.color("#10265a");
	
	
}

