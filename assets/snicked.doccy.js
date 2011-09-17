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
					snippet:	'{a @href {$0}: {$1}}'
				},

				// Expand A element
				{
					key:		'tab',
					before:		/a:$/i,
					snippet:	'{a @href {$0}: {$1}}'
				},

				// Auto-complete DL elements:
				{
					key:		'colon',
					before:		/[{]dl$/,
					after:		/[}]/,
					snippet:	'{dl:\n\t{dt: {$0}}\n\t{dd: {$1}}\n}'
				},

				// Expand DL element
				{
					key:		'tab',
					before:		/dl:$/i,
					snippet:	'{dl:\n\t{dt: {$0}}\n\t{dd: {$1}}\n}'
				},

				// Audo-insert DD element:
				{
					key:		'enter',
					before:		/[{]dt:.*?[}]$/,
					snippet:	'{#0}\n{dd: {$0}}'
				},

				// Audo-insert DT element:
				{
					key:		'enter',
					before:		/[{]dd:.*?[}]$/,
					snippet:	'{#0}\n{dt: {$0}}'
				},

				// Auto-complete OL, UL elements:
				{
					key:		'colon',
					before:		/[{](ol|ul)$/,
					after:		/[}]/,
					snippet:	'{{#1}:\n\t{li: {$0}}\n}'
				},

				// Expand OL, UL element
				{
					key:		'tab',
					before:		/(ol|ul):$/i,
					snippet:	'{{#1}:\n\t{li: {$0}}\n}'
				},

				// Audo-insert LI element:
				{
					key:		'enter',
					before:		/[{]li:.*?[}]$/,
					snippet:	'{#0}\n{li: {$0}}'
				},

				// Auto-complete PRE element:
				{
					key:		'colon',
					before:		/[{]pre$/,
					after:		/[}]/,
					snippet:	'{pre:\n{$0}}'
				},

				// Expand PRE element
				{
					key:		'tab',
					before:		/pre:$/i,
					snippet:	'{pre:\n{$0}}'
				},

				// Expand any element:
				{
					key:		'tab',
					before:		/[a-z][a-z0-9#.]*:$/i,
					snippet:	'{{#0} {$0}}'
				},

				// Add space when typing colon in an empty element:
				{
					key:		'colon',
					after:		/^[}]/,
					snippet:	': {$0}}'
				}
			]
		}
	});
};