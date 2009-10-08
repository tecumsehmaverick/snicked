/*-----------------------------------------------------------------------------
	Advanced Editor jQuery Plugin
-----------------------------------------------------------------------------*/
	
	jQuery.fn.advancedEditor = function(custom_settings) {
		var editor = this.genericEditor();
		var snippets = {}, completes = {};
		var settings = jQuery.extend(
			{
				snippets:			null,
				completes:			null
			},
			custom_settings
		);
		
	/*-------------------------------------------------------------------------
		Resources
	-------------------------------------------------------------------------*/
		
		if (settings.snippets) jQuery.getJSON(settings.snippets, function(data) {
			snippets = data;
		});
		
		if (settings.completes) jQuery.getJSON(settings.completes, function(data) {
			completes = data;
		});
		
	/*-------------------------------------------------------------------------
		Snippets
	-------------------------------------------------------------------------*/
		
		(function() {
			var current = null;
			
			editor.addKeyHandler(function(object, state) {
				if (!current && state.key == 9) {
					var word = state.before.match(/\b[\w\-]+$/);
					
					if (!word || !snippets[word[0]]) return false;
					
					var snippet = snippets[word[0]], point = null;
					var indent = object.getIndentation();
					var lines = snippet.split("\n");
					
					// Remove trigger:
					state.before = state.before.slice(0, 0 - word[0].length);
					
					// Reindent snippet:
					lines = jQuery(lines).map(function(index, line) {
						if (!index) return line;
						
						return indent + line;
					});
					
					snippet = lines.get().join("\n");
					
					current = {
						length:		0,
						offset:		0,
						selection:	object.getSelection(),
						points:		[]
					};
					
					// Find all cursor points:
					while (point = snippet.match(/\$/)) {
						current.points.push(
							snippet.indexOf(point[0])
							+ state.before.length
						);
						snippet = snippet.replace(point[0], '');
					}
					
					// No jump points:
					if (!current.points.length) {
						state.before += snippet;
						current = null;
						
						return true;
					}
					
					state.after = snippet + state.after;
					
					current.length = state.before.length + state.after.length;
					current.position = state.before.length;
				}
				
				// Work on current snippet:
				if (current && state.key == 9) {
					var position = current.points.shift();
					var length = state.before.length + state.after.length;
					
					current.offset += (length - current.length);
					state.selection.start = position + current.offset;
					state.selection.end = state.selection.start;
					current.length = length;
					
					if (current.points.length == 0) {
						current = null;
						
						return true;
					}
					
					return true;
				}
				
				return false;
			});
		})();
		
	/*-------------------------------------------------------------------------
		Completes
	-------------------------------------------------------------------------*/
		
		(function() {
			editor.addKeyHandler(function(object, state) {
				// Insert ending tag, child and attribute:
				if (state.key == 62 && /<[a-z0-9:-]+$/.test(state.before)) {
					var matches = /<([a-z0-9:-]+)$/.exec(state.before);
					
					if (matches.length != 2) return false;
					
					var name = matches.pop();
					var item = completes[name];
					
					if (item && item.indent_mode == 'block') {
						var indent = object.getIndentation();
						
						state.before += ">\n" + indent + "\t";
						state.after = "\n" + indent + '</' + name + '>' + state.after;
					}
					
					else {
						state.before += ">";
						state.after = '</' + name + '>' + state.after;
					}
					
					if (item && item.child) {
						state.before += '<' + item.child + '>';
						state.after = '</' + item.child + '>' + state.after;
					}
					
					return true;
				}
				
				if (state.key != 13) return false;
				
				var open_before = /<([a-z0-9:-]+)>$/.exec(state.before);
				var close_after = /^<\/([a-z0-9:-]+)>/.exec(state.after);
				var open_close_before = /<([a-z0-9:-]+)><\/([a-z0-9:-]+)>$/.exec(state.before);
				
				// Remove empty list item and jump to end:
				if (open_before && close_after && open_before[1] == close_after[1]) {
					var name = open_before[1];
					var item = completes[name];
					
					if (!item || item.indent_mode != 'list-item') return false;
					
					state.before = state.before.replace(/\s*<[a-z0-9:-]+>$/, '');
					state.after = state.after.replace(/^<\/[a-z0-9:-]+>/, '');
					
					return true;
				}
				
				else if (open_close_before && open_close_before[1] == open_close_before[2]) {
					var name = open_close_before[1];
					var item = completes[name];
					var index = 0;
					
					if (!item || item.indent_mode != 'list-item') return false;
					
					state.before = state.before.replace(/\s*<[a-z0-9:-]+><\/[a-z0-9:-]+>$/, '');
					
					return true;
				}
				
				// Insert completable sibling:
				if (/<[a-z0-9:-]+>$/.test(state.before)) {
					var name = /<([a-z0-9:-]+)>$/.exec(state.before).pop();
					var item = completes[name];
					
					if (!item || item.indent_mode != 'block' || !item.child) return false;
					
					var indent = object.getIndentation();
					
					state.before += "\n\t" + indent + '<' + item.child + '>';
					state.after = '</' + item.child + '>' + state.after;
					
					return true;
				}
				
				if (/<\/[a-z0-9:-]+>$/.test(state.before)) {
					var name = /<\/([a-z0-9:-]+)>$/.exec(state.before).pop();
					var item = completes[name];
					
					if (!item || item.indent_mode != 'list-item' || !item.sibling) return false;
					
					var indent = object.getIndentation();
					
					state.before += "\n" + indent + '<' + item.sibling + '>';
					state.after = '</' + item.sibling + '>' + state.after;
					
					return true;
				}
				
				else if (/^<\/[a-z0-9:-]+>/.test(state.after)) {
					var name = /^<\/([a-z0-9:-]+)>/.exec(state.after).pop();
					var item = completes[name];
					
					if (!item || item.indent_mode != 'list-item' || !item.sibling) return false;
					
					var ignore = /^.*$/m.exec(state.after).pop();
					var indent = object.getIndentation();
					
					state.before += ignore + "\n" + indent + '<' + item.sibling + '>';
					state.after = '</' + item.sibling + '>' + state.after.slice(ignore.length);
					
					return true;
				}
				
				return false;
			});
		})();
		
	/*-------------------------------------------------------------------------
		Autoindent
	-------------------------------------------------------------------------*/
		
		(function() {
			editor.addKeyHandler(function(object, state) {
				if (state.key == 9) {
					state.before += "\t";
					
					return true;
				}
				
				else if (state.key == 13) {
					var indent = object.getIndentation();
					
					state.before += "\n" + indent;
					
					return true;
				}
				
				return false;
			});
		})();
		
		return editor;
	};
	
/*---------------------------------------------------------------------------*/