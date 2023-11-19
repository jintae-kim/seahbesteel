/* design UI javascript define */
$(document).ready(function() {
	//fn_setDatePicker(".datePicker");	
	
	//Form to Object
	//{NOTICE_TITLE:"제목", NOTICE_CONTENT:"내용"}
	$.fn.serializeObject = function() {
		  "use strict"
		  var result = {}
		  var extend = function(i, element) {
		    var node = result[element.name]
		    if ("undefined" !== typeof node && node !== null) {
		      if ($.isArray(node)) {
		        node.push(element.value)
		      } else {
		        result[element.name] = [node, element.value]
		      }
		    } else {
		      result[element.name] = element.value
		    }
		  }

		  $.each(this.serializeArray(), extend)
		  return result
	};
	
    //Aside menu
    $('.menu-open').on("click", function() {
        $('#aside').addClass('open');
        
        //$('.curtain').fadeIn();
        currentTop = $(window).scrollTop();
        $('#wrap').css({
            'position':'fixed',
            'top':-currentTop,
            'left':0,
            'right':0
        });
    });

   
    $('.menu-close').on("click", function() {
        $('#aside').removeClass('open');
        //$('.curtain').hide();
        $('#wrap').removeAttr('style');
		$(window).scrollTop(currentTop);

    });
    
    //input all checked
    $(".check-all-group .check-all").click(function () {
        $('.check-all-group input[type="checkbox"]').not(this).prop('checked', this.checked);
    });


    //attach file ui control
    var filecounter = 0;
    $('.file-upload .add-file').click(function(){
        filecounter++;
        if(filecounter<10)
        $(this).parent().parent().append('<li><input type="file" name="upFile" class="" /> <button type="button" name="" class="file-del">삭제</button></li>');
        else if (filecounter = 9) {
          alert('첨부파일은 최대 10개, 20 mb까지만 가능합니다.');
        }
    });


    $('.file-upload').on("click", ".file-del", function() {
      //console.log("remove");
      filecounter--;
      $(this).parent().remove();
    });

    //tab click show/hide
    $(".tab-list li a.tab-link").on("click", function(event) {
        event.preventDefault();
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
        var _target = $(this).attr("href").split("#")[1];
        $(".tab-contents").removeClass('show').addClass('hide');
        $(".tab-contents[id=" + _target + "]").addClass('show').removeClass('hide');

    });

    //layer popup open
    $(".layer-open").on("click", function(event) {
        event.preventDefault();
        $('body').addClass('fixed');
        $('.curtain').show();
        var _target = $(this).attr("href").split("#")[1];
        $(".popup-layer[id=" + _target + "]").fadeIn('fast');
    });

    //layer popup close
    $('.popup-layer .popup-header .close').click(function(event) {
        event.preventDefault();
        $('body').removeClass('fixed');
        $(this).parent().parent().hide();
        $('.curtain').hide();
        
        //android popup control     
	    //control.removeClass("popup-content-active");
		isPopUp(''); //android popup check
		
        
        $('.popup-layer form').each(function(){
            this.reset();
        });
    });

    $('.popup-foot-buttons .close').click(function(event) {
        event.preventDefault();
        $('body').removeClass('fixed');
        $(this).parent().parent().parent().parent().hide();
        $('.curtain').hide();
        $('.popup-layer form').each(function(){
            this.reset();
        });
    });


    //table touch bg
    $('.table-list1 tbody tr td').click(function() {
        $(this).parent().addClass('select');
        $(this).parent().siblings().removeClass('select');
    });


    //Top to Page
    $(window).scroll(function() {
        if ($(window).scrollTop() > 200) {
            $('#top-to-page').fadeIn();
        } else {
            $('#top-to-page').fadeOut();
        }
    });


    $('#top-to-page').click(function() {
        $('html, body').animate({scrollTop : 0}, 400);
        return false;
    });

    
    //aside menu 메인메뉴 하위메뉴 더보기
    $('.aside-wrap .link-list > li.link-child > a').on("click", function(event) {
      event.preventDefault();
      $(this).toggleClass('spin');
      $(this).next('ul').toggle();
    });
    
    //all page enter 방지
	//$(document).keypress(function(e) {
    //    if (e.keyCode == 13)
    //        e.preventDefault();
	//});

    //page history back
    //$('.page-back').click(function(event) {
    //    event.preventDefault;
    //    parent.history.back();
    //    return false;
    //});
});

