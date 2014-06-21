$(function() {
  var initSelectionList = function(elem) {
    $(elem).UISelectList({
      selected: 2,
      callback: function() {
        $("#response").html($(this).text());
      }
    });

    // // Setup selected choice:
    // $('#pickup-location li').each(function(idx, ctx) {
    //   if ($(ctx).hasClass('selected')) {
    //     $("#response").html($(ctx).text());
    //   }
    // });
  }
  initSelectionList('#pickup-location .list');
  initSelectionList('#destination .list');
});
