#!/usr/bin/env python
import cgi

form = cgi.FieldStorage()

#zapis
if form.getvalue("mode","0") == "1":
	x1 = form.getvalue("x1","none")
	x2 = form.getvalue("x2","none")
	y1 = form.getvalue("y1","none")
	y2 = form.getvalue("y2","none")
	color = form.getvalue("color","none")
	file = open("rectangleBase.txt","a")
	toWrite =  x1 + "|" + y1 + "|" + x2 + "|" + y2 + "|" + color + "//"
	file.write(toWrite)
	file.close()
	print "Content-type: text/html"
	print

#odczyt z dodaniem funckji do rysowania	
elif form.getvalue("mode","0") == "2":
	rectangle = "rectangle"
	file = open("rectangleBase.txt","r")
	filecontent = file.read()
	lines = filecontent.split("//")
	lines = lines[:-1]
	print "Content-type: text/html"
	print 
	print "<table>"
	print "<tr id=\"main\">"
	print "<th>X1</th>"
	print "<th>Y1</th>"
	print """
			<th>X2</th>
			<th>Y2</th>
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
		print "<td>" + words[4] + "</td>"
		print "<td> <input type=\"button\" value=\"Rysuj\" onclick=\"drawFigure('"+rectangle+"'," + words[0] + ","+words[1] + ","+words[2] + "," + words[3] + ",'" + words[4] + "')\"</td>"
		print "</tr>"
	print "</table>"
	file.close()
