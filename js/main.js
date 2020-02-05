(function () {
    
   /*function fetchFile(path, callback){
        
    var request = new XMLHttpRequest();

    request.onload = function(){
        callback(request.responseText);
    }

    request.open("GET", path);
    request.send(null);

   }*/

   var partialsCache = {}; 

   function getContent(fragmentId, callback){
        if(partialsCache[fragmentId]){

            callback(partialsCache[fragmentId]);
        }else {
            //fetchFile
            $.get("html/" + fragmentId + ".html", function(content){
                
                partialsCache[fragmentId] = content;

                callback(content);
            
            });
            

        }    
    }

    function setActiveLink(fragmentId){
        /*var navbarDiv = document.getElementById("navbar"),
            links = navbarDiv.children,
            i, link, pageName;*/

            /*for(i=0; i < links.length; i++){
                link = links[i];
                pageName = link.getAttribute("href").substr(1);*/

                $("#navbar a").each(function (i, linkElement){
                    var link = $(linkElement),
                        pageName = link.attr("href").substr(1);

                if (pageName === fragmentId) {
                    link.attr("class", "active");
                }else{
                    link.removeAttr("class"); 
                }
            });
    }
    function navigate(){
        //set the "container"
        //var contentDiv = document.getElementById("container");

        fragmentId = location.hash.substr(1);

        getContent(fragmentId, function(content){
            
            //contentDiv.innerHTML = content;
            $("#container").html(content);
        });

        setActiveLink(fragmentId);
    }   
    
    if(!location.hash){
        //default to #home
        location.hash = "#home";
    }
    navigate();
    
    //window.addEventListener("hashchange",navigate);
    $(window).bind('hashchange', navigate);
}());


