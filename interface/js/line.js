line = function(spec) {
	var that = {};

	spec.id = spec.id || -1;
	spec.x = spec.x || -1;
	spec.y = spec.y-1 || -1;

	spec.width = spec.width || 800;
	spec.height = spec.height+2 || 1224;

	spec.is_displayed = spec.is_displayed || false;

	spec.words = spec.words || [];


	that.set_id = function(id) {
		spec.id = id;
	}
	that.get_id = function() {
		return spec.id;
	}



	that.get_id = function() {
		return spec.id;
	}

	that.set_x = function(x) {
		spec.x = x;
	}
	that.get_x = function() {
		return spec.x;
	}
	that.set_y = function(y) {
		spec.y = y-1;
	}
	that.get_y = function() {
		return spec.y;
	}


	that.set_width = function(width) {
		spec.width = width;
	}
	that.get_width = function() {
		return spec.width;
	}
	that.set_height = function(height) {
		spec.height = height;
	}
	that.get_height = function() {
		return spec.height+2;
	}

	that.is_displayed = function() {
		return spec.is_displayed;
	}
	that.hide = function() {
		spec.is_displayed = false;
	}



	that.display = function(page_id) {
		$("#page_"+page_id).append("<div id=\"highlight_"+page_id+"-"+spec.id+"\" class=\"highlight_text\" style=\"margin-top: "+spec.y+"px; margin-left: "+spec.x+"px; width: "+spec.width+"px; height: "+spec.height+"px;\"></div>");

		spec.is_displayed = true;
	};


	that.display_start_line = function(page_id, first_line_x) {
		var selection_start_x = spec.x;
		var width = spec.width;
		for(var i=0; i<spec.words.length; i++) {
			if (spec.words[i].get_x() <= first_line_x) {
				selection_start_x = spec.words[i].get_x();
			}
			else {
				break;
			}
		}
		width -= (selection_start_x-spec.x);
		$("#page_"+page_id).append("<div id=\"highlight_"+page_id+"-"+spec.id+"\" class=\"highlight_text\" style=\"margin-top: "+spec.y+"px; margin-left: "+selection_start_x+"px; width: "+width+"px; height: "+spec.height+"px;\"></div>");

		spec.is_displayed = true;
	};


	that.display_last_line = function(page_id, last_line_x) {
		var selection_end_x;
		var width;
		for(var i=0; i<spec.words.length; i++) {
			if (spec.words[i].get_x() >= last_line_x) {
				break;
			}
			else {
				if (i+1 < spec.words.length) {
					selection_end_x = spec.words[i+1].get_x();
				}
				else {
					selection_end_x = spec.words[i].get_x() + spec.words[i].get_width();
				}
			}
		}
		width = selection_end_x-spec.x;

		$("#page_"+page_id).append("<div id=\"highlight_"+page_id+"-"+spec.id+"\" class=\"highlight_text\" style=\"margin-top: "+spec.y+"px; margin-left: "+spec.x+"px; width: "+width+"px; height: "+spec.height+"px;\"></div>");

		spec.is_displayed = true;
	};



	that.display_only_line = function(page_id, first_line_x, last_line_x) {
		if (first_line_x > last_line_x) {
			var temp = last_line_x;
			last_line_x = first_line_x;
			first_line_x = temp;
		}

		var found_start = false;
		var selection_start_x = -1;
		var selection_end_x = -1;
		var width = 0;
		for(var i=0; i<spec.words.length; i++) {
			if ((!found_start) && (spec.words[i].get_x() >= first_line_x)) {
				//selection_start_x = spec.words[i].get_x();
				if (i+1 < spec.words.length) {
					selection_end_x = spec.words[i+1].get_x();
				}
				else {
					selection_end_x = spec.words[i].get_x() + spec.words[i].get_width();
				}

				found_start = true;
			}
			else if (!found_start) {
				selection_start_x = spec.words[i].get_x();
			}


			if (spec.words[i].get_x() + spec.words[i].get_width() >= last_line_x) {
				if (i+1 < spec.words.length) {
					selection_end_x = spec.words[i+1].get_x();
				}
				else {
					selection_end_x = spec.words[i].get_x() + spec.words[i].get_width();
				}
				break;
			}
		}

		if (selection_end_x == -1) {
			width = spec.width - (selection_start_x-spec.x);
		}
		else {
			width = selection_end_x - selection_start_x;
		}



		$("#page_"+page_id).append("<div id=\"highlight_"+page_id+"-"+spec.id+"\" class=\"highlight_text\" style=\"margin-top: "+spec.y+"px; margin-left: "+selection_start_x+"px; width: "+width+"px; height: "+spec.height+"px;\"></div>");

		spec.is_displayed = true;
	};





	that.add_word = function(word) {
		spec.words.push(word);
	};





	return that;
}
