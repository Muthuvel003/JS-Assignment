var fs = require('fs');
var content =[];
var header=[];
var arrasia=["India","Pakistan","Bangladesh","Nepal","Afganistan","Iran","Iraq","Japan","China"];
var arryear=["1960","1970","1980","1990","2000","2010","2014"];
var rural="Rural population";
var urban="Urban population"

var ns=fs.createReadStream('Indicator.csv','utf-8');
ns.on('data',function(test){
    var lines=test.split("\n");
 	for(var i=0;i<lines.length;i++){
       content.push(lines[i]);
    }
});
ns.on("end",function(){
 	header=content[0].split(",");

  var cname=header.indexOf("CountryName");
  var iname=header.indexOf("IndicatorName");
  var year=header.indexOf("Year");

 	var comp=function(str){
 		for(var b=0;b<arrasia.length;b++){
 			if(str===arrasia[b])
 				return 1;
 		}
 	}
  var contindia=[];
  var contasia=[];
  var ayear=[];
 	for(var i=1,len=content.length;i<len-1;i++){
   		var obj={};
   		var obj1={};

   		var curline=content[i].split(",");

   		if(curline[cname]==="India" && (curline[iname]==="Urban population (% of total)"||curline[iname]==="Rural population (% of total population)")){
   			for(var j=0;j<header.length;j++){
     			obj[header[j]]=curline[j];
 			  }
 			  contindia.push(obj);
 	    }
 	    if(comp(curline[cname]))
 		   {
 			    if(curline[iname]===urban||curline[iname]===rural){
   				 for(var k=0;k<header.length;k++){
     			  	obj1[header[k]]=curline[k];
              contasia.push(obj1);
 				   }
 			    }
 		   }
 	}
  var indiajson=[];
 	for(var i=0;i<contindia.length;i++)
 	{
    	indiajson.push({'IndicatorName':contindia[i].IndicatorName,'Year':contindia[i].Year,'value':contindia[i].Value});
 	}
 	var json_convert=JSON.stringify(indiajson);
 	fs.appendFile('first.json',json_convert);

 	var asiajson=[];

for(x=0;x<arryear.length;x++){
    var rur=0;
    var urb=0;

    for(y=0;y<contasia.length;y++){

        if(arryear[x]==contasia[y].Year)
        {
          if(contasia[y].IndicatorName===rural){
              rur=parseInt(rur)+parseInt(contasia[y].Value);
          }
          else if(contasia[y].IndicatorName===urban){
               urb=parseInt(urb)+parseInt(contasia[y].Value);
          }
        }
    }

  asiajson.push({'Year':arryear[x],'Rvalue':rur,'Uvalue':urb});
}

 	 var json_con=JSON.stringify(asiajson);
	 fs.appendFile('second.json',json_con);
   console.log("Success");
});