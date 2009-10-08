{
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