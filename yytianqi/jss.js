$(document).ready(function(){
	getWeather($("#city").val());

  	$("#city").change(function(){
  		getWeather($("#city").val());
	});

  
});
function getWeather(city){
  var observe="http://api.yytianqi.com/observe?city="+city+"&key=3loc0opwu29a46ci";
  //alert(city);
  $.getJSON(observe,function(json){
      //console.log(json.data);
      $("#lastUpdate").html(json.data.lastUpdate);
      $("#qw").html(json.data.qw);
      $("#tq").html(json.data.tq);
      $("#sd").html(json.data.sd);
      });
  var air="http://api.yytianqi.com/air?city="+city+"&key=3loc0opwu29a46ci";
  $.getJSON(air,function(json){
      console.log(json);
      $("#pm25").html(json.data.pm25);
      $("#grade").html(json.data.grade);
      });
}