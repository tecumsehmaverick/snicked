jQuery.fn.snickedXSLT = function() {
	jQuery(this).snicked({
		autocomplete:	{
			keys: {
				9:		'tab',
				13:		'enter',
				62:		'tagit'
			},
			rules:	[
				// XSL Apply Templates:
				{
					key:			'tab',
					before:			/apply-templates$/,
					snippet:		'<xsl:apply-templates select="{$0}" mode="{$0}">\n\t<xsl:with-param name="{$0}" select="{$1}" />{$2}\n</xsl:apply-templates>'
				},

				// XSL Call Template:
				{
					key:			'tab',
					label:			/call-template$/,
					snippet:		'<xsl:call-template name="{$0}">\n\t<xsl:with-param name="{$0}" select="{$1}" />{$2}\n</xsl:call-template>'
				},

				// XSL Choose:
				{
					key:			'tab',
					label:			/choose$/,
					snippet:		'<xsl:choose>\n\t<xsl:when test="{$0}">\n\t\t{$1}\n\t</xsl:when>\n</xsl:choose>'
				},
				{
					key:			'tab',
					before:			/<xsl:choose[^<>]*?>$/,
					snippet:		'{#0}\n\t<xsl:when test="{$0}">\n\t\t{$1}\n\t</xsl:when>\n</xsl:choose>'
				},

				// XSL Copy/Value Of:
				{
					key:			'tab',
					label:			/copy-of$/,
					snippet:		'<xsl:copy-of select="{$0}" />'
				},
				{
					key:			'tab',
					label:			/value-of$/,
					snippet:		'<xsl:value-of select="{$0}" />'
				},

				// XSL If/When:
				{
					key:			'tagit',
					before:			/<xsl:(if|when)[^<>]*?$/,
					snippet:		'{#0}>\n\t{$1}\n</xsl:{#1}>'
				},
				{
					key:			'tab',
					label:			/if$/,
					snippet:		'<xsl:if test="{$0}">\n\t{$1}\n</xsl:if>'
				},
				{
					key:			'tab',
					label:			/when$/,
					snippet:		'<xsl:when test="{$0}">\n\t{$1}\n</xsl:when>'
				},

				// XSL Otherwise:
				{
					key:			'tagit',
					before:			/<xsl:otherwise[^<>]*?$/,
					snippet:		'{#0}>\n\t{$1}\n</xsl:otherwise>'
				},
				{
					key:			'tab',
					label:			/otherwise$/,
					snippet:		'<xsl:otherwise>\n\t{$1}\n</xsl:otherwise>'
				},

				// XSL Output:
				{
					key:			'tab',
					label:			/output$/,
					snippet:		'<xsl:output method="{$0}" encoding="UTF-8" />'
				},

				// XSL Stylesheet:
				{
					key:			'tagit',
					before:			/<xsl:stylesheet[^<>]*?$/,
					snippet:		'{#0}>\n\t{$0}\n</xsl:stylesheet>'
				},
				{
					key:			'tab',
					label:			/stylesheet$/,
					snippet:		'<?xml version="1.0" encoding="UTF-8"?>\n<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">\n\t{$0}\n</xsl:stylesheet>'
				},

				// XSL Template:
				{
					key:			'tagit',
					before:			/<xsl:template[^<>]*?$/,
					snippet:		'{#0}>\n\t{$0}\n</xsl:template>'
				},
				{
					key:			'tab',
					label:			/template$/,
					snippet:		'<xsl:template match="{$0}" mode="{$1}">\n\t{$2}\n</xsl:template>'
				},

				// XSL Text:
				{
					key:			'tagit',
					before:			/<xsl:text[^<>]*?$/,
					snippet:		'{#0}>{$0}</xsl:text>'
				},
				{
					key:			'tab',
					label:			/text$/,
					snippet:		'<xsl:text>{$0}</xsl:text>'
				},

				// XSL With Param:
				{
					key:			'tab',
					label:			/with-param$/,
					snippet:		'<xsl:with-param name="{$0}" select="{$1}" />{$2}'
				},
				{
					key:			'enter',
					before:			/<xsl:with-param[^<>]+\/>$/,
					snippet:		'{#0}\n<xsl:with-param name="{$0}" select="{$1}" />{$2}'
				},

				// Any XML end tag:
				{
					key:			'tagit',
					before:			/<(a)$/,
					snippet:		'{#0} href="{$0}">{$1}</{#1}>'
				},
				{
					key:			'tagit',
					before:			/<([a-z][a-z0-9_-]*(:[a-z][a-z0-9_-]*)?)$/,
					snippet:		'{#0}>{$0}</{#1}>'
				}
			]
		}
	});
};