#!/usr/bin/env python

print "Content-type: text/html"
print
print """
<!DOCTYPE html>
<html lang="pl">
<head>
	<meta charset="utf-8">
	<title>CGI</title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<div id="formularz">
		<fieldset>
			<legend id="napis">Książki</legend>
			<form action="post.py" method="post">
				<div class="opis">Tytuł,</div>
				<input type="text" name="tytul">
				<br><br>
				<div class="opis">Autor</div>
				<input type="text" name="autor">
				<br><br>
				<input type="submit" value="Wyślij">
			</form>
			
		</fieldset>
	</div>

</body>
</html>
"""