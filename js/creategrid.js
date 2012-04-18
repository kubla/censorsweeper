

var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
// minesweeper grid spots 
//var samplesize = Math.round(x/16) * Math.round((y-60)/16); //icons are 16x16, 60 = nav height

//table, divs, canvas?
function randOrd(){ 
	return (Math.round(Math.random())-0.5); 
	}
	
	

if (!minegrid) {
var minegrid = [];
var gridlocation = [];
var iconsize = 32;

for (var i = 0; i < Math.floor((y)/iconsize); i++) {
   //iterate through rows
   for (var j = 0;j < Math.floor((x)/iconsize); j++) {
     //iterate through columns
	 gridlocation =[Number(i)+"-"+Number(j)];
	 minegrid.push(gridlocation);
	 
	 $('#good').append('<div id="' + gridlocation + '" class="square"></div>');
	
   }  
}

minegrid.sort( randOrd );
}

