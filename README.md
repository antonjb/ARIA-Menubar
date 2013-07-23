ARIA Menubar
============

jQuery plug-in that creates a menubar with ARIA properties. There are three types of menubar available; Menu (default), Radio and Checkbox.

Basic Example
-------------

```html
<div class="menubar">
  <a href="#" class="btn">Foo</a>
  <a href="#" class="btn">Bar</a>
  <a href="#" class="btn">Baz</a>
</div>
```

```javascript
$("selector").menubar();

// Events
$(".menubar").on('click', function(event){
  console.log(event);
});
```

Menu Types
----------

There are three types of menus available. Default is a menu and requires no 
extra properties. To use Radio or Checkbox add the following data attribute:

```
data-menu-type="radio"
data-menu-type="checkbox"
```

### Type Example:

```html
<div class="menubar" data-menu-type="radio">
  <a href="#" class="btn">Foo</a>
  <a href="#" class="btn">Bar</a>
  <a href="#" class="btn">Baz</a>
</div>
```

### Required element

If you would like the Radio menu to be optional add the following data attribute:

```
data-menu-required="false"
```

### Example:

```html
<div class="menubar" data-menu="radio" data-menu-required="false">
  <a href="#" class="btn">Foo</a>
  <a href="#" class="btn">Bar</a>
  <a href="#" class="btn">Bar</a>
</div>
```

### Default element

Setting a default item is done using the class set in the `menu-selected` option. Only the first instance will be selected on a Radio menu and none on the default menu.

### Example:
```html
<div class="menubar" data-menu-type="checkbox">
  <a href="#" class="btn"><strong>B</strong></a>
  <a href="#" class="btn menu-selected"><u>U</u></a>
  <a href="#" class="btn menu-selected"><i>I</i></a>
</div>
```

Options
-------
* `menu-selected` (String). Default: menu-selected - Sets the class selector for default elements.

License
-------
MIT
