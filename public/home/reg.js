$('.name').on("change keyup paste", function(){
    if($(this).val()){
      $('.icon-user').addClass("next");
    } else {
      $('.icon-user').removeClass("next");
    }
});

$('.next-button.name').click(function(){
    console.log("Something");
    $('.name-section').addClass("fold-up");
    $('.email-section').removeClass("folded");
});

$('.email').on("change keyup paste", function(){
    if($(this).val()){
      $('.icon-paper-plane').addClass("next");
    } else {
      $('.icon-paper-plane').removeClass("next");
    }
});

$('.next-button.email').click(function(){
    console.log("Something");
    $('.email-section').addClass("fold-up");
    $('.password-section').removeClass("folded");
});

$('.password').on("change keyup paste", function(){
    if($(this).val()){
      $('.icon-lock').addClass("next");
    } else {
      $('.icon-lock').removeClass("next");
    }
});

$('.next-button.password').click(function(){
    console.log("Something");
    $('.password-section').addClass("fold-up");
    $('.repeat-password-section').removeClass("folded");
});

$('.repeat-password').on("change keyup paste", function(){
    if($(this).val()){
      $('.icon-repeat-lock').addClass("next");
    } else {
      $('.icon-repeat-lock').removeClass("next");
    }
});

$('.next-button.repeat-password').click(function(){
    console.log("Something");
    $('.repeat-password-section').addClass("fold-up");
    $('.phone-section').removeClass("folded");
});

$('.phone').on("change keyup paste", function(){
    if($(this).val()){
      $('.icon-phone').addClass("next");
    } else {
      $('.icon-phone').removeClass("next");
    }
});

$('.next-button.phone').click(function(){
    console.log("Something");
    $('.phone-section').addClass("fold-up");
    $('.success').css("marginTop", 0);
});

