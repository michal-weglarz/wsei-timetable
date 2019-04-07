function simulateActions() {
	var ALBUM_NUM = document.querySelector('#albumNum').innerText;

	function simulateClick(item) {
		item.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
		item.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
		item.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
		item.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
		item.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
		item.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		item.dispatchEvent(new Event('change', { bubbles: true }));

		return true;
	}

	var dropdown = document.querySelector('#ctl00_PlaceRight_FCDesktop_Field_66');
	var optionToClick = dropdown.options[1];
	optionToClick.selected = true;
	simulateClick(optionToClick);

	window.setTimeout(enterAlbumNum, 5000);

	function enterAlbumNum() {
		if (
			document.contains(
				document.querySelector('#ctl00_PlaceRight_FCDesktop_Field_82')
			)
		) {
			var albumNumInput = document.querySelector(
				'#ctl00_PlaceRight_FCDesktop_Field_82'
			);
			albumNumInput.value = ALBUM_NUM;
			albumNumInput.form.submit();
		}
	}
}

simulateActions();
