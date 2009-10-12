/*-----------------------------------------------------------------------------
	Advanced Editor jQuery Plugin
-----------------------------------------------------------------------------*/
	
	jQuery.fn.advancedEditor = function(language_source) {
		var editors = this.genericEditor();
		var snippets = {}, completes = {};
		var language = {};
		var indentationRules = {};
		
		if (language_source) jQuery.getJSON(language_source, function(data) {
			language = data;
			snippets = language.snippets;
			completes = language.completes;
			indentationRules = language.indentationRules;
		});
		
	/*-------------------------------------------------------------------------
		Snippets
	-------------------------------------------------------------------------*/
		
		(function() {
			var current = null;
			
			editors.addKeyHandler(function(object, key) {
				if (!current && key == 9) {
					var before = object.selection.getPrecedingText();
					var word = before.match(/\b[\w\-]+$/);
					
					if (!word || !snippets[word[0]]) return false;
					
					var snippet = snippets[word[0]], point = null;
					var indent = object.getIndentation();
					var lines = snippet.split("\n");
					
					// Remove trigger:
					before = before.slice(0, 0 - word[0].length);
					
					// Reindent snippet:
					lines = jQuery(lines).map(function(index, line) {
						if (!index) return line;
						
						return indent + line;
					});
					
					snippet = lines.get().join("\n");
					
					current = {
						length:		0,
						offset:		0,
						selection:	object.selection.getRange(),
						points:		[]
					};
					
					// Find all cursor points:
					while ((point = snippet.match(/\$/))) {
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
						object.selection.setPrecedingText(before);
						
						return true;
					}
					
					object.selection.insertTextAfter(snippet);
					object.selection.setPrecedingText(before);
					
					current.length = object.val().length;
					current.position = before.length;
				}
				
				// Work on current snippet:
				if (current && key == 9) {
					var position = current.points.shift();
					var length = object.val().length;
					
					current.offset += (length - current.length);
					current.length = length;
					
					object.selection.setRange(
						position + current.offset
					);
					
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
			editors.addKeyHandler(function(object, key) {
				var after = object.selection.getFollowingText();
				var before = object.selection.getPrecedingText();
				
				// Insert ending tag, child and attribute:
				if (key == 62 && /<[a-z0-9:-]+$/.test(before)) {
					var matches = /<([a-z0-9:-]+)$/.exec(before);
					
					if (matches.length != 2) return false;
					
					var name = matches.pop();
					var item = completes[name];
					
					if (item && item.indent_mode == 'block') {
						var indent = object.getIndentation();
						
						object.selection.insertTextBefore(
							">\n" + indent + "\t"
						);
						object.selection.insertTextAfter(
							"\n" + indent + '</' + name + '>'
						);
					}
					
					else {
						object.selection.insertTextBefore(">");
						object.selection.insertTextAfter('</' + name + '>');
					}
					
					if (item && item.child) {
						object.selection.insertTextBefore(
							'<' + item.child + '>'
						);
						object.selection.insertTextAfter(
							'</' + item.child + '>'
						);
					}
					
					return true;
				}
				
				if (key != 13) return false;
				
				var open_before = /<([a-z0-9:-]+)>$/.exec(before);
				var close_after = /^<\/([a-z0-9:-]+)>/.exec(after);
				var open_close_before = /<([a-z0-9:-]+)><\/([a-z0-9:-]+)>$/.exec(before);
				
				// Remove empty list item and jump to end:
				if (open_before && close_after && open_before[1] == close_after[1]) {
					var name = open_before[1];
					var item = completes[name];
					
					if (!item || item.indent_mode != 'list-item') return false;
					
					object.selection.setPrecedingText(
						before.replace(/\s*<[a-z0-9:-]+>$/, '')
					);
					object.selection.setFollowingText(
						after.replace(/^<\/[a-z0-9:-]+>/, '')
					);
					
					return true;
				}
				
				else if (open_close_before && open_close_before[1] == open_close_before[2]) {
					var name = open_close_before[1];
					var item = completes[name];
					var index = 0;
					
					if (!item || item.indent_mode != 'list-item') return false;
					
					object.selection.setPrecedingText(
						before.replace(/\s*<[a-z0-9:-]+><\/[a-z0-9:-]+>$/, '')
					);
					
					return true;
				}
				
				// Insert completable sibling:
				if (/<[a-z0-9:-]+>$/.test(before)) {
					var name = /<([a-z0-9:-]+)>$/.exec(before).pop();
					var item = completes[name];
					
					if (!item || item.indent_mode != 'block' || !item.child) return false;
					
					var indent = object.getIndentation();
					
					object.selection.insertTextBefore(
						"\n\t" + indent + '<' + item.child + '>'
					);
					object.selection.insertTextAfter(
						'</' + item.child + '>'
					);
					
					return true;
				}
				
				if (/<\/[a-z0-9:-]+>$/.test(before)) {
					var name = /<\/([a-z0-9:-]+)>$/.exec(before).pop();
					var item = completes[name];
					
					if (!item || item.indent_mode != 'list-item' || !item.sibling) return false;
					
					var indent = object.getIndentation();
					
					object.selection.insertTextBefore(
						"\n" + indent + '<' + item.sibling + '>'
					);
					object.selection.insertTextAfter(
						'</' + item.sibling + '>'
					);
					
					return true;
				}
				
				else if (/^<\/[a-z0-9:-]+>/.test(after)) {
					var name = /^<\/([a-z0-9:-]+)>/.exec(after).pop();
					var item = completes[name];
					
					if (!item || item.indent_mode != 'list-item' || !item.sibling) return false;
					
					var ignore = /^.*$/m.exec(after).pop();
					var indent = object.getIndentation();
					
					object.selection.insertTextBefore(
						ignore + "\n" + indent + '<' + item.sibling + '>'
					);
					object.selection.setFollowingText(
						'</' + item.sibling + '>' + after.slice(ignore.length)
					);
					
					return true;
				}
				
				return false;
			});
		})();
		
	/*-------------------------------------------------------------------------
		Autoindent
	-------------------------------------------------------------------------*/
		
		(function() {
			editors.addKeyHandler(function(editor, key) {
				if (key == 9) {
					editor.selection.insertTextBefore("\t");
					
					return true;
				}
				
				else if (key == 13) {
					var after = editor.selection.getFollowingText();
					var before = editor.selection.getPrecedingText();
					var indent = editor.getIndentation();
					
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
					
					editor.selection.insertTextBefore("\n" + indent);
					
					return true;
				}
				
				return false;
			});
		})();
		
		return editors;
	};
	
/*---------------------------------------------------------------------------*/