
"use strict";

document.observe("dom:loaded", function() {

   var img = $$("#labs >");

	for (var i = 0; i < img.length; ++i) {
		new Draggable(img[i], {revert: true});	
	}
	Droppables.add('selectpad', {onDrop: labSelect});
	Droppables.add('labs', {onDrop: labSelect});
});

function labSelect(drag, drop, event) {
	var p = drag.up();
		var pId = p.getAttribute('id');
		if (pId == 'labs' && drop.id == 'selectpad') {
			var select = $$('#selectpad >');
			if (select.length > 2) {
				return;
			}
			var Count = $$('#selection >').length;
			$('selection').insert('<li id="li_' + Count + '">' + drag.getAttribute('alt') + '</li>');
			setTimeout(function() {
				var Count = $$('#selection >').length - 1;
				$('li_' + Count).pulsate({
			  	  duration: 1
				});
			}, 500);
			$('selectpad').insert(drag);
		}
		else if (pId == 'selectpad' && drop.id == 'labs') {
			$('labs').insert(drag);
			var selection = $$('#selection >');
			for (var i = 0; i < selection.length; ++i) {
				if (selection[i].innerHTML == drag.getAttribute('alt')) {
					selection[i].remove();
					break;
			}
		}
	}	
}


