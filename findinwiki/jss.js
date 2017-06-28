$(document).ready(function(){
  alert("ok");
  	$("#ss").bind("click",function(){
      alert("ok");
	});

  
});
function getWiki(){
  var url="https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json";
  //alert(u);
  $.getJSON(url,function(json){
      alert(json.query.pages.15580374.pageid);
      });
  
}



<div class="result">
	    		<img src="" class="img-responsive" alt="没有图QAQ"/>
	    		<h2>rrrrr1</h2>
	    		<p>zhaiyaozhaiyao zhaiyao zhaiyao zhaiyaozhaiyao hhhhhhhhhdadaaaaaa</p>
	    	</div><!-- /result -->
	    	<div class="result">
	    		<img src="" class="img-responsive"/>
	    		<h2>rrrrr2</h2>
	    		<p>zhaiyaozhaiyao zhaiyao zhaiyao zhaiyaozhaiyao hhhhhhhhhdadaaaaaa</p>
	    	</div><!-- /result -->
	    </div>