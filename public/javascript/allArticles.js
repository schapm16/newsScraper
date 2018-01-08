/*global $*/
$(document).on('click', '.saveButton', function() {
  var clicked = $(this);
  $.ajax({
    type: 'PUT',
    url: '/article/save',
    data: {
      articleId: clicked.data('id')
    }
  }).then(function() {
    clicked.text('Saved!');
    clicked.removeClass('saveButton');
    clicked.addClass('deleteButton');
  });
});

$(document).on('click', '.deleteButton', function() {
  var clicked = $(this);
  $.ajax({
    type: 'PUT',
    url: '/article/delete',
    data: {
      articleId: clicked.data('id')
    }
  }).then(function() {
    clicked.text('Save');
    clicked.removeClass('deleteButton');
    clicked.addClass('saveButton');
  });
});