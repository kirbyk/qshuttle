$(function() {
  var initSelectionList = function(elem, list) {
    $(elem).UISelectList({
      selected: 2,
      callback: function() {
        $(list).html($(this).text());
        console.log($(this).text());
      }
    });
  }

  initSelectionList('#pickup-location .list', '#pickup-list-item');
  initSelectionList('#destination .list', '#destination-list-item');
});
