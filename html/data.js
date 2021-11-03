
function loadJSON(){
    var dfile="data.json"
    var data= new XMLHttpRequest();
    data.onreadystatechange= function(){
        if(data.readyState == 4 && data.status == 200)
        {
            var quotes=JSON.parse(data.responseText);
            var number=Math.floor(Math.random()*quotes.length);
            quote.html='<span>"</span>'+quotes[number].quote+'<span>"</span>';
            document.getElementById("quote").innerHTML=quotes[number];
        }
    }
    
    
    
    data.open('GET',dfile,true);
    data.send();
    }