var xmlHttp;
function getRequestObject()      
{
       if ( window.ActiveXObject)  
	   {
            return ( new ActiveXObject("Microsoft.XMLHTTP")) ;
        } 
		else if (window.XMLHttpRequest)  
		{
           return (new XMLHttpRequest())  ;
        }
		else 
		{
           return (null) ;
        }
  }
 

 function showInsertForm() //odpowiada za wysiwletanie rozwijanego menu po kliknieciu dodajfigure(OK)
 {
	 var myDiv = document.getElementById("responseContent");
	 var content = `
	 <fieldset>
	 <select name="figury" onchange="figureListChange()" id="figureSelect">
		<option value="0">---Rodzaj figury---</option>
		<option value="1">Koło</option>
		<option value="2">Prostokąt</option>
		</select>
		<div id="figureValues"></div>
		<div id="errorMessage"></div>
	 </fieldset>
	 `
	 myDiv.innerHTML = content;
 }
 
 //funckja reagujaca na zmiane rozwiajengo menu figur w DodajFigure (OK)
 function figureListChange()
 {
	 var chossenElement = document.getElementById("figureSelect");
	 var content = "'";
	 if(chossenElement.selectedIndex == 1)
	 {
		 content = `
		 <form action="#" method="post" id="mainForm">
			Współrzędne środka
			<input type="text" value="" name="x"/>
			<input type="text" value="" name="y"/>
			<br/>
			Promień
			<input type="text" value="" name="r"/>
			<br/>
			Kolor
			<input type="text" value="" name="color"/>
			<br/><br/>
			<input type="button" value="Wykonaj" onclick="sendCircleValues()"/>
		</form>
		`;
	 }
	 else if(chossenElement.selectedIndex == 2)
	 {
		 content = `
		  <form action="#" method="post" id="mainForm">
			Współrzędna 1
			<input type="text" value="" name="x1"/>
			<input type="text" value="" name="y1"/>
			<br/>
			Współrzędna 2
			<input type="text" value="" name="x2"/>
			<input type="text" value="" name="y2"/>
			<br/>
			Kolor
			<input type="text" value="" name="color"/>
			<br/><br/>
			<input type="button" value="Wykonaj" onclick="sendRectangleValues()"/>
		</form>
		`;
	 }
	 document.getElementById("figureValues").innerHTML = content;
 }
 
 //wysyla dane z prostokata TODO dodac hanler
 function sendRectangleValues()
 {
	  xmlHttp = getRequestObject();
	  if(validateRectangle())
	  {
		if (xmlHttp) {
			try {
					var form = document.getElementById("mainForm");
					var x1 = form.x1.value;
					var x2 = form.x2.value;
					var y1 = form.y1.value;
					var y2 = form.y2.value;
					var color = form.color.value;
					var mode = "1";
					var dataToSend = "x1=" + x1 + "&y1=" + y1 + "&x2=" +x2 + "&y2=" + y2 + "&color=" + color +
					 "&mode=" + mode;
					var url = "../cgi-bin/AJAXPROJEKT/rectangle.py" ;
					xmlHttp.onreadystatechange = handleResponse ;
					xmlHttp.open("POST", url, true);
					xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded") ;
					xmlHttp.send(dataToSend);
			}
			catch (e) {
			alert ("Nie mozna polaczyc sie z serwerem: " + e.toString()) ;
			}
		} else {
			alert ("Blad") ;
		}
	  }
	 
 }
 
 //waliduje dane prostokata TODO sprawdzic jescze rozmiary
 function validateRectangle()
 {
	 var form = document.getElementById("mainForm");
	 var error = document.getElementById("errorMessage");
	 var message = "<br/>";
	 var valid = true;
	 if(form.x1.value == "" || form.y1.value=="")
	 {	 
		message += "Nie wprowadzono współrzędnych 1!<br/>";
		valid = false;
	 }
	 if(form.x2.value =="" || form.y2.value == "")
	 {
		 message += "Nie wprowadzono współrzędnych 2!<br/>";
		 valid = false;
	 }
	 if(form.color.value == "")
	 {
		 message += "Nie wprowadzono koloru!<br/>";
		 valid = false;
	 }
	 
	 if(!valid)
	 {
		 error.innerHTML = message;
	 }
	return valid;
	 
	 
 }
 
 
 //wysyla dane do kola TODO  chyba handler do funckji
 function sendCircleValues()
 {
	   xmlHttp = getRequestObject();
	  if(validateCircle())
	  {
		if (xmlHttp) {
			try {
				var form = document.getElementById("mainForm");
				var x = form.x.value;
				var y = form.y.value;
				var r = form.r.value;
				var color = form.color.value;
				var mode = "1";
				var url = "../cgi-bin/AJAXPROJEKT/circle.py" ;
				var dataToSend = "x="+x+"&y=" + y +"&r=" + r + "&color=" + color + "&mode=" + mode;
				xmlHttp.onreadystatechange = handleResponse ;
				xmlHttp.open("POST", url, true);
				xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded") ;
				xmlHttp.send(dataToSend);
			}
			catch (e) {
			alert ("Nie mozna polaczyc sie z serwerem: " + e.toString()) ;
			}
		} else {
			alert ("Blad") ;
		}
	  }
 }
 
 //waliduje kolko TODO sprawdizc czy sie miesci
 function validateCircle()
 {
	 var form = document.getElementById("mainForm");
	 var error = document.getElementById("errorMessage");
	 var message = "<br/>";
	 var valid = true;
	 if(form.x.value == "" || form.y.value == "")
	 {
		 message += "Nie wprowadzono współrzędnych środka<br/>";
		 valid = false;
	 }
	 if(form.r.value == "")
	 {
		 message += "Nie wprowadzono promienia!<br/>";
		 valid = false;
	 }
	 if(form.color.value == "")
	 {
		 message += "Nie wprowadzono koloru!<br/>";
		 valid = false;
	 }
	 
	 if(!valid)
	 {
		 error.innerHTML = message;
	 }
	 
	 return valid;
 }
 
 //funkcja reagujaca na zmiane rozwijanego menu w ListaFigur (dodac zmane na Brak figury)
 function showListChange()
 {
	 var canvas = document.getElementById("myCanvas")
	 var width = canvas.width;
	 var height = canvas.height;
	 var context = canvas.getContext("2d");
	 context.clearRect(0,0,width,height);
	  if(document.getElementById("selectFigure").selectedIndex == 1)
	  {
		  xmlHttp = getRequestObject();
			if (xmlHttp) {
				try {
						var mode = "2";
						var dataToSend =  "mode=" + mode;
						var url = "../cgi-bin/AJAXPROJEKT/circle.py" ;
						xmlHttp.onreadystatechange = handleShowList ;
						xmlHttp.open("POST", url, true);
						xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded") ;
						xmlHttp.send(dataToSend);
				}
				catch (e) {
				alert ("Nie mozna polaczyc sie z serwerem: " + e.toString()) ;
				}
			} else {
				alert ("Blad") ;
			}
	  }
	   else if(document.getElementById("selectFigure").selectedIndex == 2)
	  {
		  xmlHttp = getRequestObject();
			if (xmlHttp) {
				try {
						var mode = "2";
						var dataToSend =  "mode=" + mode;
						var url = "../cgi-bin/AJAXPROJEKT/rectangle.py" ;
						xmlHttp.onreadystatechange = handleShowList ;
						xmlHttp.open("POST", url, true);
						xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded") ;
						xmlHttp.send(dataToSend);
				}
				catch (e) {
				alert ("Nie mozna polaczyc sie z serwerem: " + e.toString()) ;
				}
			} else {
				alert ("Blad") ;
			}
	  }
	  else{
		  document.getElementById("figureList").innerHTML = "";
	  }
 }
 
 //funckja obslugujaca odbior do rysowanie w ListaFigur(OK)
 function handleShowList()
 {
	  var myDiv = document.getElementById("figureList");
    if (xmlHttp.readyState == 4) 
	{
         if ( xmlHttp.status == 200 )  
		 {
             response = xmlHttp.responseText;;
             myDiv.innerHTML = response;
            // myDiv.innerHTML += xmlHttp.getAllResponseHeaders();
         }
    }  
 }
 
 //funckja obslugujaca przycisk ListaFigur (OK)
 function showFigureList()
 {
	 var myDiv = document.getElementById("responseContent");
	 var content = `
	 <fieldset>
		<select name="figury" onchange="showListChange()" id="selectFigure">
			<option value="0">---Rodzaj figury---</option>
			<option value="1">Koło</option>
			<option value="2">Prostokąt</option>
		</select>
		<div id="figureList"></div>
		<div id="drawFigure" width="650" height="400" style="background-color: white;">
			<canvas id="myCanvas" width="650" height="400"> </canvas>
		</div>
	 </fieldset>
	 `
	 myDiv.innerHTML = content;
 }
 
 //Funkcja rysujaca
 function drawFigure(type ,value1, value2, value3, value4, value5)
 {
	 var canvas = document.getElementById("myCanvas")
	 var width = canvas.width;
	 var height = canvas.height;
	 var context = canvas.getContext("2d");
	 context.clearRect(0,0,width,height);
	 if(type == 'rectangle')
	 {
		var x1 = parseInt(value1);
		var y1 = parseInt(value2);
		var x2 = parseInt(value3);
		var y2 = parseInt(value4);
		var color = value5;
		context.beginPath();
		context.lineWidth = 1;
		context.strokeStyle = color;
		context.rect(x1,y1,x2-x1,y2-y1);
		context.stroke();
	 }
	 else if(type == "circle")
	 {
		var x = parseInt(value1);
		var y = parseInt(value2);
		var r = parseInt(value3);
		var color = value4;
		/*var width = canvas.width;
		var height = canvas.height;
		var context = canvas.getContext("2d");
		context.clearRect(0,0,width,height);*/
		context.arc(x,y,r,0,2*Math.PI);
		context.lineWidth = 1;
		context.strokeStyle = color;
		context.stroke();
	 }
 }
 
function handleResponse()      
{
    var myDiv = document.getElementById("responseContent");
    if (xmlHttp.readyState == 4) 
	{
         if ( xmlHttp.status == 200 )  
		 {
             response = xmlHttp.responseText;;
             myDiv.innerHTML = response;
            // myDiv.innerHTML += xmlHttp.getAllResponseHeaders();
         }
    }  
}

