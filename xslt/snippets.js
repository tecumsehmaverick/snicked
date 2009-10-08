{
	'apply-templates':	'<xsl:apply-templates select="$" mode="$" />',
	'choose':			'<xsl:choose>\n\t$\n</xsl:choose>',
	'copy-of':			'<xsl:copy-of select="$" />',
	'if':				'<xsl:if test="$">\n\t$\n</xsl:if>',
	'otherwise':		'<xsl:otherwise>\n\t$\n</xsl:otherwise>',
	'output':			'<xsl:output method="$" encoding="UTF-8" />',
	'template':			'<xsl:template match="$" mode="$">\n\t$\n</xsl:template>',
	'text':				'<xsl:text>$</xsl:text>',
	'value-of':			'<xsl:value-of select="$" />',
	'when':				'<xsl:when test="$">\n\t$\n</xsl:when>',
	'xslt':				'<?xml version="1.0" encoding="UTF-8"?>\n<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">\n\t$\n</xsl:stylesheet>'
}