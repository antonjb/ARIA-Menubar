/**
 * Menubar with support for ARIA properties 
 * Requires jQuery 1.7
 * @author Anton Ball
 */
(function($){

      // Types of menus
  var RADIO = "radio",
      CHECK = "checkbox",
      MENU = "menu",
      // For minification
      dataMenuRequired = "data-menurequired",
      ariaPressed = "aria-pressed",
      // Default Options
      defaults = {
        defaultClass: "menuDefault"
      };

  $.fn.menubar = function(options) {
    options = $.extend({}, defaults, options);
    return this.each(function(){
      var $this = $(this),
          $btns = $('.btn', $this),
          menuType = $this.attr("data-menu") || MENU,
          check = menuType === CHECK,
          radio = menuType === RADIO,
          required = ($this.attr(dataMenuRequired))?$this.attr(dataMenuRequired) === "true":radio;

      $this.attr({
        role: "menubar",
        "aria-multiselectable": menuType === CHECK
      });

      if (radio || check) {
        $btns.attr(ariaPressed, false);

        // Select the default button (if supplied), only accept one for radio
        if (radio)
          $("." + options.defaultClass, $this).eq(0).attr(ariaPressed, true);
        else
          $("." + options.defaultClass, $this).attr(ariaPressed, true);
      }

      $btns.on("keydown", function(event){
        var index = $(this, $this).index(),
            length = $btns.length;

        if (event.which === 39/*right*/)
          index = ((index += 1) < length)?index:0;
        else if (event.which === 37/*left*/)
          index = ((index -= 1) >= 0)?index:length-1;
        else
          return;

        $btns.eq(index).focus();
      });

      // Event handler for the buttons
      $btns.on("click", function(event){
        event.preventDefault();

        var $target = $(event.currentTarget),
            selected = !($target.attr(ariaPressed) === "false"),
            eventData = {};

        if ($target.attr("aria-disabled") === "true") return;

        if (radio) {
          if (required && selected) return;
          $('[aria-pressed="true"]', $this).attr(ariaPressed, false);
          $target.attr(ariaPressed, !selected);
        } else if (check) {
          $target.attr(ariaPressed, !selected);  
          $.extend(eventData, {selected: !selected});
        }

        $target.trigger($.Event("select", eventData));

      });

    });
  };

})(jQuery);
