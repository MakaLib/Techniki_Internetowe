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
 
function show()     
 {
       xmlHttp = getRequestObject() ;
       if (xmlHttp) 
	   {
         try {
           var title = "";
		   var author = "";
		   var mode = "2";
           var url = "../cgi-bin/AJAX/post.py" ;
           var data = "tytul=" + title + "&autor="+author+"&tryb="+mode ;
           xmlHttp.onreadystatechange = handleResponse ;
           xmlHttp.open("POST", url, true);
           xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded") ;
           xmlHttp.send(data);
         }
         catch (e) 
		 {
           alert ("Nie mozna polaczyc sie z serwerem: " + e.toString()) ;
         }
       } 
	   else 
	   {
         alert ("Blad") ;
       }
  }
  
  function showInsert()
  {
	  var content  = document.getElementById("responseContent");
	  var htmlCode = `
		<div id="formularz">
		<fieldset>
			<legend id="napis">Książki</legend>
			<form action="#" method="post" id="mainForm">
				<div class="opis">Tytuł,</div>
				<input type="text" name="tytul" value="">
				<br><br>
				<div class="opis">Autor</div>
				<input type="text" name="autor" value="">
				<br><br>
				<input type="submit" value="Wyślij" name="wyslij" onclick="insertData()">
			</form>
			
		</fieldset>
	</div>
	  `;
	  
	  content.innerHTML = htmlCode;
  }
  
  function insertData()
  {
	  xmlHttp = getRequestObject() ;
	  form = document.getElementById("mainForm")
       if (xmlHttp) 
	   {
         try {
		   var title = form.tytul.value;
		   var author = form.autor.value;
		   var mode = "1";
           var url = "../cgi-bin/AJAX/post.py" ;
           var data = "tytul=" + title + "&autor="+author+"&tryb="+mode ;
           xmlHttp.onreadystatechange = handleResponse ;
           xmlHttp.open("POST", url, true);
           xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded") ;
           xmlHttp.send(data);
         }
         catch (e) 
		 {
           alert ("Nie mozna polaczyc sie z serwerem: " + e.toString()) ;
         }
       } 
	   else 
	   {
         alert ("Blad") ;
       }
  }
  
  function handleInsert()
  {
		myDiv = document.getElementById("responseContent");
		if (xmlHttp.readyState == 4) 
		{
			if ( xmlHttp.status == 200 )  
			{
				form.tytul.value = "";
				form.autor.value = "";
			}
		}  
  }
 
function handleResponse()      
{
    myDiv = document.getElementById("responseContent");
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