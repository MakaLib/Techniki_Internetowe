#!/usr/bin/env python
import cgi
import os
import datetime
form = cgi.FieldStorage()

title = form.getvalue("tytul","(no data")
author = form.getvalue("autor","(no data)")
ipaddrres = "2" #cgi.escape(os.environ(["REMOTE_ADDR"]))
currentDate = datetime.datetime.now()
currentDate = currentDate.strftime("%x %X")


file = open("baza/dane.txt", "a")
toWrite = ""
if title != "(no data)" and author != "(no data)":
	toWrite = title + "|" + author + "|" + currentDate + "|" + ipaddrres + "//"
file.write(toWrite)
file.close()

read = open("baza/dane.txt","r")
filecont = read.read();
lines = filecont.split("//")
lines = lines[:-1]
print(lines)

print "Content-type: text/html"
print ""
print """
	<!DOCTYPE html>
<html lang="pl">
<head>
	<meta charset="utf-8">
	<title>Biblioteka</title>
	<style type="text/css">
		#main
		{
			background-color: yellow;
		}
		table
		{
			border: 3px solid black;
			width: 70%;
			margin-right: auto;
			margin-left: auto;
		}
		tr
		{
			background-color: lightgray;
			text-align: center;
		}

		tr:nth-child(odd)
		{
			background-color: pink;
			text-align: center;
		}

	</style>
</head>
<body>
	<table>
		<tr id="main">
			<th>Tytul</th>
			<th>Autor</th>
			<th>Date</th>
			<th>IP</th>
		</tr>
"""
for line in lines:
	words = line.split("|")
	print "<tr>"
	print "<td>"+words[0]+ "</td>" + "<td>"+words[1]+ "</td>" + "<td>"+words[2]+ "</td>" + "<td>"+words[3]+ "</td>"
	print "</tr>"

print """
	</table>
</body>
</html>
"""

