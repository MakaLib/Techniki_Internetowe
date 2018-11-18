#!/usr/bin/env python
import cgi
import os
import datetime
form = cgi.FieldStorage()

title = form.getvalue("tytul","(no data")
author = form.getvalue("autor","(no data)")
ipaddrres = cgi.escape(os.environ["REMOTE_ADDR"])
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

print "Content-type: text/html"
print ""
print "<!DOCTYPE html>" 
print '<html lang="pl">'
print "<head>"
print '<meta charset="utf-8">'
print "<title>Biblioteka</title>"
print '<style type="text/css">'
print "#main"
print "{"
print "background-color: yellow;"
print "}"
print "table"
print "{"
print "border: 3px solid black;"
print "width: 70%;"
print "margin-right: auto;"
print "margin-left: auto;"
print "}"
print "tr"
print "{"
print "background-color: lightgray;"
print "text-align: center;"
print "}"
print "tr:nth-child(odd)"
print "{"
print "background-color: pink;"
print "text-align: center;"
print "}"
print "</style>"
print "</head>"
print "<body>"
print "<table>"
print '<tr id="main">'
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
print "</body>"
print "</html>"

read.close()