document.querySelectorAll('ol.firstLevelOl').forEach(function(element, index) {
  $(element).css('counter-increment', 'my-counter '+ index );
});