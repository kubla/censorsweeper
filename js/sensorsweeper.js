
bad_num  = document.getElementById("bad_num");
total_num  = document.getElementById("total_num");
bad_name  = document.getElementById("bad_name");
good = document.getElementById("good");
var pause=0;

function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
        if(level>3) { return ""; }
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}

Array.prototype.shuffle = function() {
 	var len = this.length;
	var i = len;
	 while (i--) {
	 	var p = parseInt(Math.random()*len);
		var t = this[i];
  	this[i] = this[p];
  	this[p] = t;
 	}
};

failed=new Hashtable();
failfinal=new Hashtable();
function validate(addr){
      if(!failed.containsKey(addr)) { failed.put(addr, 0); }
      var attempts = failed.get(addr) + 1;
      failed.put(addr, attempts);
      var host = addr.split("/")[2].substr(4);
      if(failed.get(addr)>6 && !failfinal.containsKey(addr)){
         failfinal.put(addr, 1);
         var count = parseInt(bad_num.innerHTML) + 1;
         bad_num.innerHTML=count + " bad";
         bad_name.innerHTML+=host + ", ";
         var count = parseInt(total_num.innerHTML) + 1;
         total_num.innerHTML=count + " total";
		 
		 //Lets tell the world its broken.
		  var gridloc = "#" + minegrid.pop();
		  //$(gridloc).html("<img class='borked' src='images/borked.gif'>");
		  $(gridloc).html("<a class='tooltip' href=" + addr + " target='out'><img class='borked' src='images/borked.gif' alt='" + host + "'><span class='custom critical'>" + host + "</span></a>");
		 // $(gridloc).html("<a class='tooltip' href=" + addr + " target='out'><img class='borked' src='images/mineborked2.gif' alt='" + host + "'><span class='custom critical'>" + host + "</span>");
		  //And update the smiley
		  $('.goodButton').html("<a href='javascript:grabtons(0);'><div class='badButton'></div></a>");
		  $('.badButton').fadeOut(6000);
		 
      } else {
	 setTimeout(function(){ grab(host); }, 1000);
         return;
      }
      setTimeout(function(){ grab(0); }, 100);
}

function grabtons(){
	$('.startButton').html("<a href='javascript:grabtons(0);'><div class='goodButton'></div></a>");
	grab(0);grab(0);grab(0);grab(0);
}

function grab(s){
   var url;
   if(s==0){
      if(sites.length == 0) { return; }
      url = sites.pop();
   } else {
      url = s;
   }
   img = new Image();
   img.onload = function(event) {
       var count = parseInt(total_num.innerHTML) + 1;
       total_num.innerHTML=count + " total";
    //  good.appendChild(event.target); 
	  
	  if (minegrid[0] != null) {
		  var gridloc = "#" + minegrid.pop();
		  $(gridloc).html(event.target);
		  //$('.startButton').html("<a href='javascript:grabtons(0);'><div class='goodButton'></div></a>");
			 
	  } else {
		  //Out of space so repopulate array and keep going!
		 // alert("no more minegrids");
		 for (var i = 0; i < Math.floor((y-120)/iconsize); i++) {
		   //iterate through rows
		   //rows would be accessed using the "row" variable assigned in the for loop
		   for (var j = 0;j < Math.floor((x-24)/iconsize); j++) {
			 //iterate through columns
			 //columns would be accessed using the "col" variable assigned in the for loop
			 gridlocation =[Number(i)+"-"+Number(j)];
			 minegrid.push(gridlocation);
			 
		   }
		   //randomize (or disable to track visually) here
			 minegrid.sort( randOrd );
		   
			 var gridloc = "#" + minegrid.pop();
		 	 $(gridloc).html(event.target);
		    
			// $('.startButton').html("<a href='javascript:grabtons(0);'><div class='goodButton'></div></a>");
		 
		}

	  }
	  
      setTimeout(function() {grab(0) } , 100);
   }
   img.onerror = function(event) { 
      // there was an error.  THAT DOESN'T MEAN the site is blocked...yet.
      // We need to validate.
      validate(event.target.src);
   }
   img.src="http://www." + url + "/favicon.ico"; //?ignore=" + parseInt(Math.random()*10);
   img.height=iconsize;
   img.width=iconsize;
}