{
	// Autocompletion:
	autocomplete:	{
		keys: {
			9:		'tab',
			13:		'enter'
		},
		rules:	[
			// Brace completion:
			
			// Unordered list:
			{
				key:			'enter',
				before:			/\s*\*\s*$/,
				snippet:		'\n\n{$0}'
			},
			{
				key:			'enter',
				before:			/\s*\*\s*(.*?)$/,
				snippet:		'\n* {#1}\n* {$0}'
			}
		]
	}
}
