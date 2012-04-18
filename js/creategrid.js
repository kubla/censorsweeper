

var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
// minesweeper grid spots 
//var samplesize = Math.round(x/16) * Math.round((y-60)/16); //icons are 16x16, 60 = nav height

//table, divs, canvas?

if (!minegrid) {
var minegrid = [];
var gridlocation = [];
var iconsize = 32;

for (var i = 0; i < Math.floor((y-120)/iconsize); i++) {
   //iterate through rows
   //rows would be accessed using the "row" variable assigned in the for loop
   for (var j = 0;j < Math.floor((x-24)/iconsize); j++) {
     //iterate through columns
     //columns would be accessed using the "col" variable assigned in the for loop
	 gridlocation =[Number(i)+"-"+Number(j)];
	 minegrid.push(gridlocation);
	 
	 $('#good').append('<div id="' + gridlocation + '" class="square"></div>');
	 //$('.0-1').fadeOut();
   }  
}

function randOrd(){ return (Math.round(Math.random())-0.5); }
minegrid.sort( randOrd );
}
//alert(minegrid[900]);
