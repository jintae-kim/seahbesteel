//************주의************************************
//다국어 및 페이지 사용 스크립트 만 정의 하세요.
//시스템 공통 사용 하는 스크립트는 rsoft-web.jsp에 정의 하세요.
//************주의************************************

function alert_save_ok(txt) {
	if(isNull(txt) || txt == "")
		alert(messageJs("저장 되었습니다."));
	else
		alert(messageJs(txt));
}

function alert_delete_ok(txt) {
	if(isNull(txt) || txt == "")
		alert(messageJs("삭제 되었습니다."));
	else
		alert(messageJs(txt));
}

function confirm_delete(txt) {
	var msg;
	if(isNull(txt) || txt == "")
		msg = messageJs("삭제하시겠습니까?");
	else
		msg = messageJs(txt);

	if(confirm(msg)){
		return true;
	}
	
	return false;
}




function fn_print_popup(printUrl) {
    var url = printUrl;
    var name = "printing popup";
    var option = "width = 1024, height = 800, top = 100, left = 200, scrolling = yes"
    window.open(url, name, option);
}

/**
* 팝업 open
* param1:id
* 	modal id
* param2:type
* 	type: string(regi or edit)
*/
function fn_change_combuss(obj) {
	
    var ddl = document.getElementById(obj.id);
    var getSelectionIndex = ddl.selectedIndex;
    document.getElementById(ddl.replace("a_","")).value = ddl.options[getSelectionIndex].value;
}

function fn_change_comfac(obj) {
	
    var ddl = document.getElementById(obj.id);
    var getSelectionIndex = ddl.selectedIndex;
    document.getElementById(ddl.replace("a_","")).value = ddl.options[getSelectionIndex].value;
}

function fn_change_com(obj) {
    var ddl = document.getElementById(obj.id);
    var getSelectionIndex = ddl.selectedIndex;
    document.getElementById(ddl.replace("a_","")).value = ddl.options[getSelectionIndex].value;
}

function delay_hide_loading() {
	setTimeout(function() {
	    if($(".loadingleModal").css("display") == "block"){
	        jQuery('.loadingleModal').css("display", "none");
	        alert('서버 응답이 없습니다.');
	        //alert('Server no response.');
	    }
	}, 20000);
}


function ajax_error(jqXHR) {
	if(jqXHR.status == 403){
		ajax_error_session_timeout();
	}else{
		ajax_error_message(jqXHR);
	}
}


function ajax_error_session_timeout() {
    var url = contextPath + '/login';
	alert("세션이 만료가 되었습니다. 로그인 페이지로 이동합니다.");
	location.href=url;
}

function ajax_error_message(jqXHR) {
    console.log(jqXHR.responseText);
    alert(jqXHR.responseText);
}

function ajax_success_next(resultData, $tableData, url) {
	if(!!resultData && resultData != null) {
		alert(resultData.message);
	    if(resultData.result == "1") {
		    if(url != "" && url != null) {
		    	location.href=url;
		    }else{
		    	$tableData.setData();    	
		    }	
	    }		
	}
	else
	{
		alert('Server No data');
	}
}



/**
* 팝업 close (등록팝업을 닫는 경우 초기화)
* param1:id - modal id
* param2:type - second modal일 경우
*/
function fn_popup_close(id) {

	fn_modal_close(id);
	//fn_popup_reset();
	
	//if( type == 2 ) fn_setForm("second");
	//else fn_setForm("first");
}

function fn_popup_serach_reset(popupId) {
	var id = "#" + popupId;
	var tableId = "#" + popupId + "-table";
	
	//공통 초기화
	var input = $(id + " input").not($("input[type=hidden], input[type=checkbox], .nodelete"));
	var select = $(id + " select").not("#form1 select[name^=shade]");
	var check = $(id + " input[type=checkbox], input[type=radio]");
	var textarea = $(id + " textarea");
	
	input.val("");
	select.val("");
	check.prop("checked",false);
	textarea.val("");
	

	$(tableId).empty()
}


/**
* 유효성체크
* param1:id
* 	button id
*/
function validate(id) {
	
	if(id == "btn_register") {
		var inputs = $("#form1 *:required");		
		
		for(var i=0; i<inputs.length; i++) {
			
			if($(inputs[i]).val() == "") {
				
				alert(inputs[i].dataset.name+"을(를) 입력해주세요.");
				$(inputs[i]).focus();
				return false;
			}
		}
	}
	else if( id == "btn_req_register") {
		var inputs = $("#form1 *:required");	
		
		for(var i=0; i<inputs.length; i++) {
			
			if($(inputs[i]).val() == "") {
				
				alert(inputs[i].dataset.name+"을(를) 입력해주세요.");
				$(inputs[i]).focus();
				return false;
			}
		}
		
		var len = $("input[name=teethLoc]:checked").length;
		if(len == 0) {
			alert("부위를 선택해주세요.");
			return;
		}
	}
	else if( id == "btn_ship_confirm") {
		var inputs = $("#form3 *:required");
		for(var i=0; i<inputs.length; i++) {
			
			if($(inputs[i]).val() == "") {
				alert(inputs[i].dataset.name+"을(를) 입력해주세요.");
				$(inputs[i]).focus();
				return false;
			}
		}
	}
	else if(id == "btn_barcode") {
		var barcode = $("#barcode");
		
		if( barcode.val() == "" ) {
			alert("바코드를 입력해주세요.");
			barcode.focus();
			return false;
		}
	}
	else if(id == "btn_barcode_quick") {
		var barcode = $("#barcode");
		
		if($("#processMasterCd").val() == ""){
			alert("공정을 선택해주세요.");
			$("#processMasterCd").focus();
			$("#barcode").val("");
			return false;
		}
		else if( barcode.val() == "" ) {
			alert("바코드를 입력해주세요.");
			barcode.focus();
			return false;
		}
	}	
	else {
		var inputs = $("*:required");
		
		for(var i=0; i<inputs.length; i++) {			
			if($(inputs[i]).val() == "") {				
				alert(inputs[i].dataset.name+"을(를) 입력해주세요.");
				$(inputs[i]).focus();
				return false;
			}
		}
	}
	
	return true;
}

/**
 * 날짜 선택(오늘, 3일, ... 전체)
 * @param obj
 * @param type
 * 	의뢰일자 undefined
 *  납품일자 2
 */
function fn_select_date(obj, type) {
	var id = obj.id;
	var idx = parseInt(id.substring(id.length-1));

	var from, to;
	if(type == 2) {
		from = $("#search-ymdFrom2");
		to = $("#search-ymdTo2");
	}
	else {
		from = $("#search-ymdFrom");
		to = $("#search-ymdTo");
	}
	var date = new Date();
	var newDate = new Date(date);
	
	switch(idx) {
		case 1: 
			from.val($.datepicker.formatDate("yy-mm-dd", date));
			to.val($.datepicker.formatDate("yy-mm-dd", date));
			break;
		case 2: 
			newDate.setDate(newDate.getDate() - 3);
			from.val($.datepicker.formatDate("yy-mm-dd", new Date(newDate)));
			to.val($.datepicker.formatDate("yy-mm-dd", date));
			break;
		case 3: 
			newDate.setDate(newDate.getDate() - 7);
			from.val($.datepicker.formatDate("yy-mm-dd", new Date(newDate)));
			to.val($.datepicker.formatDate("yy-mm-dd", date));
			break;
		case 4: 
			newDate.setMonth(newDate.getMonth() - 1);
			from.val($.datepicker.formatDate("yy-mm-dd", new Date(newDate)));
			to.val($.datepicker.formatDate("yy-mm-dd", date));
			break;
		case 5: 
			newDate.setMonth(newDate.getMonth() - 3);
			from.val($.datepicker.formatDate("yy-mm-dd", new Date(newDate)));
			to.val($.datepicker.formatDate("yy-mm-dd", date));
			break;
		case 6: 
			from.val($.datepicker.formatDate("yy-mm-dd", new Date("1900-01-01")));
			to.val($.datepicker.formatDate("yy-mm-dd", date));
			break;
			
			
		default:
			break;
	}
}

/**
 * 스크롤 고정
 * @param intY
 * @returns
 */
function fn_setScrollPosition(intY){
	window.scrollTo(0, intY); //opera not working
}
