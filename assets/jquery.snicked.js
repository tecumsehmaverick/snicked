/*-----------------------------------------------------------------------------
	Snicked Editor jQuery Plugin
-----------------------------------------------------------------------------*/

	jQuery.fn.snicked = function(language) {
		var editors = this.snickedCore();
		var autocomplete = {};
		var indentation = [];

		if (language) {
			autocomplete = language.autocomplete;
			indentation = language.indentation;
		}

	/*-------------------------------------------------------------------------
		Autocomplete
	-------------------------------------------------------------------------*/

		(function() {
			var states = {
				rule:		null
			};
			var methods = {
				next: function(editor, selection) {
					var position = states.rule.points.shift();
					var length = editor.val().length;

					states.rule.offset += (length - states.rule.length);
					states.rule.length = length;

					selection.start = position + states.rule.offset;
					selection.end = selection.start;

					editor.setSelection(selection);

					if (states.rule.points.length == 0) {
						states.rule = null;

						return true;
					}

					return true;
				},

				// Start using a rule:
				start: function(editor, selection, before, after, rule) {
					var snippet = rule.snippet, point = null;
					var indent = editor.getIndentation();
					var lines = snippet.split("\n");
					var captures = before.match(rule.before).concat(after.match(rule.after));

					// Remove matched parts:
					editor.setBefore(selection, before.replace(rule.before, ''));
					editor.setAfter(selection, after.replace(rule.after, ''));

					before = editor.getBefore(selection);
					after = editor.getAfter(selection);

					// Reindent rule:
					lines = jQuery(lines).map(function(index, line) {
						if (!index) return line;

						return indent + line;
					});

					snippet = lines.get().join("\n");

					// Set current rule:
					states.rule = {
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
						states.rule.points.push(
							snippet.indexOf(point[0])
							+ before.length
						);
						snippet = snippet.replace(point[0], '');
					}

					// No jump points:
					if (!states.rule.points.length) {
						before += snippet;
						states.rule = null;
						editor.setBefore(selection, before);

						return true;
					}

					editor.insertBefore(selection, snippet);

					states.rule.length = editor.val().length;
					states.rule.position = before.length;

					methods.next(editor, selection);

					return true;
				}
			};

			editors.addKeyHandler(function(editor, key, event) {
				var selection = editor.getSelection();
				var before = editor.getBefore(selection);

				// Find rule:
				if (!states.rule && autocomplete.keys[key]) {
					var trigger = autocomplete.keys[key];
					var after = editor.getAfter(selection);
					var completed = false;

					jQuery(autocomplete.rules).each(function(index, rule) {
						if (rule.key != trigger) return true;

						if (!rule.before) rule.before = /$/;
						if (!rule.after) rule.after = /^/;

						if (!rule.before.test(before) || !rule.after.test(after)) {
							return true;
						}

						completed = methods.start(editor, selection, before, after, rule);

						return false;
					});

					return completed;
				}

				// Work on current rule:
				if (states.rule && key == 9) {
					return methods.next(editor, selection);
				}

				return false;
			});
		})();

	/*-------------------------------------------------------------------------
		Autoindent
	-------------------------------------------------------------------------*/

		(function() {
			editors.addKeyHandler(function(editor, key, event) {
				if (key == 9) {
					if (editor.selection.getText()) {
						var text = editor.selection.getText();
						var lines = [];
						var before = editor.selection.getPrecedingText();
						var after = editor.selection.getFollowingText();
						var reset = false;

						// Expand selection to beginning of line:
						if (/\n[^\n]+$/.test(before)) {
							text = before.match(/[^\n]+$/) + text;
							before = before.replace(/[^\n]+$/, '');
							reset = true;
						}

						if (/^[^\n]+\n/.test(after)) {
							text = text + after.match(/^[^\n]+/);
							after = after.replace(/^[^\n]+/, '');
							reset = true;
						}

						if (reset) {
							editor.selection.setText(text);
							editor.selection.setPrecedingText(before);
							editor.selection.setFollowingText(after);
						}

						lines = text.split("\n");

						lines = lines.map(function(line) {
							if (event.shiftKey) {
								return line.replace(/^\t/, '');
							}

							else {
								return "\t" + line;
							}
						});

						editor.selection.setText(lines.join("\n"));
					}

					else if (event.shiftKey) {
						var before = editor.selection.getPrecedingText();

						before = before.replace(/\t$/, '');
						editor.selection.setPrecedingText(before);
					}

					else {
						editor.selection.insertTextBefore("\t");
					}


					return true;
				}

				else if (key == 13) {
					var indent = editor.getIndentation();

					editor.selection.insertTextBefore("\n" + indent);

					return true;
				}

				return false;
			});
		})();

		return editors;
	};

/*---------------------------------------------------------------------------*/
