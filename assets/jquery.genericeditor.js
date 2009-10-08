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
				return state.before.match(/(\t*).*$/).pop();
			};
			
			object.getSelection = function() {
				return {
					start:	object.get(0).selectionStart,
					end:	object.get(0).selectionEnd
				};
			};
			
			object.setSelection = function(start, end) {
				object.get(0).selectionStart = start;
				object.get(0).selectionEnd = end;
			};
			
		/*---------------------------------------------------------------------
			Key handler
		---------------------------------------------------------------------*/
			
			object.keyHandlers = [];
			
			object.addKeyHandler = function(callback) {
				object.keyHandlers.push(callback);
			};
			
			object.bind('keypress', function(event) {
				var value = object.val();
				var index = this.selectionStart;
				var handled = false;
				
				state = {
					before:		value.slice(0, this.selectionStart),
					after:		value.slice(this.selectionStart),
					offset:		0,
					key:		event.keyCode | event.charCode | event.which,
					selection:	{
						start:		null,
						end:		null
					}
				};
				
				jQuery(object.keyHandlers).each(function() {
					if (this(object, state)) {					
						handled = true;
						
						return false;
					}
				});
				
				if (handled) {
					object.val(state.before + state.after);
					
					if (!state.selection.start || !state.selection.end) {
						this.selectionStart = state.before.length;
						this.selectionEnd = state.before.length;
					}
					
					else {
						this.selectionStart = state.selection.start;
						this.selectionEnd = state.selection.end;
					}
				}
				
				return !handled;
			});
			
			return object;
		});
		
		objects.addKeyHandler = function(callback) {
			objects.each(function() {
				this.addKeyHandler(callback);
			});
		};
		
		return objects;
	};
	
/*---------------------------------------------------------------------------*/