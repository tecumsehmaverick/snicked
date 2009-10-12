/*-----------------------------------------------------------------------------
	Snicked Editor jQuery Plugin
-----------------------------------------------------------------------------*/
	
	jQuery.fn.snicked = function(language_source) {
		var editors = this.snickedCore();
		var autocomplete = {};
		var indentation = [];
		
		if (language_source) jQuery.getJSON(language_source, function(data) {
			autocomplete = data.autocomplete;
			indentation = data.indentation;
		});
		
	/*-------------------------------------------------------------------------
		Autocomplete
	-------------------------------------------------------------------------*/
		
		(function() {
			var current = null;
			var next = function(editor, selection) {
				var position = current.points.shift();
				var length = editor.val().length;
				
				current.offset += (length - current.length);
				current.length = length;
				
				selection.start = position + current.offset;
				selection.end = selection.start;
				
				editor.setSelection(selection);
				
				if (current.points.length == 0) {
					current = null;
					
					return true;
				}
				
				return true;
			};
			
			editors.addKeyHandler(function(editor, key) {
				var selection = editor.getSelection();
				
				// Find completion:
				if (!current && autocomplete.keys[key]) {
					var trigger = autocomplete.keys[key];
					var before = editor.getBefore(selection);
					var after = editor.getAfter(selection);
					var completed = false;
					
					jQuery(autocomplete.rules).each(function(index, rule) {
						if (rule.key != trigger) return true;
						
						if (!rule.before) rule.before = /$/;
						if (!rule.after) rule.after = /^/;
						
						if (!rule.before.test(before) || !rule.after.test(after)) {
							return true;
						}
						
						var snippet = rule.snippet, point = null;
						var indent = editor.getIndentation();
						var lines = snippet.split("\n");
						var captures = before.match(rule.before).concat(after.match(rule.after));
						
						// Remove matched parts:
						editor.setBefore(selection, before.replace(rule.before, ''));
						editor.setAfter(selection, after.replace(rule.after, ''));
						
						before = editor.getBefore(selection);
						after = editor.getAfter(selection);
						
						// Reindent snippet:
						lines = jQuery(lines).map(function(index, line) {
							if (!index) return line;
							
							return indent + line;
						});
						
						snippet = lines.get().join("\n");
						
						// Set current state:
						current = {
							length:		0,
							offset:		0,
							selection:	selection,
							points:		[]
						};
						
						// Find all capture points:
						while ((point = snippet.match(/\{#([0-9]+)\}/))) {
							var index = parseInt(point[1]);
							
							if (captures[index]) {
								snippet = snippet.replace(point[0], captures[index]);
							}
							
							else {
								snippet = snippet.replace(point[0], '');
							}
						}
						
						// Find all cursor points:
						while ((point = snippet.match(/\{\$[0-9]+\}/))) {
							current.points.push(
								snippet.indexOf(point[0])
								+ before.length
							);
							snippet = snippet.replace(point[0], '');
						}
						
						// No jump points:
						if (!current.points.length) {
							before += snippet;
							current = null;
							editor.setBefore(selection, before);
							completed = true;
							
							return false;
						}
						
						editor.insertBefore(selection, snippet);
						
						current.length = editor.val().length;
						current.position = before.length;
						
						next(editor, selection);
						completed = true;
						
						return false;
					});
					
					return completed;
				}
				
				// Work on current snippet:
				if (current && key == 9) {
					return next(editor, selection);
				}
				
				return false;
			});
		})();
		
	/*-------------------------------------------------------------------------
		Autoindent
	-------------------------------------------------------------------------*/
		
		(function() {
			editors.addKeyHandler(function(editor, key) {
				var selection = editor.getSelection();
				
				if (key == 9) {
					editor.insertBefore(selection, "\t");
					
					return true;
				}
				
				else if (key == 13) {
					var after = editor.selection.getFollowingText();
					var before = editor.selection.getPrecedingText();
					var indent = editor.getIndentation();
					
					/*
					jQuery(indentationRules).each(function(index, rule) {
						var matched = false;
						
						if (rule.matchBefore && rule.matchAfter) {
							matched = rule.matchBefore.test(before) && rule.matchAfter.test(after);
						}
						
						else if (rule.matchBefore) {
							matched = rule.matchBefore.test(before);
						}
						
						else if (rule.matchAfter) {
							matched = rule.matchAfter.test(after);
						}
						
						if (matched) {
							if (rule.indentLevel == 1) {
								indent += "\t";
							}
							
							else if (rule.indentLevel == -1) {
								indent = indent.replace('\t', '');
							}
							
							return false;
						}
					});
					*/
					
					editor.insertBefore(selection, "\n" + indent);
					
					return true;
				}
				
				return false;
			});
		})();
		
		return editors;
	};
	
/*---------------------------------------------------------------------------*/