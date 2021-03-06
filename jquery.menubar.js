/*
 * Menubar with ARIA
 * Requires jQuery 1.7
 * @version 1.1
 * @author Anton Ball
 * @license
 */
(function($){
	"use strict";

	// Constants

	var MENU_RADIO = 'radio',
		MENU_CHECK = 'checkbox',
		MENU_DEFAULT = 'menu',
		DATA_MENU_TYPE = 'menuType',
		DATA_REQUIRED = 'menuRequired',
		ARIA_PRESSED = 'aria-pressed';

	// Methods

	var keydownHandler = function(event){
		var $el = $(event.target),
			$btns = event.data.$btns,
			index = $btns.index($el),
			key = event.which,
			diff = index + ((key === 39 || key === 40) ? 1 : (key === 37 || key === 38) ? -1 : 0);

		$btns.eq(diff % $btns.length).focus();
	},
	clickHandler = function(event){
		var $target = $(event.currentTarget),
			selected = ($target.attr(ARIA_PRESSED) === 'true'),
			isCheckbox = event.data.isCheckbox,
			isRadio = event.data.isRadio,
			$menu = event.data.$menu,
			required = $menu.data().hasOwnProperty(DATA_REQUIRED) ? $menu.data(DATA_REQUIRED) : isRadio;

		event.preventDefault();
		if ($target.attr('aria-disabled') === 'true'){
			event.stopImmediatePropagation();
			return;
		}
		
		if (isRadio) {
			if (required && selected) {
				event.stopImmediatePropagation();
				return;
			}
			$menu.find('[aria-pressed="true"]').attr(ARIA_PRESSED, false);
			$target.attr(ARIA_PRESSED, !selected);
		} else if (isCheckbox) {
			$target.attr(ARIA_PRESSED, !selected);
		}

		$menu.trigger('click');
	};

	$.fn.menubar = function(options){
		var settings = $.extend({selectedClass: 'menu-selected', buttonClass: 'btn'}, options);

		return this.each(function(){
			var $this = $(this),
				$btns = $this.find('.' + settings.buttonClass),
				isRadio, isCheckbox;

			$this.data(DATA_MENU_TYPE, $this.data(DATA_MENU_TYPE) || MENU_DEFAULT);
			isRadio = $this.data(DATA_MENU_TYPE) === MENU_RADIO;
			isCheckbox = $this.data(DATA_MENU_TYPE) === MENU_CHECK;

			// Set ARIA properties

			$this.attr({
				role: 'menubar',
				'aria-multiselectable': isCheckbox
			});

			if (isRadio || isCheckbox) {
				$btns.attr(ARIA_PRESSED, false);
				// Preselect any buttons. Radios limited to first instance.
				$btns.filter('.' + settings.selectedClass + (isRadio ? ':eq(0)':'')).attr(ARIA_PRESSED, true);
			}

			// Events

			$this.on({'keydown': keydownHandler,
					  'click': clickHandler}, '.btn', {$menu: $this, $btns: $btns, isRadio: isRadio, isCheckbox: isCheckbox});

		});

	};

}(jQuery));