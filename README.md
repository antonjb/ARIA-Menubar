ARIA Menubar
============

jQuery plugin that will create a menubar. There are three different types of menu; Menu (default), Radio and Checkbox.

Usage
-----

```javascript
$("selector").menubar();

// Events
$(".menubar").on("select", function(event){
  console.log(event);
});
```

Menu Types
----------

There are three types of menus available. Default is a menu and requires no 
extra properties. To use Radio or Checkbox add the following property:

```
  data-menu="radio"
  data-menu="checkbox"
```

### Example:

```html
<div class="menubar" data-menu="radio">
  <a href="#" class="btn">One</a>
  <a href="#" class="btn">Two</a>
  <a href="#" class="btn">Three</a>
</div>
```

### Required element

If you would like the Radio menu to be optional add the following property:

```
  data-menurequired="false"
```

### Example:

```html
  <div class="menubar" data-menu="radio" data-menurequired="false">
    <a href="#" class="btn">Yes</a>
    <a href="#" class="btn">Maybe</a>
    <a href="#" class="btn">No</a>
  </div>
```

### Default element

Setting a default item is done using the `defaultClass` option.

### Example:
```html
  <div class="menubar" data-menu="radio">
    <a href="#" class="btn">Left</a>
    <a href="#" class="btn">Center</a>
    <a href="#" class="btn menuDefault">Right</a>
    <a href="#" class="btn">Justified</a>
  </div>
```

Options
-------
* `defaultClass` (String). Default: menuDefault - Sets the class selector for default elements.

License
-------
MIT
