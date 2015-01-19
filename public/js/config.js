jQuery.ajax({
    url: "/api/config/DB/host", 
    type: "POST",
    data: {"host":"localhost"}, 
    success: function(data, textStatus, jqXHR) { 
        console.log("PUT resposne:"); 
        console.dir(data); 
        console.log(textStatus); 
        console.dir(jqXHR); 
    }
});