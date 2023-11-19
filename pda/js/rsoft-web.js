//************주의************************************
//시스템 공통 사용 하는 스크립트만 정의 하세요.
//다국어 및 페이지 사용 스크립트는 rsoft-page.jsp에 정의 하세요.
//************주의************************************

function appRoot() {
    var z = window.location.pathname.split('/');
    return window.location.origin + "/" + z[1] + "/";
}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.href);
	if (results == null)
	    return "";
	else
	    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

//************
//마우스/키보드
//************
var oldgridSelectedColor;
function setMouseOverColor(element) {
    oldgridSelectedColor = element.style.backgroundColor;
    element.style.backgroundColor = '#FFF8DF';
    element.style.cursor = 'hand';
}

function setMouseOutColor(element) {
    element.style.backgroundColor = oldgridSelectedColor;
    element.style.textDecoration = 'none';
}


//*********
//입력양식
//*********
//천단위 콤마 나타내기
function setComma(str) {
    var returnVal = String(str);

    while (returnVal.match(/^(-?\d+)(\d{3})/)) {
        returnVal = returnVal.replace(/^(-?\d+)(\d{3})/, '$1,$2');
    }
    return returnVal;
}

//특정문자 제거 
function filter(str) {
    //re = /^\$|,|-/g;
    re = /^\$|,/g;
    // "$" and "," and "-"입력 제거
    return str.replace(re, "");
}

function removeCarriageReturn(str) {
    return str.replace(/[\r\n]+/gm, " ");
}

function formatNumber(str) {
    number = numOffMask(str.value);

    if (isNaN(number))
        str.value = "";
    else
        str.value = numOnMask(number);
}

function formatNumberMinus(str) {
    number = str.value.replace(/-/g, '');
    //number = numOffMask(str.value);

    if (isNaN(number))
        str.value = "";
    else
        str.value = str.value;
}

function numOffMask(str) {
    var tmp = str.split(",");
    tmp = tmp.join("");

    return tmp;
}


function numOnMask(str) {
    var sign;

    if (str.charAt(0) == "-") {//음수가 들어왔을때 '-'를 빼고적용되게..
        sign = str.substring(0, 1);
        str = str.substring(1, str.length);
    }

    str = str + "";
    var idx = str.indexOf(".");


    if (idx < 0) {
        var txtInt = str;
        var txtFloat = "";
    } else {
        var txtInt = str.substring(0, idx);
        var txtFloat = str.substring(idx);
    }

    if (txtInt.length > 3) {
        var c = 0;
        var myArray = new Array();
        for (var i = txtInt.length; i > 0; i = i - 3) {
            myArray[c++] = txtInt.substring(i - 3, i);
        }
        myArray.reverse();
        txtInt = myArray.join(",");
    }

    if (sign) {
        str = sign + txtInt + txtFloat;
    } else {
        str = txtInt + txtFloat;
    }

    return str;
}

function numOnMask2(str) {
    var sign;

    str = str + "";
    var idx = str.indexOf(".");


    if (idx < 0) {
        var txtInt = str;
        var txtFloat = "";
    } else {
        var txtInt = str.substring(0, idx);
        var txtFloat = str.substring(idx);
    }

    if (txtInt.length > 3) {
        var c = 0;
        var myArray = new Array();
        for (var i = txtInt.length; i > 0; i = i - 3) {
            myArray[c++] = txtInt.substring(i - 3, i);
        }
        myArray.reverse();
        txtInt = myArray.join(",");
    }

    if (sign) {
        str = sign + txtInt + txtFloat;
    } else {
        str = txtInt + txtFloat;
    }

    return str;
}

// val : 대상숫자, pos : 원하는 소수점 이하 자리수
function exRound(val, pos) {
    var rtn;
    /* 2023.01.04  YSG 주석.
    rtn = Math.round(val * Math.pow(10, Math.abs(pos) - 1))
    rtn = rtn / Math.pow(10, Math.abs(pos) - 1)
    */
    
    var decPos = Math.pow( 10.0, pos );
    var rtn = ( Math.round( val * decPos ) ) / decPos ;
    return rtn;
}
// 0표시
function exRoundW0(val, pos) {
    var rtn;
    var decPos = Math.pow( 10.0, pos );
    var rtn = ( Math.round( val * decPos ) ) / decPos ;
    return rtn.toFixed(pos);
}

//문자만 
function isCharsOnly(input, chars) {
    for (var inx = 0; inx < input.value.length; inx++) {
        if (chars.indexOf(input.value.charAt(inx)) == -1)
            return false;
    }
    return true;
}

function unitPrice_NumberKeyCheck(Event) {

    var key = Event.keyCode;
    /* 0 ~ 9 : 48 ~ 57, 키패드 0 ~ 9 : 96 ~ 105 ,8 : backspace, 46 : delete, 9 : tab*/
    if ((key > 95 && key < 106) || (key > 47 && key < 58) || key == 46 || key == 8 || key == 9 || key == 16 || key == 17 || key == 18 || key == 37 || key == 39 || key == 144) {
        return true;
    } else {
        return false;
    }
}



//0입력후 Tab
function inputZero(id1, id2) {
    if (event.keyCode == 13) {
        var p1 = document.getElementById(id1).value;
        if (p1 == "") {
            document.getElementById(id1).value = 0;
        }

        document.getElementById(id2).focus();
        return false;
    }
}

//Enter시 Tab
function inputTab(id1, id2) {
    if (event.keyCode == 13) {
        document.getElementById(id2).focus();
        return false;
    }
}

//Submit 방지
function preventSubmitOnEnter(event) {
    if (event.keyCode == 13) {
        self.focus();
        return false;
    }
}

//키입력방지
function disableInput(event) {
    return false;
}

//Backspace 방지
function disableBackspace(e) {
    var evt = e || window.event;
    if (evt) {
        var keyCode = evt.charCode || evt.keyCode;
        if (keyCode === 8) {
            if (evt.preventDefault) {
                evt.preventDefault();
            } else {
                evt.returnValue = false;
            }
        }
    }
}

//readonly 해제
function setWriteAble(cid) {
    document.getElementById(cid).readOnly = '';
}

//select value 설정
function setSelectValue(obj, val) {
    for (var i = 0; i < obj.length; i++) {
        if (obj.options[i].value == val) {
            obj.selectedIndex = i;
            break;
        }
    }
}

//checkbox value 설정
function setCheckBoxValue(form, idname, val) {
    for (var i = 0; i < form.elements.length; i++) {
        var ele = form.elements[i];
        if (ele.name == idname) {
            if (ele.value == val) {
                ele.checked = true;
            }
        }
    }

}

//radiobutton value 설정
function setRadioButtonValue(form, idname, val) {
    for (var i = 0; i < form.elements.length; i++) {
        var ele = form.elements[i];
        if (ele.name == idname) {
            if (ele.value == val) {
                ele.checked = true;
            } else {
                ele.checked = false;
            }
        }
    }
}

// 체크박스 선택후 자료 삭제시
// IN 쿼리문에 사용될 문자열을 반환한다
// 예) return '1','3','5'
function getInQueryString(obj) {
    var rVal = "";
    if (obj.length > 1) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].checked == true)
                rVal += "'" + obj[i].value + "',";
        }
        rVal = rVal.substring(0, rVal.lastIndexOf(','));
    } else {
        rVal = obj.value;
    }
    return rVal;
}

//*********
//Validation
//*********

//Submit 방지
function preventSubmitOnEnter(e) {
    var key;
    if (window.event)
        key = window.event.keyCode; //IE
    else
        key = e.which; //firefox   

    if (key == 13)
        return false;
    else
        return true;
}

function disableEnterKey(e) {
    var key;
    if (window.event)
        key = window.event.keyCode; //IE
    else
        key = e.which; //firefox   

    if (key == 13)
        return false;
    else
        return true;
}

//유효성체크
function validate() {
	
	var inputs = $("*:required");
	
	for(var i=0; i<inputs.length; i++) {			
		if($(inputs[i]).val() == "") {				
			alert(inputs[i].dataset.name+"을(를) 입력해주세요.");
			$(inputs[i]).focus();
			return false;
		}
	}

	return true;
}


//input max length check
$('input[type=number][maxlength]').on('input', function(ev) {
    var $this = $(this);
    var maxlength = $this.attr('maxlength');
    var value = $this.val();
    if (value && value.length >= maxlength) {
        $this.val(value.substr(0, maxlength));
    }
});


//maxlength 체크
//oninput="maxLengthCheck(this);"
function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
        object.value = object.value.slice(0, object.maxLength);
    }    
}

//************
//UI
//************

//Double Clcik 방지
function disableButton(btn) {
  btn.disabled = true;
  setTimeout(function () { btn.disabled = false; }, 1500);
}

//날짜

Date.prototype.YYYYMMDDHHMMSS = function () {
  var yyyy = this.getFullYear().toString();
  var MM = pad(this.getMonth() + 1,2);
  var dd = pad(this.getDate(), 2);
  var hh = pad(this.getHours(), 2);
  var mm = pad(this.getMinutes(), 2)
  var ss = pad(this.getSeconds(), 2)

  return yyyy +  MM + dd+  hh + mm + ss;
};

Date.prototype.YYMMDD_Dash = function () {
  var yy = this.getFullYear().toString().substring(2, 4);
  var MM = pad(this.getMonth() + 1,2);
  var dd = pad(this.getDate(), 2);

  return yy + "-" + MM + "-" + dd;
};

Date.prototype.YYYYMMDDHHMM = function () {
	  var yyyy = this.getFullYear().toString();
	  var MM = pad(this.getMonth() + 1,2);
	  var dd = pad(this.getDate(), 2);
	  var hh = pad(this.getHours(), 2);
	  var mm = pad(this.getMinutes(), 2)

	  return yyyy +  MM + dd+  hh + mm;
};

function pad(number, length) {
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

/**
 * 
 * @param data 20220101 or 202201
 * @returns
 */
function fn_date_nodashToDash(data) {
	var yy = data.substring(0,4);
	var mm = data.substring(4,6);
	if(data.length == 8) {
		var dd  = data.substring(6,8);
		var date = yy + "-" + mm + "-" + dd;
		return $.datepicker.formatDate("yy-mm-dd", new Date(date));
	}
	else if(data.length == 6) {
		var date = yy + "-" + mm;
		return $.datepicker.formatDate("yy-mm", new Date(date));
	}
	else return data;
}

/**
 * 
 * @param data 2022-01-01 or 2022-01
 * @returns
 */
function fn_date_dashToNodash(data) {
	var yy = data.substring(0,4);
	var mm = data.substring(5,7);
	var dd = '';
	if(data.length == 10) dd  = data.substring(8,10);
	var date = yy + mm + dd;
	
	return date;
}

function fn_setDatePicker(id) {
	  $.fn.datepicker.dates['ko'] = {
		days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
		daysShort: ["일", "월", "화", "수", "목", "금", "토"],
		daysMin: ["일", "월", "화", "수", "목", "금", "토"],
		months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		monthsShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		today: "오늘",
		clear: "삭제",
		format: "yyyy-mm-dd",
		titleFormat: "yyyy년mm월",
		weekStart: 0
	  };
	  
	  $.fn.datepicker.dates['zh'] = {
		days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
		daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
		daysMin: ["日", "一", "二", "三", "四", "五", "六"],
		months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		today: "今天",
		monthsTitle: "选择月份",
		clear: "清除",
		format: "yyyy-mm-dd",
		titleFormat: "yyyy年mm月",
		weekStart: 1
	  };
	  
	  $.fn.datepicker.dates['ja'] = {
		days: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"],
		daysShort: ["日", "月", "火", "水", "木", "金", "土"],
		daysMin: ["日", "月", "火", "水", "木", "金", "土"],
		months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		today: "今日",
		format: "yyyy/mm/dd",
		titleFormat: "yyyy年mm月",
		clear: "クリア"
	  };
	  
	  $(id).datepicker({
		    language : lang,
		    format: "yyyy-mm-dd",	//데이터 포맷 형식(yyyy : 년 mm : 월 dd : 일 )
		    //startDate: '-10d',	//달력에서 선택 할 수 있는 가장 빠른 날짜. 이전으로는 선택 불가능 ( d : 일 m : 달 y : 년 w : 주)
		    //endDate: '+10d',	//달력에서 선택 할 수 있는 가장 느린 날짜. 이후로 선택 불가 ( d : 일 m : 달 y : 년 w : 주)
		    autoclose : true,	//사용자가 날짜를 클릭하면 자동 캘린더가 닫히는 옵션
		    calendarWeeks : false, //캘린더 옆에 몇 주차인지 보여주는 옵션 기본값 false 보여주려면 true
		    clearBtn : false, //날짜 선택한 값 초기화 해주는 버튼 보여주는 옵션 기본값 false 보여주려면 true
		    //datesDisabled : ['2019-06-24','2019-06-26'],//선택 불가능한 일 설정 하는 배열 위에 있는 format 과 형식이 같아야함.
		    //daysOfWeekDisabled : [0,6],	//선택 불가능한 요일 설정 0 : 일요일 ~ 6 : 토요일
		    //daysOfWeekHighlighted : [3], //강조 되어야 하는 요일 설정
		    disableTouchKeyboard : false,	//모바일에서 플러그인 작동 여부 기본값 false 가 작동 true가 작동 안함.
		    immediateUpdates: false,	//사용자가 보는 화면으로 바로바로 날짜를 변경할지 여부 기본값 :false 
		    multidate : false, //여러 날짜 선택할 수 있게 하는 옵션 기본값 :false 
		    multidateSeparator :",", //여러 날짜를 선택했을 때 사이에 나타나는 글짜 2019-05-01,2019-06-01
		    templates : {
		        leftArrow: '<i class="ri-arrow-left-s-line"></i>',
		        rightArrow: '<i class="ri-arrow-right-s-line"></i>'
		    }, //다음달 이전달로 넘어가는 화살표 모양 커스텀 마이징 
		    showWeekDays : true ,// 위에 요일 보여주는 옵션 기본값 : true
		    //title: "Caledar",	//캘린더 상단에 보여주는 타이틀
		    todayHighlight : true ,	//오늘 날짜에 하이라이팅 기능 기본값 :false 
		    //toggleActive : true,	//이미 선택된 날짜 선택하면 기본값 : false인경우 그대로 유지 true인 경우 날짜 삭제
		    weekStart : 0 ,//달력 시작 요일 선택하는 것 기본값은 0인 일요일 		    
 	});
}

function chkInputValue(id, msg){
	if ( $.trim($(id).val()) == "") {
		alert(msg+"을(를) 입력해주세요.");
		$(id).focus();
		return false;
	}
	return true;
}

function fn_moveToURL(url, msg){
	if (msg) {
		if (!confirm( msg + " 하시겠습니까??")) return;
	}
	location.href=url;
}

function fn_moveToURLbyForm(formid, url, msg){
	if (msg) {
		if (!confirm( msg + " 하시겠습니까??")) return;
	}
	var form = document.getElementById(formid);
	form.action=url;
	form.submit();
}

function html2Text(str) {
  str = str.replace(/&nbsp;/gi, " ");
  return str.replace(/<br>/gi, "\n");
}

function text2Html(str) {
  str = str.replace(/ /g, "&nbsp;");
  return str.replace(/\n/g, "<br>");
} 

function fn_html_entities_decode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

/**
* 문자열이 빈 문자열인지 체크하여 결과값을 리턴한다.
* @param str       : 체크할 문자열
*/
function isEmpty(str){
	 
	if(typeof str == "undefined" || str == null || str == "")
		return true;
	else
		return false ;
}

/**
* 문자열이 빈 문자열인지 체크하여 기본 문자열로 리턴한다.
* @param str           : 체크할 문자열
* @param defaultStr    : 문자열이 비어있을경우 리턴할 기본 문자열
*/
function nvl(str, defaultStr){
	 
	if(typeof str == "undefined" || str == null || str == "")
		str = defaultStr ;
	 
	return str ;
}

function fn_alert(msg) {
	alert(msg);
	
}
//*************************************
//Cookie
//*************************************
function setCookie(cookieName, value, exdays){
	cookieName = removeCarriageReturn(cookieName);
	value = removeCarriageReturn(value);
	
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
  document.cookie = cookieName + "=" + cookieValue;
}

function getCookie(cookieName) {
  cookieName = cookieName + '=';
  var cookieData = document.cookie;
  var start = cookieData.indexOf(cookieName);
  var cookieValue = '';
  if(start != -1){
      start += cookieName.length;
      var end = cookieData.indexOf(';', start);
      if(end == -1)end = cookieData.length;
      cookieValue = cookieData.substring(start, end);
  }
  return unescape(cookieValue);
}

function deleteCookie(cookieName){
  document.cookie = cookieName + "= " + "; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function set_coo(name, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; expires=" + todayDate.toGMTString() + ";";
}

function get_coo(name) {
    var nameOfCookie = name + "=";
    var x = 0;
    while (x <= document.cookie.length) {
        var y = (x + nameOfCookie.length);
        if (document.cookie.substring(x, y) == nameOfCookie) {
            if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
                endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endOfCookie));
        }
        x = document.cookie.indexOf(" ", x) + 1;
        if (x == 0)
            break;
    }
    return "";
}

var downloadTimer;
function blockUI() {
	show_loading();
	//setCookie("fileDownloadToken", "FALSE")
    downloadTimer = setInterval(function() {
        var token = getCookie("fileDownloadToken");
        console.log('token',token);
        if(token == "TRUE") {
            unBlockUI();
        }
    }, 1000 );
}
function unBlockUI() {
    hide_loading();
    clearInterval(downloadTimer);
    deleteCookie("fileDownloadToken");
}

//progress
function show_loading() {	
	
	fn_modal_open("loadingleModal");
	
	delay_hide_loading();
}

function hide_loading() {

	fn_modal_close("loadingleModal");
}


//*************************************
//Date
//*************************************

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

//년월일 시분초
function getTime() {
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth()+1;
	var date = now.getDate();
	var day = now.getDay();
	var hour = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();
	
	$("#now").html(year+"년 "+(("00"+month.toString()).slice(-2))+"월 "+(("00"+date.toString()).slice(-2))
			+"일 " + getDay(day) +" <b>"+(("00"+hour.toString()).slice(-2)) + ":"
			+(("00"+minutes.toString()).slice(-2))+":" + (("00"+seconds.toString()).slice(-2)) +"</b>" );
}

//YYYY-MM-DD
function getDate() {
	
	var today = new Date();

	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);

	return year + '-' + month  + '-' + day;
}


function getTime() {
	
	var today = new Date();   

	var hours = ('0' + today.getHours()).slice(-2); 
	var minutes = ('0' + today.getMinutes()).slice(-2);

	return hours + ':' + minutes;
}

function oneMonthAgo() {
	
	var today = new Date();

	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() - 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);

	return year + '-' + month  + '-' + day;
}


///YYYY년 MM월 DD일
function getHangleDate(date) {
	var year = date.substring(0,4);
	var month = date.substring(4,6);
	var date = date.substring(6,8);
	return year+"년 "+month+"월 "+date+"일";
}
//YY년 MM월 DD일
function getShortHangleDate(date) {
	var year = date.substring(2,4);
	var month = date.substring(4,6);
	var date = date.substring(6,8);
	return year+"년"+month+"월"+date+"일";
}

//요일반환
function getDay(value) {
	switch(value) {
		case 0: 
			return "일요일";
		case 1: 
			return "월요일";
		case 2: 
			return "화요일";
		case 3: 
			return "수요일";
		case 4: 
			return "목요일";
		case 5: 
			return "금요일";
		default: return "토요일";
	}
}

//hidden
function fn_toggle(obj){
	
	$(obj).next().toggleClass('hidden');		
}

//스크롤 고정
function fn_setScrollPosition(intY){
	
	window.scrollTo(0, intY); //opera not working
	/*window.setTimeout(function() {
		window.scrollTo(0, intY);
	}, 0);*/
}

//modal open
function fn_modal_open(modalId, title, body) {
	if (title != "")
	    $('#' + modalId + '.modal-title').html(title);
	
	//$("#MyPopup .modal-title").html(title);
	//$("#MyPopup .modal-body").html(body);
	//$("#MyPopup").modal("show");
	$('#' + modalId).modal('show');
}

//modal close
function fn_modal_close(modalId) {
	$('#' + modalId).modal("hide");
}

function fn_open_modal(modalId, title, body) {
	if (title != "")
	    $('#' + modalId + '.modal-title').html(title);
	
	$('#' + modalId).modal('show');
}


function fn_close_modal(modalId) {
	$('#' + modalId).modal("hide");
}

function fn_open_modal_new(modalId) {
	if(modalId == '')
		modalId = 'new-modal';
	fn_modal_open(modalId);
}

function fn_open_modal_view(modalId) {
	if(modalId == '')
		modalId = 'view-modal';
	fn_modal_open(modalId);
}

function fn_open_popup(id) {
	try {
		$("#" + id).modal("show");
	} catch (e) {
		$("#" + id).show();
	}
}

function fn_close_popup(id, type) {
	try {
		$("#" + id).modal("hide");
	} catch (e) {
		$("#" + id).hide();
	}
}

function fn_down_file(url) {
    window.open(url, '_parent', 'toolbar=0,location=0,menubar=0');
}


function isNull(v) {
    return (v === undefined || v === null) ? true : false;
}

//*************************************
//Form
//*************************************
///form을 json으로 변환
function fn_serialize() {
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
}




//유효성 체크
function formCheck(formName) {
	
	var valid = true;
	var form = $('#' + formName);
	
	form.find('input, select').each(function(key){
		
		var obj = $(this);
		var objNm = obj.attr('valiName')
		
		if(obj.attr('validation') == 'yes') {

			if(isEmpty(obj.val())){

				alert(objNm + '을(를) 입력 해 주세요.');
				$('#' + obj[0].id).focus();

				valid = false;
				return false;
			}
		}
	});
	
	return valid;
}

function isEmpty(val) {
	if(val == null || typeof val == 'undefind' || val == '' || val.toString().trim().length < 1) {
		return true;
	}
	
	return false;
}

function fn_setForm(map){
	for(var key in map) {
		var control = $('#' + key);
		if(control != null){
					
			control.val(map[key]);
		}
	}
}

function filteredColumnDefinitions(list) {
	
	return list.map(function(obj){
		
		if(obj.hasChildren) {
			var rtnMap = {};
			var rtnList = [];
			var columnsQty = 0;
			obj.columns.map(function(chl){
				var rtnchl = {};
				rtnchl.title = chl.title === undefined ? '' : chl.title;
				rtnchl.field = chl.field === undefined ? '' : chl.field;
				rtnchl.excelYn = chl.excelYn === undefined ? true :chl.excelYn;
				rtnchl.visible = chl.visible === undefined ? true :chl.visible;
				rtnchl.excelSq = chl.excelSq;
				rtnchl.headerColor = chl.headerColor;
				if(rtnchl.excelYn) {
					rtnList.push(rtnchl);
					columnsQty += 1;
				}
			});
			rtnMap.title = obj.title  === undefined ? '' : obj.title;
			rtnMap.headerColor = obj.headerColor;
			rtnMap.excelSq = obj.excelSq;
			rtnMap.excelYn = obj.excelYn === undefined ? true :obj.excelYn;
			rtnMap.chlLst = rtnList;
			rtnMap.columnsQty = columnsQty;
			rtnMap.hasChildren = obj.hasChildren;
			return rtnMap;
		}
		else {
			var rtnobj = {};
			
			rtnobj.title = obj.title === undefined ? '' : obj.title;
			rtnobj.field = obj.field === undefined ? '' : obj.field;
			rtnobj.excelYn = obj.excelYn === undefined ? true :obj.excelYn;
			rtnobj.visible = obj.visible === undefined ? true :obj.visible;
			rtnobj.excelSq = obj.excelSq;
			rtnobj.headerColor = obj.headerColor;
			rtnobj.hasChildren = obj.hasChildren;
			return rtnobj;
		}
	});
	
	
	
}

$('.option-open').click(function() {
	$('.search-option').toggle(100);		
});


$(".datePicker").keyup(function() {
    if( this.value.length > 10){
         this.value = this.value.substr(0, 10);
     }
     var val         = this.value.replace(/\D/g, '');
     var original    = this.value.replace(/\D/g, '').length;
     var conversion  = '';
     for(i=0;i<2;i++){
         if (val.length > 4 && i===0) {
             conversion += val.substr(0, 4) + '-';
             val         = val.substr(4);
         }
         else if(original>6 && val.length > 2 && i===1){
             conversion += val.substr(0, 2) + '-';
             val         = val.substr(2);
         }
     }
     conversion += val;
     this.value = conversion;
 });
/**
 * (개발자모드) 화면에 있는 테이블 디버깅용 팝업
 * @returns
 */
var tableIdList = [], tableDataList = {};
function tt_callback_dataloaded(data){
	if($(this).length == 0) return;
	if($(this)[0].element.id.indexOf("Debug") != -1) return;	
	tableDataList[$(this)[0].element.id] = $(this)[0].getData();
	//console.log(showEdit, showDelete, showConf)
	//grid 행 수정,삭제 권한
	if(Tabulator.prototype.findTable("#tableMain").length > 0) {
		if(!showEdit) {
			tableMain.hideColumn("edit");
		}
		if(!showDelete) {
			tableMain.hideColumn("del");
		}
		if(!showConf) {
			tableMain.hideColumn("conf");
		}
	}
	if(Tabulator.prototype.findTable("#tableSub1").length > 0) {
		if(!showEdit) {
			tableSub1.hideColumn("edit");
		}
		if(!showDelete) {
			tableSub1.hideColumn("del");
		}
		if(!showConf) {
			tableSub1.hideColumn("conf");
		}
	}
	if(Tabulator.prototype.findTable("#tableSub2").length > 0) {
		if(!showEdit) {
			tableSub2.hideColumn("edit");
		}
		if(!showDelete) {
			tableSub2.hideColumn("del");
		}
		if(!showConf) {
			tableSub2.hideColumn("conf");
		}
	}
	if(Tabulator.prototype.findTable("#tableSub3").length > 0) {
		if(!showEdit) {
			tableSub3.hideColumn("edit");
		}
		if(!showDelete) {
			tableSub3.hideColumn("del");
		}
		if(!showConf) {
			tableSub3.hideColumn("conf");
		}
	}
	if(Tabulator.prototype.findTable("#tableSub4").length > 0) {
		if(!showEdit) {
			tableSub4.hideColumn("edit");
		}
		if(!showDelete) {
			tableSub4.hideColumn("del");
		}
		if(!showConf) {
			tableSub4.hideColumn("conf");
		}
	}
}

$("#debugModal").on("shown.bs.modal", function(){
	var tableDebug, tableDebug2;
	$("#debugModal .modal-body").css("overflow-y", "hidden");
	
	var height = $("#debugModal .modal-body").height() - 50;	
	var cur_id, cur_lst;
	
	$(".itmTable").each(function(idx, el){
		var tableId = el.id;
		tableIdList.push({id: tableId});
	});
	
	$(".list-wrap").each(function(idx, el){
		var tableId = el.id;
		tableIdList.push({id: tableId});
	});
	
	fn_tableDebug();
	
	function fn_tableDebug() {
		
		tableDebug = new Tabulator("#tableDebug", {
			height: height,
			rowClick:function(e, row){
		    	var data = row.getData();	    		    	
		    	fn_tableDebug2(data.id, tableDataList[data.id]);
		    	tableDebug.deselectRow();
		    	row.toggleSelect();
		    },
		    columns : [
		    	 {title: "Table Id", field: "id"}
		    ]
		});
		
		tableDebug.setData(tableIdList);
	}

	function fn_tableDebug2(id, list) {
		cur_id = id;
		cur_lst = list;
		var attr = $("#debug-not-attr").is(":checked");
		var columnDefinition = [];
		
		if(list != null && list.length > 0) {			
			var keys = Object.keys(list[0]);
			for(var i=0; i<keys.length; i++) {
				if(attr && keys[i].indexOf("attr") != -1) continue;
				columnDefinition.push({title:keys[i], field: keys[i]});
			}
		}
		
		tableDebug2 = new Tabulator("#tableDebug2", {
			height: height,
			layout: "fitData",
		    columns : columnDefinition
		});
		
		tableDebug2.setData(list);		
	}
	
	$("#debug-not-attr").on("click", function(){
		fn_tableDebug2(cur_id, cur_lst);
	});
	
	$("#debug-excel-download").on("click", function(){
		var nowDate = new Date();
		fileName = "excel_" + nowDate.YYYYMMDDHHMMSS();
		if(tableDebug2.getDataCount() < 1) {
			alert("다운로드할 데이터가 없습니다.");
			return;
		}
		tableDebug2.download("xlsx", fileName + ".xlsx", {sheetName:"TableData"}); 
	});
});

$("#debugModal").on("hidden.bs.modal", function(){
	$("#tableDebug").empty();
	$("#tableDebug2").empty();	
	tableIdList = [];
});


function fn_validate_pjt_popup(id) {
	if(isEmpty(id)) id = 'pjtDegId';
	const ele = $("#search-" + id);
	if(ele == null || typeof ele == 'undefined') return false;
	if( ele.val().length < 1 ) {
    	alert("프로젝트를 선택해 주세요.");
		$("#search-pjtAcrmNm").focus();
		$("#prjtIdModal").modal('show');
		return false;
    }
	return true;
}

