$(function(){
  function buildHTML(message) {
      var has_image = message.image ? 
                      `<div class="main__messages__message__image">
                         <image src="${message.image}">
                      </div>`
                      : "";
                      
      var html = `<div class="main__messages__message" data-message_id=${message.id} >
                    <div class="main__messages__message__heading">
                      <div class="main__messages__message__heading__name">
                        ${message.name}
                      </div>
                      <div class="main__messages__message__heading__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="main__messages__message__content"></div>
                      <div class="main__messages__message__text">
                        ${message.body}
                      </div>
                      ${has_image}
                    </div>`
    return html;
    }

  $(".new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "JSON",
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildHTML(message);
      $(".main__messages").append(html);
      $(".new_message")[0].reset();
      $('.main').animate({ scrollTop: $('.main')[0].scrollHeight});
      $('.forms__inputForm__btnSend').prop('disabled', false);
    })
    
    .fail(function(){
      alert("error");
    })
  })

  var reloadMessages = function() {
    last_message_id = $(".main__messages__message").last().data("message_id");
    var urls = location.href.split("/");
    var group_id = urls[urls.length - 2];
    $.ajax({
      url: `/groups/${group_id}/api/messages`,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      
      var insertHTML = "";
      $.each(messages, function(i, message){
        insertHTML += buildHTML(message)
      });

      $(".main__messages").append(insertHTML);
      $('.main').animate({ scrollTop: $('.main')[0].scrollHeight});
      console.log("発火");
    })
    .fail(function() {
      console.log('error');
    });
  };

  setInterval(reloadMessages, 7000);
});
