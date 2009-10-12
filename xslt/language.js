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
	
	// Autocompletion:
	autocomplete:	{
		keys: {
			9:		'tab',
			13:		'enter'
		},
		rules:	[
			// Definition list:
			{
				key:			'enter',
				before:			/<dl>$/,
				snippet:		'{#0}\n\t<dt>{$0}</dt>\n</dl>'
			},
			{
				key:			'enter',
				before:			/<dt>.*?$/,
				after:			/^<\/dt>/,
				snippet:		'{#0}{#1}\n<dd>{$0}</dd>'
			},
			{
				key:			'enter',
				before:			/<\/dt>\s*$/,
				snippet:		'{#0}\n<dd>{$0}</dd>'
			},
			{
				key:			'enter',
				before:			/<dd>$/,
				after:			/^<\/dd>/,
				snippet:		'{#0}{#1}\n<dt>{$0}</dt>'
			},
			{
				key:			'enter',
				before:			/<\/dd>\s*$/,
				snippet:		'{#0}\n<dt>{$0}</dt>'
			},
			
			// XSL Template:
			{
				key:			'tab',
				before:			/template$/,
				snippet:		'<xsl:{#0} match="{$0}" mode="{$1}">\n\t{$2}\n</xsl:{#0}>'
			},
			
			// XSL Apply templates:
			{
				key:			'enter',
				before:			/(<xsl:apply-templates[^<]*?)\s*\/?>(\s*)$/,
				snippet:		'{#1}>{#3}\n\t<xsl:with-param name="{$0}" select="{$1}" />{$2}\n</xsl:apply-templates>'
			},
			{
				key:			'tab',
				before:			/apply-templates$/,
				snippet:		'<xsl:{#0} select="{$0}" mode="{$1}" />{$2}'
			},
			{
				key:			'enter',
				before:			/<xsl:with-param[^<]+\/>$/,
				snippet:		'{#0}\n<xsl:with-param name="{$0}" select="{$1}" />{$2}'
			}
		]
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
	]
}