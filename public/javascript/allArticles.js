/*global $*/
$('.media-body button').each(function(index, button){
  console.log('save check');
  console.log($(button).data('saved'));
  if ($(button).data('saved') === true) {
    console.log('already saved');
    $(button).text('Saved!');
  }
});

$(document).on('click', '[data-saved="false"]', function() {
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

$(document).on('click', '[data-saved="true"]', function() {
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