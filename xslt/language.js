{
	wordCharacters:		'[\w\-]+',
	snippets: 			{
		'a':							'<xsl:apply-templates select="$" mode="$" />',
		'apply-templates':				'<xsl:apply-templates select="$" mode="$" />',
		'apply-templates-with-param':	'<xsl:apply-templates select="$" mode="$">\n\t<xsl:with-param name="$" select="$" />\n</xsl:apply-templates>',
		'choose':						'<xsl:choose>\n\t$\n</xsl:choose>',
		'copy-of':						'<xsl:copy-of select="$" />',
		'if':							'<xsl:if test="$">\n\t$\n</xsl:if>',
		'otherwise':					'<xsl:otherwise>\n\t$\n</xsl:otherwise>',
		'output':						'<xsl:output method="$" encoding="UTF-8" />',
		'template':						'<xsl:template match="$" mode="$">\n\t$\n</xsl:template>',
		'text':							'<xsl:text>$</xsl:text>',
		'value-of':						'<xsl:value-of select="$" />',
		'when':							'<xsl:when test="$">\n\t$\n</xsl:when>',
		'xslt':							'<?xml version="1.0" encoding="UTF-8"?>\n<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">\n\t$\n</xsl:stylesheet>'
	},
	indentationRules:	[
		{
			matchBefore:	/[{]$/,
			indentLevel:	1
		},
		{
			matchBefore:	/<x>$/,
			matchAfter:		/^<\/x>/,
			indentLevel:	-1
		},
		{
			matchBefore:	/<x>$/,
			indentLevel:	1
		},
	],
	completes:			{
		// HTML elements:
		blockquote: {
			indent_mode:	'block'
		},
		p: {
			indent_mode:	'block'
		},
		
		// Definition list:
		dl: {
			indent_mode:	'block',
			child:			'dt'
		},
		dt: {
			indent_mode:	'list-item',
			sibling:		'dd'
		},
		dd: {
			indent_mode:	'list-item',
			sibling:		'dt'
		},
		
		// Normal list:
		ol:	{
			indent_mode:	'block',
			child:			'li'
		},
		ul:	{
			indent_mode:	'block',
			child:			'li'
		},
		li: {
			indent_mode:	'list-item',
			sibling:		'li'
		},
		
		// XSLT elements:
		'xsl:choose': {
			indent_mode:	'block'
		},
		'xsl:if': {
			indent_mode:	'block'
		},
		'xsl:otherwise': {
			indent_mode:	'block'
		},
		'xsl:stylesheet': {
			indent_mode:	'block'
		},
		'xsl:template': {
			indent_mode:	'block'
		},
		'xsl:when': {
			indent_mode:	'block'
		},
	}
}