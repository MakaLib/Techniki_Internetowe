<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> 
  	<xsl:template match="/">
		<html lang="pl">
			<head>
				<meta charset="UTF-8"/>
				<title>Biblioteka</title>
				<link type="text/css" rel="stylesheet" href="style.css"/>
			</head>
			<body>

				<table>
					<tr>
						<td colspan="4" id="main"> Podział na działy </td>
					</tr>
					<xsl:for-each select="biblioteka/dzial">
						<xsl:sort select="temat"/>
						<tr>
							<td colspan="4" class="topic"> <xsl:value-of select="./temat"/> </td>
						</tr>
						<tr>
							<td> Numer </td>
							<td> Autor </td>
							<td> Tytuł </td>
							<td> Cena </td>
						</tr>
						<xsl:for-each select="./ksiazka">
							<xsl:sort select="autor/nazwisko"/>
						<tr>
							<td><xsl:number value="position()" format="1" /></td>
							<td> <xsl:value-of select="./autor"/> </td>
							<td> <xsl:value-of select="./tytul"/> </td>
							<td> <xsl:value-of select="./cena"/> </td>
						</tr>
					</xsl:for-each>
					</xsl:for-each>

				</table>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>