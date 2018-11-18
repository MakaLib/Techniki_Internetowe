#!/usr/bin/env python

import cgi
import datetime
import os
form = cgi.FieldStorage()


autor = form.getvalue('autor')
tytul = form.getvalue('tytul')

wpis = tytul + "|" + autor + "|" + datetime.datetime.now().strftime('%Y/%m/%d %H:%M:%S') + "|" + os.environ.get('REMOTE_ADDR')

f = open('baza/baza_dane.txt', 'a')
f.write(wpis + "\n")
f.close()
f = open('baza/baza_dane.txt', 'r')
print("Content-type: text/html\n")

print("<!DOCTYPE html><html><head><title>A CGI Script</title></head><body>")                 # adds blank line

print('<H1>LOL</H1><HR>')


print("""<table>
  <tr>
    <th>Tytul</th>
    <th>Autor</th>
    <th>data</th>
    <th>IP</th>
  </tr>""")


for rekord in f:
    dane = rekord.split("|")
    print("<tr><td>"+dane[0]+"</td><td>" + dane[1]+"</td><td>" + dane[2]+"</td><td>" + dane[3]+"</td></tr>")

print('</table>')
print("</body></html>")
f.close()
