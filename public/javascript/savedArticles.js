/*global $*/
$('.media-body .saveButton').each(function(index, button) {
  console.log('save check');
  console.log($(button).data('saved'));
  if ($(button).data('saved') === true) {
    console.log('already saved');
    $(button).text('Saved!');
  }
});

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
  console.log(clicked.data('id'));

  $.ajax({
    method: 'GET',
    url: '/comment/' + clicked.data('id')
  }).then(function(data) {
    console.log(data);
    $('#modalArticleId').attr('data-id', data[0]._id);
    $('#modalArticleImage').attr('src', data[0].imageURL);
    $('#modalArticleTitle').text(data[0].title);
    $('#modalArticleSummary').text(data[0].summary);
    $('#modalNotes').modal('show');
  });

});


$('#modalAddComment').click(function() {
  $('#modalAddCommentForm').append('<br><textarea id="modalNewComment" class="form-control">');
  $('#modalAddCommentForm').append('<br><button id="modalSubmitNewComment" class="btn btn-default">Submit</button>');
});

$(document).on('click', '#modalSubmitNewComment', function() {
  var articleId = $('#modalArticleId').attr('data-id');
  var newComment = $('#modalNewComment').val();
  
  $.ajax({
    method: 'POST',
    url: '/comment/add',
    data: {
      articleId: articleId,
      comment: newComment
    }
  }).then(function() {
      $('#modalComments').append('<p>' + newComment + '</p>');
  });
  
  $('#modalAddCommentForm').empty();
});