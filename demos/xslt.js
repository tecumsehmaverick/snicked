{
	// Autocompletion:
	autocomplete:	{
		keys: {
			9:		'tab',
			13:		'enter'
		},
		rules:	[
			// Definition list:
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
			
			// XSL Template:
			{
				key:			'tab',
				before:			/template$/,
				snippet:		'<xsl:{#0} match="{$0}" mode="{$1}">\n\t{$2}\n</xsl:{#0}>'
			},
			
			// XSL Apply templates:
			{
				key:			'tab',
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