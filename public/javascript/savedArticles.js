/*global $*/
$('.media-body .saveButton').each(function(index, button) {
  if ($(button).data('saved') === true) {
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

  $.ajax({
    method: 'GET',
    url: '/comment/' + clicked.data('id')
  }).then(function(data) {
    $('#modalArticleId').attr('data-id', data[0]._id);
    $('#modalArticleImage').attr('src', data[0].imageURL);
    $('#modalArticleTitle').text(data[0].title);
    $('#modalArticleSummary').text(data[0].summary);
    
    $('#modalComments').empty();
    for (var i = 0; i < data[0].comments.length; i++) {
      $('#modalComments').prepend('<button class="modalDeleteButton btn btn-default" data-commentId=' + data[0].comments[i]._id + '>Delete</button>');
      $('#modalComments').prepend('<button class="modalEditButton btn btn-default" data-commentId=' + data[0].comments[i]._id + '>Edit</button>');
      $('#modalComments').prepend('<p data-commentId=' + data[0].comments[i]._id + '>' + data[0].comments[i].comment + '</p>');
    }

    $('#modalNotes').modal('show');
  });

});


$('#modalAddComment').click(function() {
  if ($('#modalAddCommentForm').children().length) {
    $('#modalAddCommentForm').empty();
  }
  else {
    $('#modalAddCommentForm').append('<br><textarea id="modalNewComment" class="form-control">');
    $('#modalAddCommentForm').append('<br><button id="modalSubmitNewComment" class="btn btn-default">Submit</button>');
  }
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
  }).then(function(data) {
    $('#modalComments').prepend('<button class="modalDeleteButton btn btn-default" data-commentId=' + data.comments.slice(-1)[0] + '>Delete</button>');
    $('#modalComments').prepend('<button class="modalEditButton btn btn-default" data-commentId=' + data.comments.slice(-1)[0] + '>Edit</button>');
    $('#modalComments').prepend('<p data-commentId=' + data.comments.slice(-1)[0] + '>' + newComment + '</p>');
  });

  $('#modalAddCommentForm').empty();
});

$(document).on('click', '.modalDeleteButton', function() {
  var commentId = $(this).attr('data-commentId');
  
  $.ajax({
    method: 'DELETE',
    url: '/comment/delete',
    data: {commentId: commentId}
  }).then(function(){
    $('[data-commentId=' + commentId + ']').remove();
  });
});