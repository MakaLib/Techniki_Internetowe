#!/usr/bin/env python
import cgi

form = cgi.FieldStorage()

#zapis
if form.getvalue("mode","0") == "1":
	x = form.getvalue("x","none")
	y = form.getvalue("y","none")
	r = form.getvalue("r","none")
	color = form.getvalue("color","none")
	file = open("circleBase.txt","a")
	toWrite =  x + "|" + y + "|" + r + "|" + color + "//"
	file.write(toWrite)
	file.close()
	print "Content-type: text/html"
	print

#odczyt z dodaniem funckji do rysowania	
elif form.getvalue("mode","0") == "2":
	circle = "circle"
	blank = "none"
	file = open("circleBase.txt","r")
	filecontent = file.read()
	lines = filecontent.split("//")
	lines = lines[:-1]
	print "Content-type: text/html"
	print 
	print "<table>"
	print "<tr id=\"main\">"
	print "<th>X</th>"
	print "<th>Y</th>"
	print """
			<th>R</th>
			<th>Kolor</th>
			</tr>
			"""
	for line in lines:
		words = line.split("|")
		print "<tr>"
		print "<td>" + words[0] + "</td>"
		print "<td>" + words[1] + "</td>"
		print "<td>" + words[2] + "</td>"
		print "<td>" + words[3] + "</td>"
		print "<td> <input type=\"button\" value=\"Rysuj\" onclick=\"drawFigure('"+circle+"'," + words[0] + ","+words[1] + ","+words[2] + ",'" + words[3] + "','"+ blank+"')\"</td>"
		print "</tr>"
	print "</table>"
	file.close()
