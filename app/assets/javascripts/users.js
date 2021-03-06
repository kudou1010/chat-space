$(function(){
  var search_user = $("#user-search-result");
  var chat_member = $(".js-add-user");
  function appendUser(user){
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">
                  ${user.name}
                </p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>
                  追加
                </div>
              </div>
              `
    search_user.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="name">${msg}</div>`
    search_user.append(html);
  }

  function  addDeleteUser(userName, userId){
    var html = `
            <div class='chat-group-user clearfix js-chat-member'>
              <input name='group[user_ids][]' type='hidden' value=${userId}>
              <p class='chat-group-user__name'>
                ${userName}
              </p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>
                削除
              </div>
            </div>
            `
    chat_member.append(html)
  }
  
  function searchUser() {
    var input = $("#user-search-field").val();
    var chat_member_id = [];

     $.each($(".js-chat-member"), function(i, val){
       chat_member_id.push($(this).children().attr("value"));
     })

    $.ajax({
      url: "/users",
      type: "GET",
      data: { keyword: input, added_users: chat_member_id },
      dataType: "json",
    })

    .done(function(users) {
      search_user.empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        })
      }
      else{
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })
  }

  $("#user-search-field").on("keyup", function(){
    searchUser();
  })


  $(document).on("click", ".chat-group-user__btn--add", function(){
    var userName = $(this).attr("data-user-name");
    var userId = $(this).attr("data-user-id");
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
  })

  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
    searchUser();
  });

});