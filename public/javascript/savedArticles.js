/*global $*/
$('.media-body .saveButton').each(function(index, button){
  console.log('save check');
  console.log($(button).data('saved'));
  if ($(button).data('saved') === true) {
    console.log('already saved');
    $(button).text('Saved!');
  }
});

$('#notesModal').modal();

$(document).on('click', '.saveButton[data-saved="false"]', function() {
  var clicked = $(this);
  $.ajax({
    type: 'PUT',
    url: '/article/save',
    data: {
      articleId: clicked.data('id')
    }
  }).then(function() {
    clicked.text('Saved!');
    clicked.attr('data-saved', 'true');
  });
});

$(document).on('click', '.saveButton[data-saved="true"]', function() {
  var clicked = $(this);
  $.ajax({
    type: 'PUT',
    url: '/article/delete',
    data: {
      articleId: clicked.data('id')
    }
  }).then(function() {
    clicked.text('Save');
    clicked.attr('data-saved', 'false');
  });
});

$(document).on('click', '.notesButton', function() {
    var clicked = $(this);
    var articleId = clicked.data('id');
    
    $.ajax({
        type: 'GET',
        
    })
    
});