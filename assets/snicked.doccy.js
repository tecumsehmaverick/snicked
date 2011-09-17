jQuery.fn.snickedDoccy = function() {
	jQuery(this).snicked({
		autocomplete:	{
			keys: {
				9:		'tab',
				13:		'enter',
				32:		'space',
				45:		'hyphen',
				58:		'colon',
				123:	'open'
			},
			rules:	[
				// Wrap "CSS" selector with element braces:
				{
					key:		'tab',
					before:		/[a-z][a-z0-9#.]*:$/i,
					snippet:	'{{#0} {$0}}'
				},

				// Auto-close end brace:
				{
					key:		'open',
					snippet:	'{{$0}}'
				},

				// Auto-complete A element:
				{
					key:		'colon',
					before:		/[{]a$/,
					after:		/[}]/,
					snippet:	'{a @href {$0}: {$1}}{$2}'
				},

				// Auto-complete PRE element:
				{
					key:		'colon',
					before:		/[{]pre$/,
					after:		/[}]/,
					snippet:	'{pre:\n{$0}}{$1}'
				},

				// Add space when typing colon in an empty element:
				{
					key:		'colon',
					after:		/^[}]/,
					snippet:	': {$0}}'
				},

				// Convert two hyphens into an mdash:
				{
					key:		'hyphen',
					before:		/-$/,
					snippet:	'—'
				},
				{
					key:		'space',
					before:		/-{2}$/,
					snippet:	'— '
				},
				{
					key:		'tab',
					before:		/-{2}$/,
					snippet:	'—'
				}
			]
		}
	});
};