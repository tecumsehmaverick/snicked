{
	// Autocompletion:
	autocomplete:	{
		keys: {
			9:		'tab',
			13:		'enter'
		},
		rules:	[
			// HTML List:
			{
				key:			'tab',
				before:			/<(ol|ul)[^<>]*?>$/,
				snippet:		'{#0}\n\t<li>{$0}</li>\n</{#1}>'
			},
			{
				key:			'enter',
				before:			/<li>.*?$/,
				after:			/^<\/li>/,
				snippet:		'{#0}{#1}\n<li>{$0}</li>'
			},
			{
				key:			'enter',
				before:			/<\/li>\s*$/,
				snippet:		'{#0}\n<li>{$0}</li>'
			},
			
			// HTML Definition List:
			{
				key:			'tab',
				before:			/<dl[^>]*?>$/,
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
				before:			/<dd>.*?$/,
				after:			/^<\/dd>/,
				snippet:		'{#0}{#1}\n<dt>{$0}</dt>'
			},
			{
				key:			'enter',
				before:			/<\/dd>\s*$/,
				snippet:		'{#0}\n<dt>{$0}</dt>'
			},
			
			// XSL Apply templates:
			{
				label:			'xsl:apply-templates',
				snippet:		'<xsl:apply-templates select="{$0}" mode="{$0}">\n\t<xsl:with-param name="{$0}" select="{$1}" />{$2}\n</xsl:apply-templates>'
			},
			{
				key:			'tab',
				before:			/apply-templates$/,
				snippet:		'<xsl:{#0} select="{$0}" mode="{$1}" />{$2}'
			},
			{
				key:			'enter',
				before:			/<xsl:with-param[^<>]+\/>$/,
				snippet:		'{#0}\n<xsl:with-param name="{$0}" select="{$1}" />{$2}'
			},
			
			// XSL Choose:
			{
				label:			'xsl:choose',
				snippet:		'<xsl:choose>\n\t<xsl:when test="{$0}">\n\t\t{$1}\n\t</xsl:when>\n</xsl:choose>'
			},
			{
				key:			'tab',
				before:			/<xsl:choose[^<>]*?>$/,
				snippet:		'{#0}\n\t<xsl:when test="{$0}">\n\t\t{$1}\n\t</xsl:when>\n</xsl:choose>'
			},
			{
				key:			'tab',
				before:			/choose$/,
				snippet:		'<xsl:{#0}>\n\t<xsl:when test="{$0}">\n\t\t{$1}\n\t</xsl:when>\n</xsl:{#0}>'
			},
			
			// XSL Copy/Value Of:
			{
				label:			'xsl:copy-of',
				snippet:		'<xsl:copy-of select="{$0}" />'
			},
			{
				label:			'xsl:value-of',
				snippet:		'<xsl:value-of select="{$0}" />'
			},
			{
				key:			'tab',
				before:			/(copy|value)-of$/,
				snippet:		'<xsl:{#0} select="{$0}" />'
			},
			
			// XSL If/When:
			{
				key:			'tab',
				before:			/<xsl:(if|when)[^<>]*?>$/,
				snippet:		'{#0}\n\t{$1}\n</xsl:{#1}>'
			},
			{
				key:			'tab',
				before:			/if$|when$/,
				snippet:		'<xsl:{#0} test="{$0}">\n\t{$1}\n</xsl:{#0}>'
			},
			
			// XSL Otherwise:
			{
				key:			'tab',
				before:			/<xsl:otherwise[^<>]*?>$/,
				snippet:		'{#0}\n\t{$1}\n</xsl:otherwise>'
			},
			{
				key:			'tab',
				before:			/otherwise$/,
				snippet:		'<xsl:{#0}>\n\t{$1}\n</xsl:{#0}>'
			},
			
			// XSL Output:
			{
				key:			'tab',
				before:			/output$/,
				snippet:		'<xsl:{#0} method="{$0}" encoding="UTF-8" />'
			},
			
			// XSL Stylesheet:
			{
				key:			'tab',
				before:			/<xsl:stylesheet[^<>]*?>$/,
				snippet:		'{#0}\n\t{$0}\n</xsl:stylesheet>'
			},
			{
				key:			'tab',
				before:			/stylesheet$/,
				snippet:		'<?xml version="1.0" encoding="UTF-8"?>\n<xsl:{#0} version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">\n\t{$0}\n</xsl:{#0}>'
			},
			
			// XSL Template:
			{
				key:			'tab',
				before:			/<xsl:template[^<>]*?>$/,
				snippet:		'{#0}\n\t{$0}\n</xsl:template>'
			},
			{
				key:			'tab',
				before:			/template$/,
				snippet:		'<xsl:{#0} match="{$0}" mode="{$1}">\n\t{$2}\n</xsl:{#0}>'
			},
			
			// XSL Text:
			{
				key:			'tab',
				before:			/<xsl:text[^<>]*?>$/,
				snippet:		'{#0}{$0}</xsl:text>'
			},
			{
				key:			'tab',
				before:			/text$/,
				snippet:		'<xsl:{#0}>{$2}</xsl:{#0}>'
			}
		]
	},
	
	indentation: {
		rules:	[
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
}
