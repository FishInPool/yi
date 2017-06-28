$(document).ready(function(){
	var url='https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=';

	$("#ss").click(function(){
		$("#showresult").html("");
		var content=$("#neirong").val();
		if(content!==""&&content!==null){
			var urlSearch=url+content;
			getWiki(urlSearch);
		}
	});

	function getWiki(url){		
		$.ajax({
			url:url,
			type: "get",
			dataType: "JSONP",
			success:function(response){
				var results = response.query.pages;
				var pgs = Object.keys(results);//wiki给的pages的格式 “pageid”:内容,pgs获得的是10条id
				pgs.forEach(function(page) {
					var html = "";
					var title=results[page].title;						
					//$("#test").append(title+"  ");				
					var extract = results[page].extract;
					var lin="http://en.wikipedia.org/wiki/"+encodeURIComponent(title);
					var imgsrc="";
					try{
                        imgsrc=results[page].thumbnail.source;
                        }catch(e){}
                    
          			html += "<div class='result'><a href='"+lin+"'>";
          			html += "<img src='"+imgsrc+"' class='img-responsive' alt='没有图QAQ'/>";
          			html += "<h2>"+title+"</h2>";
          			html += "<p>"+extract+"</p></a></div>";
          			$("#showresult").append(html);
          			var res=$("#showresult>div:last-child");
          			res.stop().animate({left:"0px"},300,"swing");
        		});
			}
		});
	}
});
