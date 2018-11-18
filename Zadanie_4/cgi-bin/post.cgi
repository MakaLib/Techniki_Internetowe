#!/usr/bin/env python
import cgi
form = cgi.FieldStorage()
import os
import datetime

title = form.getvalue("tytul", "-")
title = "".join(title.split(";")[0:])
author = form.getvalue("autor", "-")
author = "".join(author.split(";")[0:])
date = str(datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S"))
ip = os.environ['REMOTE_ADDR']
fileOpenContent = open("baza/dane.txt", "r")
fileContent = fileOpenContent.read()
fileOpenContent.close()
if author != "-" and title != "-":
  fileContent = fileContent + title + ";" + author + ";" + date + ";" + ip + ";;"
file = open("baza/dane.txt", "w")
file.write(fileContent)
file.close()

print "Content-type: text/html"
print
print "<!DOCTYPE html>"
print """
<html>
  <head>
    <title>Form</title>
    <style type='text/css'>
    table {margin: auto; border-collapse: collapse;}
    th {background: yellow;}
    tr {text-align: center; background-color: #CFD8DC; }
    tr:nth-child(even) { background-color: ghostwhite; }
    </style>
  </head>
<body>
<table>
<thead>
<tr>
<th style='width: 200px;'>tytul</th>
<th style='width: 200px;'>autor</th>
<th style='width: 170px;'>date</th>
<th style='width: 100px;'>IP</th>
</tr>
</thead>
"""
fileContent = fileContent.split(";;")
for line in fileContent:
  title = line.split(";")[0]
  author = line.split(";")[1]
  date = line.split(";")[2]
  ip = line.split(";")[3]
  print "<tr><td>"+title+"</td><td>"+author+"</td><td>"+date+"</td><td>"+ip+"</td></tr>"

print """
</table></body></html>
"""
