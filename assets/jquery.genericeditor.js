/*-----------------------------------------------------------------------------
	Generic Editor jQuery Plugin
-----------------------------------------------------------------------------*/
	
	jQuery.fn.genericEditor = function() {
		var objects = this;
		
		objects = objects.map(function() {
			var object = jQuery(this);
			var state = {};
			
		/*---------------------------------------------------------------------
			Utilities
		---------------------------------------------------------------------*/
			
			object.getIndentation = function() {
				return object.selection.getPrecedingText().match(/(\t*).*$/).pop();
			};
			
			object.getSelection = function() {
				var direct = object.get(0);
				
				return {
					start:	direct.selectionStart,
					end:	direct.selectionEnd
				};
			};
			
			object.setSelection = function(range) {
				var direct = object.get(0);
				
				direct.selectionStart = range.start;
				direct.selectionEnd = range.end;
			};
			
		/*---------------------------------------------------------------------
			Selection
		---------------------------------------------------------------------*/
			
			object.selection = {};
			
			object.selection.getRange = function() {
				var direct = object.get(0);
				
				return {
					start:	direct.selectionStart,
					end:	direct.selectionEnd
				};
			};
			
			object.selection.setRange = function(start, end) {
				var direct = object.get(0);
				
				if (!end || end < start) end = start;
				
				direct.selectionStart = start;
				direct.selectionEnd = end;
			};
			
			object.selection.getText = function() {
				var direct = object.get(0);
				
				return object.val().slice(direct.selectionStart, direct.selectionEnd);
			};
			
			object.selection.setText = function(text) {
				var before = object.selection.getPrecedingText();
				var after = object.selection.getFollowingText();
				
				object.val(before + text + after);
				object.selection.setRange(
					before.length,
					before.length + text.length
				);
			};
			
			object.selection.prependText = function(text) {
				object.selection.setText(
					text + object.selection.getText()
				);
			};
			
			object.selection.appendText = function(text) {
				object.selection.setText(
					object.selection.getText() + text
				);
			};
			
			object.selection.getFollowingText = function() {
				var direct = object.get(0);
				
				return object.val().slice(direct.selectionEnd);
			};
			
			object.selection.setFollowingText = function(text) {
				var selection = object.selection.getRange();
				var before = object.val().slice(0, selection.end);
				
				object.val(before + text);
				object.selection.setRange(
					selection.start,
					selection.end
				);
			};
			
			object.selection.getPrecedingText = function() {
				return object.val().slice(0, object.get(0).selectionStart);
			};
			
			object.selection.setPrecedingText = function(text) {
				var selection = object.selection.getRange();
				var before = object.val().slice(0, selection.start);
				var after = object.val().slice(selection.end);
				var offset = before.length - text.length;
				
				object.val(text + after);
				object.selection.setRange(
					selection.start - offset,
					selection.end - offset
				);
			};
			
			object.selection.insertTextBefore = function(text) {
				var before = object.selection.getPrecedingText();
				
				object.selection.setPrecedingText(before + text);
			};
			
			object.selection.insertTextAfter = function(text) {
				var after = object.selection.getFollowingText();
				
				object.selection.setFollowingText(text + after);
			};
			
		/*---------------------------------------------------------------------
			Change handler
		---------------------------------------------------------------------*/
			
			object.changeHandlers = [];
			
			object.addChangeHandler = function(callback) {
				object.changeHandlers.push(callback);
			};
			
			object.bind('change', function(event) {
				var handled = false;
				
				jQuery(object.changeHandlers).each(function() {
					if (this(object, event)) {					
						handled = true;
						
						return false;
					}
					
					return true;
				});
				
				return !handled;
			});
			
		/*---------------------------------------------------------------------
			Key handler
		---------------------------------------------------------------------*/
			
			object.keyHandlers = [];
			
			object.addKeyHandler = function(callback) {
				object.keyHandlers.push(callback);
			};
			
			// Force browser to accept tabs:
			object.bind('keydown', function(event) {
				var key = event.keyCode | event.charCode | event.which;
				
				if (key == 9) {
					event.type = 'keypress';
					event.forceTab = true;
					object.trigger(event);
					
					return false;
				}
				
				return true;
			});
			
			object.bind('keypress', function(event) {
				var key = event.keyCode | event.charCode | event.which;
				var handled = false;
				
				if (key == 9 && !event.forceTab) return false;
				
				jQuery(object.keyHandlers).each(function() {
					if (this(object, key)) {					
						handled = true;
						
						return false;
					}
					
					return true;
				});
				
				return !handled;
			});
			
		/*---------------------------------------------------------------------
			Select handler
		---------------------------------------------------------------------*/
			
			object.selectHandlers = [];
			
			object.addSelectHandler = function(callback) {
				object.selectHandlers.push(callback);
			};
			
			object.bind('select', function(event) {
				var handled = false;
				
				jQuery(object.selectHandlers).each(function() {
					if (this(object, event)) {					
						handled = true;
						
						return false;
					}
					
					return true;
				});
				
				return !handled;
			});
			
		/*-------------------------------------------------------------------*/
			
			return object;
		});
		
		objects.addChangeHandler = function(callback) {
			objects.each(function() {
				this.addChangeHandler(callback);
			});
		};
		
		objects.addKeyHandler = function(callback) {
			objects.each(function() {
				this.addKeyHandler(callback);
			});
		};
		
		objects.addSelectHandler = function(callback) {
			objects.each(function() {
				this.addSelectHandler(callback);
			});
		};
		
		return objects;
	};
	
/*---------------------------------------------------------------------------*/