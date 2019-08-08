 $.getJSON("/all",function(data){
    console.log(data);
    for (var i = 0; i< data.length; i++){
        $("#articles").append("<a href='"+ data[i].link +"' target='_blank'>"+ data[i].title +"</a>");
    }
 })