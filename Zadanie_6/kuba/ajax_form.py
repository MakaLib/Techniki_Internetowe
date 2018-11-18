#!/usr/bin/env python
import cgi
import datetime
import os
form = cgi.FieldStorage()
  
text1 = form.getvalue("tytul","(no data)")
text2 = form.getvalue("autor","(no data)")
text3 = form.getvalue("typ","0")	

print "Content-Type: application/xml"
print
print text3
 
if os.path.isfile('dane.txt') == False : 
	myfile = open('dane.txt','w')
	myfile.close()

if text3 == 1:
	dane = "<tr> <td>" + text1 + "</td> <td>" + text2 + "</td> </tr>\n"
	myfile = open('dane.txt','a')
	myfile.write(dane)
	myfile.close() 

if text3 == 2:
	print"<table><tr><th>Tytul</th><th>Autor</th></tr>"
	for line in open('dane.txt'):
		print line
	print "</table>"
