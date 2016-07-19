$(document).ready(function(){
      $('.slider').slider();
    });

$("#home").click(function(){
  setTimeout(function(){
    $('.slider').slider();
  },10)
});

$(document).ready(function(){
    $('.modal-trigger').leanModal();
  });


$("#work").click(function(){
  setTimeout(function(){
    $('.carousel').carousel();
    $('.materialboxed').materialbox();
  },7000)
});


 $(document).ready(function(){
    setTimeout(function(){
      $('.carousel').carousel()
    },7000)
  });

 $(".enlarge").click(function(){
  $(this).width(1000)
 })
