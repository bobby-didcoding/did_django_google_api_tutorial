function DirectionsToggle(){
  var el = $('#dir-toggle');
  var dir_table = $('#dir-table')
  if (dir_table.attr("hidden") == "hidden") {
    dir_table.fadeIn()
    dir_table.removeAttr("hidden")
    el.html('hide <a href="javascript:void(0)" onclick="DirectionsToggle()">here')
  } else {
    dir_table.fadeOut()
    dir_table.attr("hidden", "hidden")
    el.html('click <a href="javascript:void(0)" onclick="DirectionsToggle()">here')
  }
}


function ShowAlert(title, message, type, redirect){
    
    if (redirect){
      toastr[type](message, title, {
          positionClass: 'toast-bottom-right',
          closeButton: true,
          progressBar: true,
          newestOnTop: true,
          rtl: $("body").attr("dir") === "rtl" || $("html").attr("dir") === "rtl",
          timeOut: 7500,
          onHidden: function () {
            window.location.assign(redirect);
          }
      });
    }
    else{
      toastr[type](message, title, {
          positionClass: 'toast-bottom-right',
          closeButton: true,
          progressBar: true,
          newestOnTop: true,
          rtl: $("body").attr("dir") === "rtl" || $("html").attr("dir") === "rtl",
          timeOut: 7500,

      });

    }
   
};

function showPword() {
  var x = document.getElementsByClassName("password");
  for (let i = 0; i < x.length; i++){
      if (x[i].type === "password") {
        x[i].type = "text";
      } else {
        x[i].type = "password";
      }
  }
}

var temp_button_text;

function CustomFormSubmitPost(e){
    var el = $(e);
    temp_button_text = el.text()
    el.attr('disabled', 'disabled').text("").append('<class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>Loading...');
};

function CustomFormSubmitResponse(e){
    var el = $(e);
    el.removeAttr('disabled').text(temp_button_text);
};



"use strict";
var FormControls = function () {

    var usersignup = function () {

        var form = $('#signupform')
        form.submit(function(event){
            event.preventDefault();
            CustomFormSubmitPost($('#signupform button[type=submit]'));

            grecaptcha.ready(function() {
              grecaptcha.execute(recaptcha_site_key, {action: "/"}).then(function(token) {

                document.getElementById('id_token').value = token;
            
                var formdata = form.serialize() 
                $.ajax({
                    url: form.attr("action"),
                    method: form.attr("method"),
                    data: formdata,
                    success: function(json){
                        CustomFormSubmitResponse($('#signupform button[type=submit]'));
                        if (json["result"] == "Success"){
                          var redirect = "/"
                        }
                        else{
                          var redirect = false
                        }
                        ShowAlert(json["result"], json["message"], json["result"].toLowerCase(), redirect);
                    },
                    error: function(xhr){
                        CustomFormSubmitResponse($('#signupform button[type=submit]'));
                        ShowAlert("Error", "There was an error, please try again", "error", false);
                        console.log(xhr.status + ": " + xhr.responseText);
                    }
                }) 
            })
            })

        })    
    };

    var usersignin = function (){
        var form = $('#signinform')
        form.submit(function(event){
            event.preventDefault();
            CustomFormSubmitPost($('#signinform button[type=submit]'));
            
            var formdata = form.serialize() 
            $.ajax({
                url: form.attr("action"),
                method: form.attr("method"),
                data: formdata,
                success: function(json){
                    CustomFormSubmitResponse($('#signinform button[type=submit]'));
                    if (json["result"] == "Success"){
                      var redirect = "/"
                    }
                    else{
                      var redirect = false
                    }
                    ShowAlert(json["result"], json["message"], json["result"].toLowerCase(), redirect);
                },
                error: function(xhr){
                    CustomFormSubmitResponse($('#signinform button[type=submit]'));
                    ShowAlert("Error", "There was an error, please try again", "error", false);
                    console.log(xhr.status + ": " + xhr.responseText);
                }
            }) 
        });
    };

    var userprofile = function () {

        var form = $('#profileform')
        form.submit(function(event){
            event.preventDefault();
            CustomFormSubmitPost($('#profileform button[type=submit]'));
            
            var formdata = form.serialize()
            $.ajax({
                url: form.attr("action"),
                method: form.attr("method"),
                data: formdata,
                success: function(json){
                    CustomFormSubmitResponse($('#profileform button[type=submit]'));
                    if (json["result"] == "Success"){
                      var redirect = "/"
                    }
                    else{
                      var redirect = false
                    }
                    ShowAlert(json["result"], json["message"], json["result"].toLowerCase(), redirect);
                },
                error: function(xhr){
                    CustomFormSubmitResponse($('#profileform button[type=submit]'));
                    ShowAlert("Error", "There was an error, please try again", "error", false);
                    console.log(xhr.status + ": " + xhr.responseText);
                }
            }) 

        })    
    };

    return {
        init: function() { 
            usersignup();
            usersignin(); 
            userprofile();
        }
    };
}();

jQuery(document).ready(function() {     
    FormControls.init();
});

$(function() {
    // This function gets cookie with a given name
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    function sameOrigin(url) {
        // test that a given url is a same-origin URL
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                // Send the token to same-origin, relative URLs only.
                // Send the token only if the method warrants CSRF protection
                // Using the CSRFToken value acquired earlier
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
})

