jQuery.fn.onSafe = function(eventType, selector, ignore, fn) {
  var $el = this;
  $el.on(eventType, selector, function(event) {
    var $ignore = $el.find(ignore);
    if ($ignore.find(event.target).length) {
      // Leave this event alone
      return;
    }
    return fn(event);
  });
};
