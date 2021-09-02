function global_elements() {
	//one set of values for raw URLs
	var wikiAPI_URL_raw = 'https://en.wikipedia.org/w/api.php?action=query&format=json&callback=?&prop=extracts&exintro&titles=';
	var wiki_URL_raw = 'https://en.wikipedia.org/wiki/';
	//one set of values for further manipulation
	var wikiAPI_URL = 'https://en.wikipedia.org/w/api.php?action=query&format=json&callback=?&prop=extracts&exintro&titles=';
	var wiki_URL = 'https://en.wikipedia.org/wiki/';
	
	var article_Solar_System = 'Solar_System';
	function set_Solar_System() {
		wikiAPI_URL = wikiAPI_URL_raw + article_Solar_System;
		wiki_URL = wiki_URL_raw + article_Solar_System;
	};
	var article_Sun = 'Sun';
	function set_Sun() {
		wikiAPI_URL = wikiAPI_URL_raw + article_Sun;
		wiki_URL = wiki_URL_raw + article_Sun;
	};
	var article_Mercury = 'Mercury_(planet)';
	function set_Mercury() {
		wikiAPI_URL = wikiAPI_URL_raw + article_Mercury;
		wiki_URL = wiki_URL_raw + article_Mercury;
	};
	var article_Venus = 'Venus';
	function set_Venus() {
		wikiAPI_URL = wikiAPI_URL_raw + article_Venus;
		wiki_URL = wiki_URL_raw + article_Venus;
	};
	var article_Earth = 'Earth';
	function set_Earth() {
		wikiAPI_URL = wikiAPI_URL_raw + article_Earth;
		wiki_URL = wiki_URL_raw + article_Earth;
	};
	var article_Mars = 'Mars';
	function set_Mars() {
		wikiAPI_URL = wikiAPI_URL_raw + article_Mars;
		wiki_URL = wiki_URL_raw + article_Mars;
	};
	var article_Jupiter = 'Jupiter';
	function set_Jupiter() {
		wikiAPI_URL = wikiAPI_URL_raw + article_Jupiter;
		wiki_URL = wiki_URL_raw + article_Jupiter;
	};
	var article_Saturn = 'Saturn';
	function set_Saturn() {
		wikiAPI_URL = wikiAPI_URL_raw + article_Saturn;
		wiki_URL = wiki_URL_raw + article_Saturn;
	};
	var article_Uranus = 'Uranus';
	function set_Uranus() {
		wikiAPI_URL = wikiAPI_URL_raw + article_Uranus;
		wiki_URL = wiki_URL_raw + article_Uranus;
	};
	var article_Neptune = 'Neptune';
	function set_Neptune() {
		wikiAPI_URL = wikiAPI_URL_raw + article_Neptune;
		wiki_URL = wiki_URL_raw + article_Neptune;
	};
	set_Solar_System();
	
	//populate info from Wiki API JSON file
	function populate_info() {
		$.getJSON(wikiAPI_URL, function(data) {
			$.each(data.query.pages, function(i, item) {
				$("#wikipedia-article h1").empty().append(item.title);
				$("#wikipedia-article #article").empty().append(item.extract);
				$("#wikipedia-article a").attr({ target:"_blank", href:wiki_URL });
			});
		});
	};
	populate_info();
	
	$('#sun button').on('click', function () {
		set_Sun();
		populate_info();
	 });
	$('#mercury button').on('click', function () {
		set_Mercury();
		populate_info();
	 });
	$('#venus button').on('click', function () {
		set_Venus();
		populate_info();
	 });
	$('#earth button').on('click', function () {
		set_Earth();
		populate_info();
	 });
	$('#mars button').on('click', function () {
		set_Mars();
		populate_info();
	 });
	$('#jupiter button').on('click', function () {
		set_Jupiter();
		populate_info();
	 });
	$('#saturn button').on('click', function () {
		set_Saturn();
		populate_info();
	 });
	$('#uranus button').on('click', function () {
		set_Uranus();
		populate_info();
	 });
	$('#neptune button').on('click', function () {
		set_Neptune();
		populate_info();
	 });
};

function dashboard_controls() {
	$('#dashboard #pause').on('click', function () {
		$(".planet-orbit, .planet-orbit li, #saturn .rings-position").toggleClass("paused");
		if ($(this).hasClass('activated')) { //switch-on
			$(this).removeClass("activated");
	 		$(this).text("Pause animation");
		} else {
			$(this).addClass("activated"); //switch-off
	 		$(this).text("Play animation");
		}
	 });

	$('#dashboard #hide').on('click', function () {
		$("#center-canvas").fadeToggle("slow");
		if ($(this).hasClass('activated')) { //switch-on
			$(this).removeClass("activated");
			$('#wikipedia-article').removeClass("bright-text");
	 		$(this).text("Hide animation");
		} else {
			$(this).addClass("activated"); //switch-off
			$('#wikipedia-article').addClass("bright-text");
	 		$(this).text("Show animation");
		}
	 });
};

//INITIALISE
function initialise() {
	global_elements();
	dashboard_controls();
};