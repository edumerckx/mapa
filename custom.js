$(document).ready(function(){
	$('#buscaForm').submit(function(){
		$.post(
			'busca.php',
			$('#buscaForm').serialize(),
			function(data){
				var enderecos = new Array();
				
				for (i = 0; i < data.results.length; i++) {
					var endereco = data.results[i].formatted_address;
					var latitude = data.results[i].geometry.location.lat;
					var longitude = data.results[i].geometry.location.lng;
					
					enderecos[i] = '<a href="javascript:criaMapa('+latitude+','+longitude+')">' + endereco + '</a><br/>';
				}
				
				$('#resultado').html(enderecos);
			}, 
			'json'
		);	
		return false;
	});	
});	

var map;
var marcadores = new Array();
var circulos = new Array();

/**
 * Cria o mapa no div 'map_canvas'
 * Centraliza na latitude e longitude informadas
 * 
 * @param lat
 * @param lng
 */
function criaMapa(lat, lng) {
	
	latLng = new google.maps.LatLng(lat, lng);
	var options = {
	  zoom: 14,
	  center: latLng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	// cria o mapa
	map = new google.maps.Map(document.getElementById("map_canvas"), options);
	
	// insere marcador
	criaMarcador(latLng, map);
	
	// insere círculo
	criaCirculo(latLng, map);
	
	// insere ação para o evento 'click'
//	google.maps.event.addListener(map, 'click', function() {
//		// limpa o mapa
//		apagaCirculos();
//		apagaMarcadores();
//
//		
//		criaMarcador(event.latLng, map);
//		criaCirculo(event.latLng, map);
//	});
	
}

/**
 * Insere marcador na posição (latLng) indicada
 * 
 * @param latLng
 * @param map
 */
function criaMarcador(latLng, map) {
	  var marcador = new google.maps.Marker({
	      position: latLng, 
	      map: map
	  });
	  
	  marcadores.push(marcador);
}

/**
 * Desenha círculo tendo como centro a posição
 * (latLng) informada
 * Raio de 1000 metros
 * 
 * @param latLng
 * @param map
 */
function criaCirculo(latLng, map) {
	var options = {
	      strokeColor: "#FF0000",
	      strokeOpacity: 0.8,
	      strokeWeight: 2,
	      fillColor: "#FF0000",
	      fillOpacity: 0.35,
	      map: map,
	      center: latLng,
	      radius: 1000
	};

	circulo = new google.maps.Circle(options);
	
	circulos.push(circulo);
}

/**
 * Apaga todos os marcadores existentes no mapa
 * 
 */
function apagaMarcadores() {
	if (marcadores) {
		for (i in marcadores) {
			marcadores[i].setMap(null);
		}
	}
}

/**
 * Apaga todos os círculos existentes no mapa
 * 
 */
function apagaCirculos() {
	if (circulos) {
		for (i in circulos) {
			circulos[i].setMap(null);
		}
	}	
}
