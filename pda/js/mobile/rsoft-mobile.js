/*mobile*/
//**********************************************
//Page Content
//**********************************************
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

function chkInputValue(id, msg) {
	if ($.trim($(id).val()) == "") {
		alert(msg + "을(를) 입력해주세요.");
		$(id).focus();
		return false;
	}
	return true;
}


function fn_validate() {
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

function fn_chkInputValue(id, msg) {
	if ($.trim($(id).val()) == "") {
		alert(msg + "을(를) 입력해주세요.");
		$(id).focus();
		return false;
	}
	return true;
}

function fn_moveToURL(url, msg) {
	if (msg) {
		if (!confirm(msg + " 하시겠습니까??"))
			return;
	}
	location.href = url;
}

function fn_moveToURLbyForm(formid, url, msg) {
	if (msg) {
		if (!confirm(msg + " 하시겠습니까??"))
			return;
	}
	var form = document.getElementById(formid);
	form.action = url;
	form.submit();
}

function fn_html2Text(str) {
	str = str.replace(/&nbsp;/gi, " ");
	return str.replace(/<br>/gi, "\n");
}

function fn_text2Html(str) {
	str = str.replace(/ /g, "&nbsp;");
	return str.replace(/\n/g, "<br>");
}

/**
 * 문자열이 빈 문자열인지 체크하여 결과값을 리턴한다.
 *
 * @param str :
 *            체크할 문자열
 */
function isEmpty(str) {

	if (typeof str == "undefined" || str == null || str == "")
		return true;
	else
		return false;
}

/**
 * 문자열이 빈 문자열인지 체크하여 기본 문자열로 리턴한다.
 *
 * @param str :
 *            체크할 문자열
 * @param defaultStr :
 *            문자열이 비어있을경우 리턴할 기본 문자열
 */
function nvl(str, defaultStr) {

	if (typeof str == "undefined" || str == null || str == "")
		str = defaultStr;

	return str;
}

function fn_alert(msg) {
	alert(msg);
}

function fn_focus(focus) {
	$("." + focus).unbind("focus").on("focus", function(e) {

		var id = $(this).attr("id");

		$(this).attr("readonly", true);

		setTimeout(function() {
			$("#" + id).attr("readonly", false);
		}, 10); // 안드로이드 바코드 터치시 키보드 안뜨게 할려고 setTimeout 세팅

	});

	$("#" + focus).focus();

	var isClear = '' + "${msg.isClear}";
	if (isClear == 'Y') {
		$("#" + focus).value = '';
	}
}


function fn_controls(map) {
	for ( var key in map) {
		fn_control(map[key])
	}
}

function fn_control(obj) {

	var controlName = '' + obj.name;

	if (controlName != '') {

		var control = $('#' + controlName);

		var value = '' + obj.value;

		if (value == '$CLEAR$') {
			control.val('');
		} else if (value != '') {
			control.val(value);
		}

		var isFocus = '' + obj.isFocus;
		if (isFocus == 'Y') {
			fn_focus(controlName);
		}

		var isEnable = '' + obj.isEnable;
		if (isEnable == 'Y') {

		} else if (isEnable == 'N') {

		}

		var isDisplay = '' + obj.isDisplay;
		if (isDisplay == 'Y') {
			control.removeAttr('style', "display:none;");
		} else if (isDisplay == 'N') {

			control.attr('style', "display:none;");
		}

		var isHidden = '' + obj.isHidden;
		if (isHidden == "Y") {
			control.attr('style', 'visibility:hidden')
		} else if (isHidden == "N") {
			control.removeAttr('style', 'visibility:hidden')
		}

		var isReadonly = '' + obj.isReadonly;
		if (isReadonly == 'Y') {
			control.attr("readonly", true);
		} else if (isReadonly == 'N') {
			control.attr("readonly", false);
		}

	}
}

function fn_setForm(map) {
	for ( var key in map) {
		var control = $('#' + key);
		if (control != null) {
			control.val(map[key]);
		}
	}
}

//바코드 스캔시 스크롤을 맨 아래로 이동
function fn_scrollToTableBottom(tableId) {
   let elem = document.getElementById(tableId);

   window.scrollTo(0, elem.offsetHeight);
}

//**********************************************
//Popup layer
//**********************************************
function fn_popup(layerId) {

	if (layerId != '') {
		$('.body').addClass('fixed');
		$('.curtain').show();
		$(".popup-layer[id=" + layerId + "]").fadeIn('fast');

		var control = $('#' + layerId);
		control.addClass("popup-content-active");
		isPopUp(layerId); // android popup check
	}
}

function fn_closePopup(layerId) {

	if (layerId != '') {
		// event.preventDefault();

		$('body').removeClass('fixed');

		var control = $('#' + layerId);
		control.hide();
		$('.curtain').hide();

		// android popup control
		control.removeClass("popup-content-active");
		isPopUp(''); // android popup check

		$('.popup-layer form').each(function() {
			this.reset();
		});
	}
}

function fn_footerClosePopup(layerId) {

	if (layerId != '') {
		event.preventDefault();
		$('body').removeClass('fixed');

		var control = $('#' + layerId);
		control.hide();

		$('.curtain').hide();
		$('.popup-layer form').each(function() {
			this.reset();
		});
	}
}

//바코드 직접입력
$(function(){
	// 모달이 사용자에게 보여지면 안드로이드 자판 on
	$('#barcodeDirectModal').on("shown.bs.modal",function(){
		$('#direct-barcode').focus();
	});
	$('#barcodeDirectModal').on("hidden.bs.modal",function(){
		$('#direct-barcode').val("");
	});
})



//**********************************************
//Data Processing
//**********************************************
//Basic 처리
function fn_dataProc(data) {
	console.log('prdc', data);

	var control = data.control;
	var controls = data.controls;
	var msg = data.alert;
	var confirm = data.confirm;

	// *******************************
	var commonMap = data.commonMap;

	var commonVO = data.commonVO;
	// ********************************

	var popup = data.popup;
	var closePopup = data.closePopup;

	if (msg != null) {
		fn_alert(msg);
	}

	// ***********************
	if (commonMap != null) {
		fn_setForm(commonMap);
	}
	if (commonVO != null) {
		fn_setForm(commonVO);
	}
	// ***************************

	if (control != null) {
		fn_control(control);
	}

	if (controls != null) {
		//fn_controls(controls);
	}

	if (closePopup != null) {
		fn_closePopup(closePopup);
	}

	if (popup != null) {
		fn_popup(popup);
	}

	var multiLists = data.multiLists;

	if (multiLists != '') {
		fn_listProc(multiLists);
	}

	var singleLists = data.singleLists;
	if (singleLists != '') {
		fn_comboListProc(singleLists);
	}

}

//select 처리
function fn_comboListProc(map) {
	for ( var key in map) {
		var control = $('#' + key);
		control.empty();
		control.attr('selectedIndex', 0);

		// console.log(key);

		var mapRow = map[key];
		// console.log(mapRow);

		for ( var key in mapRow) {
			mapCell = mapRow[key];

			var i = 0;
			var valueCell;
			var textCell;
			for ( var key in mapCell) {
				if (i == 0)
					valueCell = mapCell[key];
				else if (i == 1)
					textCell = mapCell[key];
				i++;
			}

			fn_addOption(control, textCell, valueCell);
		}
	}
}

function fn_addOption(control, text, val) {
	if (control != null) {
		optionText = text;
		optionValue = val;

		control.append($('<option>').val(optionValue).text(optionText));
	}
}

//List To Table
//Table div와 id 일치필요
function fn_listProc(map) {

	for ( var key in map) {

		//div 영역에 table 직접 생성 표시
		if (key.toLowerCase().indexOf('div') != -1) {
			fn_divListProc(key, map[key]);
			
		//table에 표시
		} else {
			var table = $('#' + key);

			if (table != '') {
				var tbody = $('#' + key + ' > tbody');
				tbody.empty();

				fn_tableProc(key, map[key]);
			}
		}
	}
}

//Table에 Data 표시
function fn_tableProc(tableName, map) {

	var objRow;
	var objCell;

	var mapRow;
	var mapCell;

	var rowItem;

	var table = $("#" + tableName);

	table.off('click', 'tbody > tr');
	table.on('click', 'tbody > tr', function() {

		$(this).addClass("select").siblings().removeClass("select");
		var tr = $(this);
		var td = tr.children();

		var index = tr.toArray()[0].rowIndex - 1;

		if (tableName.toLowerCase().indexOf("layer") != -1) {
			$('#tableSelectLayerIndex0').val(index);
		} else if (tableName == "listView1") {
			$('#tableSelectIndex0').val(index);
		}

		if (tableName == 'listView1') {
			var arr = new Array();
			td.each(function(i) {
				arr.push(td.eq(i).text());
			});
			
			//행 선택. 표에 있는 행 클릭 시 행정보 얻어 팝업창으로 이동
			//jsp에서 따로 구현하면 arr받아올 수 있음
			fn_table_row_click(tableName, arr);
		} else {
			var arr = new Array();
			td.each(function(i) {
				arr.push(td.eq(i).text());
			});
			
			//행 선택. 표에 있는 행 클릭 시 행정보 얻어 팝업창으로 이동
			//jsp에서 따로 구현하면 arr받아올 수 있음
			fn_table_row_click(tableName, arr);
		}
	});

	var i = 0;
	var inCount = 0;
	for ( var key in map ) {

		mapRow = map[key];
		rowItem = '<tr id=' + i + '>';

		for ( var key in mapRow) {
			mapCell = mapRow[key];
			//console.log('cell',key, mapCell);
			if (isEmpty(mapCell)) {
				mapCell = "";
			} else {
				mapCell = mapCell.replace('null', '');
			}
			if (mapCell.indexOf("index") != -1) { // index로 쓰일 값 (ex)
													// index_xxxx
				rowItem += "<td style='display: none;'>"
						+ mapCell.split("_")[1] + "</td>";
			} else if (mapCell.indexOf("check") != -1) { // 체크박스
				var ox = mapCell.split("_")[1];
				var checked = (ox == "O" || ox == "Y") ? 'checked' : '';
				rowItem += "<td class='check'><input type='checkbox' "+checked+" class='"+ox+"'></td>";

			} else if(mapCell.indexOf("hidden") != -1) {
				rowItem += "<td style='display: none;'>"
					+ mapCell.split("_")[1] + "</td>";
			} else if (mapCell == "Y") {
				rowItem += "<td class='color-red'>" + mapCell + "</td>";
			} else if(mapCell.indexOf("disabled") != -1 || mapCell.indexOf("colored") != -1) {
				rowItem += ''
			} else {
				rowItem += "<td class='ellipsis'>" + mapCell + "</td>";
			}
		}
		rowItem += "</tr>";

		$('#' + tableName).append(rowItem);

		for ( var key in mapRow) {
			mapCell = mapRow[key];
			//disabled 여부
			if (mapCell.indexOf("disabled") != -1) {
				var ox = mapCell.split("_")[1];
				var disabled = (ox == "O" || ox == "Y") ? true : false;
				$("#" + tableName + " tr#" + i + " td.check input[type=checkbox]").prop('disabled', disabled);

				if(disabled) {
					$("#" + tableName + " tr#" + i + " td.check input[type=checkbox]").addClass("inp");
				}
			}
			if(mapCell.indexOf("colored") != -1) {
				var ox = mapCell.split("_")[1];
				if(ox == "O") {
					$("#" + tableName + " tr#" + i).css("background-color", "#FF8969");
					//투입수량 증가
					inCount++;
				}
			}
		}
		i++;
	}
	
	//투입수량 표시 input이 존재하면 투입수량 바인딩
	if($('#inCount')){
		$('#inCount').val(inCount);
	}
}

function fn_divListProc(divName, map) {

	var div = $('#' + divName);

	if (div != 'undefined') {
		div.empty();

		fn_divProc(divName, map);
	}
}

function fn_divProc(divName, map) {

	var div = $("#" + divName);
	var divNotFound = $("#divNotFound");

	divNotFound.addClass('hidden');
	div.addClass('hidden');
	$(div).empty();

	var i = 0;
	if (divName.toLowerCase().indexOf("statuspro0") != -1) {

		var html_header = "";
		var html_sum = "";
		var html_list = "";
		for ( var key in map) {
			i = i + 1;
			mapRow = map[key];

			var statusCss;
			if (mapRow[3] == "생산중") {
				statusCss = "state1";
			} else if (mapRow[3] == "생산조정") {
				statusCss = "state2";
			} else if (mapRow[3] == "공무정비") {
				statusCss = "state3";
			} else if (mapRow[3] == "자가정비") {
				statusCss = "state3";
			} else {
				statusCss = "state4";
			}

			if (mapRow[0] == "합  계") {
				html_header += '	<tr>';
				html_header += '		<td>' + mapRow[4] + '</td>';
				html_header += '		<td>' + mapRow[5] + '</td>';
				html_header += '		<td>' + mapRow[6] + '</td>';
				html_header += '	</tr>';

				html_sum += '	<tr>';
				html_sum += '		<td>' + mapRow[0] + '</td>';
				html_sum += '		<td class="txt-r">' + mapRow[1] + '</td>';
				html_sum += '		<td></td>';
				html_sum += '		<td></td>';
				html_sum += '	</tr>';
			} else {
				html_list += '			<tr class="' + statusCss + '">';
				html_list += '				<td>' + mapRow[0] + '</td>';
				html_list += '				<td class="txt-r">' + mapRow[1] + '</td>';
				html_list += '				<td>' + mapRow[2] + '</td>';
				html_list += '				<td>' + mapRow[3] + '</td>';
				html_list += '			</tr>';
			}
		}// end for

		var html = "";

		// 현황 종합
		html += '<table class="table-list-info" width="100%">';
		html += '<col width="33%" />';
		html += '<col width="34%" />';
		html += '<col width="35%" />';
		html += '<thead>';
		html += '	<tr>';
		html += '		<th scope="col">전일</th>';
		html += '		<th scope="col">당월</th>';
		html += '		<th scope="col">전월</th>';
		html += '	</tr>';
		html += '</thead>';
		html += '<tbody>';
		html += html_header;
		html += '</tbody>';
		html += '</table>';

		// 라인별 실적 테이블
		html += '<table class="table-list2" width="100%" style="margin-top: 16px;">';
		html += '<col width="33%" />';
		html += '<col width="24%" />';
		html += '<col width="25%" />';
		html += '<col width="20%" />';
		html += '<thead>';
		html += '	<tr>';
		html += '		<th scope="col">설비</th>';
		html += '		<th scope="col">실적</th>';
		html += '		<th scope="col">달성율</th>';
		html += '		<th scope="col">가동상태</th>';
		html += '	</tr>';
		html += '</thead>';
		html += '</table>';

		// 검색 리스트
		html += '<div class="scroll-y">';

		html += '	<div class="table-wrap">';

		html += '		<table class="table-list2 odd" width="100%">';
		html += '		<col width="33%" />';
		html += '		<col width="24%" />';
		html += '		<col width="25%" />';
		html += '		<col width="20%" />';
		html += '		<tbody>';
		html += html_list;
		html += '		<tbody>';
		html += '		</tbody>';
		html += '		</table>';
		html += '	</div>';

		html += '</div>';
		// 검색 리스트 end

		// 합계
		html += '<table class="table-list2" width="100%">';
		html += '<col width="33%" />';
		html += '<col width="24%" />';
		html += '<col width="25%" />';
		html += '<col width="20%" />';
		html += '<tfoot>';
		html += html_sum;
		html += '</tfoot>';
		html += '</table>';

		$('#' + divName).append(html);

	}

	if (i > 0)
		div.removeClass('hidden');
	else {
		divNotFound.removeClass('hidden');
	}
}


/**
 *
 * @param tableName
 * @param checkNoDisabled - check 되고, disabled가 아닌거.
 * @param onlyCheck - check 되고, disabled 상관 없음.
 * @returns
 */
function fn_getTableList(tableName, checkNoDisabled, onlyCheck) {
	var table = $("#" + tableName);
	var list = [];
	if(table.length > 0) {
		var tr = $("#" + tableName + " tbody").children();
		if(checkNoDisabled) {
			tr.each(function(i) {
				var isChecked = $(tr.eq(i)[0]).find("input[type=checkbox]").prop("checked");
				var isDisabled = $(tr.eq(i)[0]).find("input[type=checkbox]").prop("disabled");
				if(!isDisabled && isChecked) {
					var td = tr.eq(i).children();
					var arr = new Array();
					td.each(function(i) {
						arr.push(td.eq(i).text());
					});
					list.push(arr);
				}
			});
		} else if(onlyCheck) {
			tr.each(function(i) {
				var isChecked = $(tr.eq(i)[0]).find("input[type=checkbox]").prop("checked");
				if(isChecked) {
					var td = tr.eq(i).children();
					var arr = new Array();
					td.each(function(i) {
						arr.push(td.eq(i).text());
					});
					arr.push(tr.eq(i)[0].id); //index
					list.push(arr);
				}
			});
		}
		else {
			tr.each(function(i) {
				var td = tr.eq(i).children();
				var arr = new Array();
				td.each(function(i) {
					arr.push(td.eq(i).text());
				});
				list.push(arr);
			});
		}
	}
	return list;
}

//**********************************************
//Android Use
//**********************************************
//Android에서 Mobile 팝업 닫기
function goAwayPopup() {

	// close alert here...
	// alert("goAwayPopup");
	if ($(".popup-content-active").length > 0) {
	}

	var items = $('.popup-content-active')
	if (items.length > 0) {
		var control = $('.popup-content-active').attr('id');
		// alert(control);

		fn_closePopup(control);
	}
}

//Android에서  팝업 여부 확인
function isPopUp(arg) {
	if (typeof android != "undefined") {
		if (android.isPopUp != "undefined") {
			android.isPopUp(arg);
		}
	}
}

// progress
function show_loading() {
	$('.loading').css("display", "block");
	delay_hide_loading();
}

function hide_loading() {
	$('.loading').css("display", "none");
}

function delay_hide_loading() {
	setTimeout(function() {
	    if($(".loading").css("display") == "block"){
	        jQuery('.loading').css("display", "none");
	        alert('서버 응답이 없습니다.');
	    }
	}, 20000);
}



function getDate() {
	var date = new Date();
	var year = date.getFullYear();
	var month = new String(date.getMonth() + 1);
	var day = new String(date.getDate());

	// 한자리수일 경우 0을 채워준다.
	if (month.length == 1) {
		month = "0" + month;
	}
	if (day.length == 1) {
		day = "0" + day;
	}

	$("#date").val(year + "-" + month + "-" + day);
}

// Cookie
function setCookie(cookieName, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var cookieValue = escape(value)
			+ ((exdays == null) ? "" : "; expires=" + exdate.toGMTString());
	document.cookie = cookieName + "=" + cookieValue;
}

function getCookie(cookieName) {
	cookieName = cookieName + '=';
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cookieName);
	var cookieValue = '';
	if (start != -1) {
		start += cookieName.length;
		var end = cookieData.indexOf(';', start);
		if (end == -1)
			end = cookieData.length;
		cookieValue = cookieData.substring(start, end);
	}
	return unescape(cookieValue);
}

function deleteCookie(cookieName) {
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate() - 1);
	document.cookie = cookieName + "= " + "; expires="
			+ expireDate.toGMTString();
}

//jsp 에서 재 선언후 사용
function fn_table_row_click(name, rowArr) {
	console.log(rowArr);
	if(tableName == "listView1") {
		//$("input[name=relsdId]").val(rowArr[0]);
	}
}




