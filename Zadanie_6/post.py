#!/usr/bin/env python
import cgi
import os
import datetime
form = cgi.FieldStorage()
title = form.getvalue("tytul","(no data")
author = form.getvalue("autor","(no data)")
ipaddrres = cgi.escape(os.environ['REMOTE_ADDR'])
currentDate = datetime.datetime.now()
currentDate = currentDate.strftime("%Y/%m/%d %X")
mode = form.getvalue("tryb","0");
mode = int(mode);

if mode == 1:
	file = open("dane.txt", "a")
	toWrite = ""
	if title != "(no data)" and author != "(no data)":
		toWrite = title + "|" + author + "|" + currentDate + "|" + ipaddrres + "//"
	file.write(toWrite)
	file.close()
	print "Content-type: text/html"
	print
	
elif mode == 2:
	read = open("dane.txt","r")
	filecont = read.read();
	lines = filecont.split("//")
	lines = lines[:-1]

	print "Content-type: text/html"
	print
	print "<table>"
	print "<tr id=\"main\">"
	print "<th>Tytul</th>"
	print "<th>Autor</th>"
	print "<th>Date</th>"
	print "<th>IP</th>"
	print "</tr>"
	for line in lines:
		words = line.split("|")
		print "<tr>"
		print "<td>"+words[0]+ "</td>" + "<td>"+words[1]+ "</td>" + "<td>"+words[2]+ "</td>" + "<td>"+words[3]+ "</td>"
		print "</tr>"
	print "</table>"

	read.close()
