# jquery.onSafe

Run an event handler, optionally with a [delegation selector](http://api.jquery.com/on/#direct-and-delegated-events), but ignore matches nested within a second selector. Helps you cope with nested controls.

<a href="http://apostrophenow.org/"><img src="https://raw.github.com/punkave/jquery-projector/master/logos/logo-box-madefor.png" align="right" /></a>

**Problem**: I want an event handler to fire on all `.content-menu`s inside a given `.area`, but only if they are not nested inside *another* `.area` within the original one.

```html
<div class="area outer">
  <div class="content-menu"></div>
  <div class="content-menu"></div>
  <div class="content-menu"></div>
  <div class="content-menu"></div>
  <div class="area">
    <div class="content-menu"></div>
  </div>
</div>
```

Running `$('.area.outer').on('click', '.content-menu', function(...))` on the above markup will receive events for all five instances of `content-menu`, including the one nested in a second `area`.

If we try to solve this by using `:not` in a naive way, it will reject everything, because the original div also has the class `area`.

### Solution: `$.onSafe('click', selector, ignore)`

`$.onSafe` wraps the `$.on` function but ignores any deeper matches of a second selector, allowing those events to continue on their way unimpeded. Using the example above:

```javascript
$('area.outer').onSafe('click', '.content-menu', '.area', function() {
  // fires only for the first four content-menus, not the one
  // in a nested area
});
```

`$.onSafe` works with arbitrarily nested elements.

### Event handlers without delegation

`$.onSafe` also works with only three arguments when the event is bubbling up to the element itself:

```javascript
$('area.outer').onSafe('click', '.area', function() {
  // fires only for the first four content-menus, not the one
  // in a nested area
});
```

### More about bubbling

This plugin will ignore an event that began nested inside the `ignore` selector, *even if the event bubbles up above that level.* Our belief is that this most effectively "firewalls" different nested levels and is closest to the intent of the average programmer trying to make effective use of it.

## Changelog

0.1.2: value of `this` is correct. More unit test coverage.

0.1.1: three-argument version without a delegation selector.

0.1.0: introduced. Derived from our [jquery-find-safe](http://github.com/punkave/jquery-find-safe)  plugin.

## About P'unk Avenue and Apostrophe

`jquery-on-safe` was created at [P'unk Avenue](http://punkave.com) for use in Apostrophe, an open-source content management system built on node.js. If you like `jquery-on-safe` you should definitely [check out apostrophenow.org](http://apostrophenow.org). Also be sure to visit us on [github](http://github.com/punkave).

## Support

Feel free to open issues on [github](http://github.com/punkave/jquery-on-safe).


<a href="http://punkave.com/"><img src="https://raw.github.com/punkave/jquery-on-safe/master/logos/logo-box-builtby.png" /></a>
