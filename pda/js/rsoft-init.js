$(function(){
	fn_setDatePicker(".datePicker");		    
	
	//사용자, 관리자 공통 Navigation
	$('.aside-menu .nav-list > li > a .menu').on('click', function() {
	  $(this).parent().next().stop().slideToggle('fast');
	  $(this).parent().toggleClass('active');
	  $(this).parent().parent().siblings().find('a').removeClass('active');
	  $(this).parent().parent().siblings().find('.nav-child').hide();
	});
	
	//관리자
	$('.aside-menu .nav-title').on('click', function() {
	  $(this).toggleClass('open');
	  $(this).next().toggleClass('open');
	})
	
	//사용자
	$('.btn-menu').on('click', function(event) {
	  event.preventDefault();
	  $('.aside-menu').toggleClass('open');
	  $('body').toggleClass('aside-fold');
	  
	   if ($('.aside-menu').hasClass("open")) {
           setCookie("aside_menu", "Y", 86400 * 30);
	   }else{
           setCookie("aside_menu", "N", 86400 * 30);
	   }
	  
	});
	
	//사용자
	$('.aside-menu li').on('mouseover', function() {
	  $(this).addClass('open');
	});
	$('.aside-menu li').on('mouseout', function() {
	      $(this).removeClass('open');
	});
	
	
  	//TOP 버튼
	$('#topBtn').hide();
	$(window).scroll(function() {
		if ($(this).scrollTop() > 50) {
			$('#topBtn').fadeIn();
		} else {
			$('#topBtn').fadeOut();
		}
	});
	
	$("#topBtn").click(function() {
		$('html, body').animate({
			scrollTop : 0
		}, 100);
		return false;
	});
	
	
	////메뉴를 클릭할시 쿠키에 메뉴상태 저장(펼친지,닫은지)
	//이전 작업에서 사이드메뉴를 펼친 상태라면 펼친상태 유지
	var sidebar = getCookie("sideBar");

	if(sidebar == "open") {
	    $('.aside-menu').addClass('open');
	    $('.aside-menu').addClass('first');
	    $('body').removeClass('aside-fold');
    }
	
	
	//이전 작업에서 사이드메뉴를 펼친 상태라면 펼친상태 유지
	var sidebar = getCookie("sideBar");

	if(sidebar == "open") {
	    $('.aside-menu').addClass('open');
	    $('.aside-menu').addClass('first');
	    $('body').removeClass('aside-fold');
    }
	
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
	

	//enter
	$(".enter").on("keypress", function(e){
		if(e.keyCode == 13){
			e.preventDefault();		
			if($(this).parents(".searchTable").length > 0) {			
				$("#btn_search").trigger("click");
			}
			else {
				if($(this).siblings(".btn-search").length > 0) {
					$(this).siblings(".btn-search").trigger("click");
				}
				else {
					fn_enter(this);//customize
				}
			}
		}
	});
	
	$(".contents-wrap").find("th.em").prepend("<em>* </em>");
	$(".modal-body").find("th.em").prepend("<em>* </em>");
	
	$(document).bind('keydown', function(event) {
	    
		if( event.which === 112 && event.ctrlKey ) {
	       $("#debugModal").modal("show");
	    }
	});
});

