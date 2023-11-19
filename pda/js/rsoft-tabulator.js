Tabulator.prototype.defaultOptions.dataLoaded = tt_callback_dataloaded;
Tabulator.prototype.defaultOptions.layout 					= "fitColumns";
Tabulator.prototype.defaultOptions.columnHeaderVertAlign 	= "middle";
Tabulator.prototype.defaultOptions.headerHozAlign 			= "center";
Tabulator.prototype.defaultOptions.placeholder 				= "데이터가 존재하지 않습니다.";
Tabulator.prototype.defaultOptions.headerSort 				= false;
Tabulator.prototype.defaultOptions.resizableColumns 		= true;
Tabulator.prototype.defaultOptions.cellVertAlign			= "middle";
Tabulator.prototype.defaultOptions.height
	= $(".itmTable").length > 0 ? "calc(100vh - "+($(".itmTable").offset().top+80)+"px)" : "100%";

function fn_set_select_count(id, count) {
	$("#" + id).text(count);
}

function fn_set_tooltip(element) {
	$(element).tooltip();
}

//*************************************
//tabulator
//*************************************
function tt_set_table(url, parData, $tableData) {
  $.ajax({
      url : url,
      type : "post",
      data : JSON.stringify(parData),
      contentType : "application/json; charset=UTF-8",
      beforeSend : function() {
         show_loading();
      },
      success : function(data, status, xhr) {
         console.log(data);
         if(data.length > 0) {

      	   $tableData.setData(data);
         }

      },
      error : function(jqXHR, textStatus, errorThrown) {
         if (jqXHR.status == 403) {
        	 ajax_error_session_timeout();
         } else {
        	 ajax_error_message(jqXHR);
         }
      },
      complete : function() {
         hide_loading();
      }
   });
}

function tt_clear_table(tableId) {
	if($("#" + tableId).length > 0) {
		var table = Tabulator.prototype.findTable("#" + tableId);
		if(table) {
			if(table[0].getDataCount() > 0) {
				table[0].clearData();
			}
			//else console.log("3. There is no Data");
		}
		//else console.log("2. There is no such table. Check the table name");
	}
	//else console.log("1. There is no such table. Check the table name");
}


//페이지가 1인 경우 paging 감추기
function fn_hide_tabulator_footer(tableId) {
	var jqObj = "#" + tableId;
	const findTable = Tabulator.prototype.findTable(jqObj);

	var pageMax = findTable[0].getPageMax(); // returns maximum page
	//console.log(pageMax)
  if(pageMax > 1){
      $(jqObj + " .tabulator-footer").show();
  }else{
      $(jqObj + " .tabulator-footer").hide();
  }
}

function tt_select_bind(selectList, value) {
	var html = "";
	if(selectList != null) {
	   for(var i=0; i<selectList.length; i++){
	      if(selectList[i].field1 == value){
	         html = selectList[i].field2;
	      }
	   }
	}
	return html;
}


/**
* Tabulator 행클릭 트리거 함수
* @param tableId
* @param key - 첫번째 행 클릭인 경우 빈문자열 전달
* @param isFirst - true일 경우 첫번째 행 클릭, false인 경우 key값으로 행 찾아 클릭
* @returns
*/

function tt_row_click(tableId, key, isFirst) {
	//console.log(tableId);
	if($("#" + tableId).length > 0) {
	  var tableList = Tabulator.prototype.findTable("#" + tableId);
	  //console.log(tableList);
	  if(tableList) {
		 var table = tableList[0];
		 if(table.getDataCount() > 0) {
			var row, ele;
			if(isFirst) {
			   row = table.getRows("active");
			   ele = row[0].getElement();
			   //console.log(ele);
			   $(ele).trigger("click");
			}
			else {
			   row = table.getRow(key);
			   ele = row.getElement();
			   $(ele).trigger("click");

			   table.scrollToRow(key, "top", false);
			}
		 }
	  }
	}
}

function tt_convertCheckBox(value) {
	var checkyn = value == "Y" ? "checked" : "";

	var check = "<input type='checkbox' class='form-check-input' name='r-useYn' data-value='"
	+ value + "'" + checkyn +" disabled >";

	return check;
}

function tt_convertCheckBoxAll(cell, formatterParams, onRendered) {
	return '<input type="checkbox" class="form-check-input" id="rowcheckall" onclick="fn_toggle_select(this)">';
}

function tt_edit_button(id, fname, icon) {
	fname = fname == null ? "fn_edit" : fname;
	icon = icon == null ? "ri-draft-line" : icon;

	var html = '<button type="button" class="btn btn-outline-dark edit-btn" id="edt_'
		+ id + '" onclick="' + fname + '(this); " >'
		+ '<i class="'+ icon +' ri-1x"></i></button>';

	return html;
}

function tt_del_button(id, fname) {
	fname = fname == null ? "fn_delete" : fname;

	var html = '<button type="button" class="btn btn-outline-danger del-btn" id="del_'+ id +'"'
	+' onclick="' + fname + '(this); "><i class="ri-delete-bin-6-line ri-1x"></i></button>';

	return html;
}

function tt_cancel_button() {
	return html = "<button type='button' class='btn btn-outline-danger' onclick='fn_cancel(this);'><i class='ri-close-circle-line ri-1x'></i></button>";
}

function tt_save_button() {
	return html = "<button type='button' class='btn btn-dark' onclick='tt_row_add(this); '><i class='ri-play-fill ri-1x'></i></button>";
}

function tt_disabled_button() {
	$("button[id^=btn_register]").addClass("hidden");
	$(".edit-btn, .del-btn").prop("disabled", true);
}

function tt_usable_button() {
	$("button[id^=btn_register]").removeClass("hidden");
	$(".edit-btn, .del-btn").prop("disabled", false);
}

function tt_row_add(tableId) {

	var jqObj = "#" + tableId;
	const findTable = Tabulator.prototype.findTable(jqObj);

	var id = obj.id.substring(4);
    var row = $("#"+id);
    var data = findTable[0].getRows()[id].getData();

    data.workCd = "D";
    //console.log("data", data);

    //삭제요청ajax
    fn_row_delete_ajax(tableId, data);

}

function tt_row_delete(tableId, obj) {

	if(confirm("삭제 하시겠습니까?")){
		var jqObj = "#" + tableId;
		const findTable = Tabulator.prototype.findTable(jqObj);

		var id = obj.id.substring(3).replace(/tableId/gi, "");
	    //var row = $("#"+id);
	    var data = findTable[0].getRows()[id].getData();

	    data.workCd = "D";
	    //console.log("data", data);

	    //삭제요청ajax
	    fn_row_delete_ajax(tableId, data);
   }
}

function tt_excel_down(tableId, fileName) {
	show_loading();
	if(fileName == ""){
		var nowDate = new Date();
		fileName = "excel_" + nowDate.YYYYMMDDHHMMSS();
	}

	var jqObj = "#" + tableId;
	const findTable = Tabulator.prototype.findTable(jqObj);

	var findTableCopy = findTable[0];

	var row = findTableCopy.getColumnDefinitions();
	for(var i=0; i<row.length; i++){
		if(!isEmpty(row[i].title)) {
			row[i].title = row[i].title.replace(/<br>/gi," ");
		}
	}

	const data = findTableCopy.getData();
	//console.log(data);

	//null to blank
	parseRows(data);
	//findTableCopy.setData(data);
	findTableCopy.download("xlsx", fileName + ".xlsx", {sheetName:"MyData"});
	hide_loading()
	/*
	const findTable2 = Tabulator.prototype.findTable(jqObj);
	const data2 = findTable2[0].getData();
	data2.forEach(function (row2) {
		console.log(row2);
	});
	*/
}

function parseRows(data) {
	//generate each row of the table
	data.forEach(function (row) {
		for ( var key in row) {
			var cellValue = row[key];
			row[key] = (isEmpty(cellValue)) ? "" : cellValue;
		}
	});

	return data;
}


//yyyyMMdd -> yyyy-MM-dd
function tt_date_format(cell, formatterParams, onRendered) {
	var value = cell.getValue();

	if(value!= null && value.length == 8) {
		return value.substring(0,4) + "-" + value.substring(4,6) + "-" + value.substring(6,8);
	}
	else {
		return value;
	}
}

//yyyyMM -> yyyy-MM
function tt_month_format(cell, formatterParams, onRendered) {
	var value = cell.getValue();
	if(Number.isInteger(parseInt(value))) return fn_date_nodashToDash(value);
	else return value;
}

//소수점 버리기
function tt_exRound_format(cell, formatterParams, onRendered) {
	var value = cell.getValue();

	if(value == '' || value == null) return '';
	else {
		var pos = formatterParams != null && formatterParams.pos != null ? formatterParams.pos : 0;
		var value = setComma(exRoundW0(value.replaceAll(",",""), pos));

		if(formatterParams != null && formatterParams.suffix != null) {
			value = value + formatterParams.suffix;
		}
		if(formatterParams != null && formatterParams.prefix != null) {
			value = formatterParams.prefix + value;
		}
		return value;
	}
}

function tt_row_num(cell, formatterParams, onRendered) {
	return cell.getRow().getPosition() + 1;
}
/**
 * input[type=text] 자동생성
 * checkbox, select, 수정/삭제 버튼은 tabulator 정의할 때 따로 구현해주어야 한다.
 * formatterParams
 * - editonly: addonly일때는 일부 formatterParams 속성(readonly, disabled)이 적용되지 않는다.
 * @param tableId
 * @param isFirst - true: 첫 번째 행에 추가, false: 마지막 행에 추가
 * @returns
 */
function tt_add_row(tableId, isFirst) {
	const findTable = Tabulator.prototype.findTable("#" + tableId);
	var row = findTable[0].getColumnDefinitions();

	var fieldCheckboxList 	= []
	,   fieldSelectList		= []
	,   fieldTextList 		= []
	,   fieldTextAreaList   = []
	,   fieldDateList 		= []
	,   fieldMonthList 		= [];

	var data = {};
	for(var i=0; i<row.length; i++){
		var field = row[i].field
		 ,  title = row[i].title
		 ,  params= row[i].formatterParams
		 ,  align = row[i].hozAlign
		;

		var pass = false
		 ,  date = false
		 ,  month = false
		 ,  checked = false
		 ,  select = false
		 ,  textarea = false
		 ,  required = false
		 ,  readonly = false
		 ,  disabled = false
		 ,  editonly = false
		 ,  popup = false
		 ,  requiredField = ""
		 ,  popupId = ""
		 ,  textareaRows
		;

		if(field == "edit" || field == "del") {
			data[field] = "custom";
			continue;
		}
		if(params !== undefined) {

			for(var param in params){

				if(param == "visible" && !params[param]) {
					pass = true;
					break;
				}
				else if(param == "select" || param == "checkbox") {
					pass = true;
					data[field] = "custom";
					if(param == "select") select = true;
					else if(param == "checkbox") checked = true;
					break;
				}
				else if(param == "textarea") {
					textarea = true;
					textareaRows = params[param];
				}
				else if(params[param]) {
					date	 = param == "date" 	   ? true : date;
					month	 = param == "month"    ? true : month;
					required = param == "required" ? true : required;
					readonly = param == "readonly" ? true : readonly;
					disabled = param == "disabled" ? true : disabled;
					editonly = param == "editonly" ? true : editonly;
					popup 	 = param == "popup"    ? true : popup;
					if(param == "required" && required) {
						requiredField = params[param];
					}
					if(param == "popup" && popup) {
						popupId = params[param];
						readonly = true;
						disabled = false;
					}
				}
			}

			if(checked && !disabled){
				fieldCheckboxList.push(field);
			} else if(select && !disabled){
				fieldSelectList.push(field);
			}
			if(pass){
				continue;
			}
		}
		var html = "";

		if(date || month) {

			html = "<input type='"+(date ? "date" : "month") +"' class='form-control ";
			html += align == "right" ? " text-right" : "";
			html += "' autocomplete='off' name='"+field+"' ";
			html += " placeholder='" + (title == null ? '' : title.replace(/<br>/gi," ")) + "'";
			html += " onfocus='this.showPicker()' ";
			html += required ? " required data-name='" + requiredField + "' " : "";
			html += (!editonly && readonly) ? " readonly " : "";
			html += (!editonly && disabled) ? " disabled " : "";
			html += " >";
			if(data) fieldDateList.push(field);
			else fieldMonthList.push(field);
		}
		else if(textarea) {
			html =  "<textarea class='form-control' rows='" + textareaRows;
			html += "' ";
			html += "name='"+field+"'";
			html += required ? " required data-name='" + requiredField + "' " : "";
			html += (!editonly && readonly) ? " readonly " : "";
			html += (!editonly && disabled) ? " disabled " : "";
			html += "></textarea>";

			fieldTextAreaList.push(field);
		}
		else {
			html = "<input type='text' class='form-control";
			html += align == "right" ? " text-right" : "";
			html += "' autocomplete='off' name='"+field+"'";
			html += " placeholder='" + (title == null ? '' : title.replace(/<br>/gi," ")) + "'";
			html += required ? " required data-name='" + requiredField + "' " : "";
			html += (!editonly && readonly) ? " readonly " : "";
			html += (!editonly && disabled) ? " disabled " : "";
			html += " >";
			if(popup) {
				html += "<button type='button' class='btn btn-search' data-bs-toggle='modal' data-bs-target='#" + popupId +
						"'><img src='/images/btn-search.png' alt='검색'></button>";
			}

			fieldTextList.push(field);
		}

		data[field] = html;

	}

	findTable[0].addRow(data, isFirst);

	document.getElementById("add"+tableId).addEventListener("click", function(){
		if(!validate()) {
			return;
		}

		var data = {};

		for(var i=0; i<fieldTextList.length; i++) {
			data[fieldTextList[i]] = $("input[name="+fieldTextList[i]+"]").val();
		}
		for(var i=0; i<fieldDateList.length; i++) {
			var dateValue = $("input[name="+fieldDateList[i]+"]").val();
			data[fieldDateList[i]] = isEmpty(dateValue) ? '' : (dateValue.length != 8 ? fn_date_dashToNodash(dateValue) : dateValue);
		}
		for(var i=0; i<fieldMonthList.length; i++) {
			var dateValue = $("input[name="+fieldMonthList[i]+"]").val();
			data[fieldMonthList[i]] = isEmpty(dateValue) ? '' : (dateValue.length != 6 ? fn_date_dashToNodash(dateValue) : dateValue);
		}
		for(var i=0; i<fieldCheckboxList.length; i++) {
			data[fieldCheckboxList[i]] = $("input[name="+fieldCheckboxList[i]+"]").is(":checked") ? "Y" : "N";
		}
		for(var i=0; i<fieldSelectList.length; i++) {
			data[fieldSelectList[i]] = $("select[name="+fieldSelectList[i]+"]").val();
		}
		for(var i=0; i<fieldTextAreaList.length; i++) {
			data[fieldTextAreaList[i]] = $("textarea[name="+fieldTextAreaList[i]+"]").val();
		}

		data.type = "C";
		fn_save(data, tableId);
	});
}

/**
 * 행을 수정행으로 전환
 * formatterParams
 * - key	  : value
 * - required : 필수값 필드명
 * - readonly : boolean
 * - disabled : boolean
 * - checkbox : input[type=checkbox] (default는 input[type=text])
 * - select   : select cd
 * - date     : boolean
 * - month    : boolean
 * - popup	  : modal id
 * - addonly  : boolean (행추가에서만 사용하는 기능인 경우 true)
 * - editonly : boolean (행수정에서만 사용하는 기능인 경우 true)
 * - textarea : int - rows값
 * - rownum   : boolean (formatter: tt_row_num인 경우)
 *
 * @param id - table의 index
 * @param tableId
 * @returns
 * - 저장버튼 누르면 fn_save(data,tableId)함수 실행, 페이지별 저장로직 구현
 * 	 data : 작성한 data 담아서 {key:value} 형태로 반환
 * - 취소버튼 누르면 fn_cancel(this, tableId)함수 실행, 페이지별 취소로직 구현
 */

function tt_edit_row(id, tableId, parentId){
	const findTable = Tabulator.prototype.findTable("#" + tableId);
	console.log(id);
	var row = [];
	if(!isEmpty(parentId)) {
		var parentRow = findTable[0].getRow(parentId);
		var key = findTable[0].options.index;
		var idx = parentRow.getTreeChildren().map(x=>x._row.getData()).findIndex(x=>x[key]==id);
		row = parentRow.getTreeChildren()[idx];
	} else {
		row = findTable[0].getRow(id);
	}

	var $rowElement = $(row);
	var ele = row.getElement();

	//glist = gtable.getRow(5075).getTreeChildren().map(x=>x._row.getData())
	//glist.find(x=>x.prdctId=='5076')
	var fieldCheckboxList 	= []
	 ,  fieldSelectList		= []
	 ,  fieldTextList 		= []
	 ,  fieldTextAreaList   = []
	 ,  fieldInvisibleList 	= []
	 ,  fieldDateList		= []
	 ,  fieldMonthList		= []
	;

	for(var i=0; i<row.getCells().length; i++){
		var field = row.getCells()[i].getColumn().getField();
		var value = row.getCells()[i].getValue() == null ? '' : row.getCells()[i].getValue();
		var align = row.getCells()[i].getColumn().getDefinition().hozAlign;

		if(field == "edit") {
			$($(ele).children()[i]).html("<button type='button' class='btn btn-dark' id='btn"+id+"'><i class='ri-play-fill ri-1x'></i></button>");
			continue;
		}
		else if(field == "del") {
			$($(ele).children()[i]).html("<button type='button' class='btn btn-outline-danger edit' id='can"+id+"' onclick='fn_cancel(this, \""+tableId+"\");'><i class='ri-close-circle-line ri-1x'></i></button>");
			continue;
		}
		else if(field == "conf") {
			continue;
		}
		var params = row.getCells()[i].getColumn().getDefinition().formatterParams;

		var checked  	= false
			, select   	= false
			, date	 	= false
			, month		= false
			, textarea = false
			, visible  	= true
			, required 	= false
			, readonly 	= false
			, disabled 	= false
			, use 	 	= false
			, popup 	= false
			, addonly	= false
			, requiredField = ""
			, popupId = ""
			, textareaRows
			, rn = false
		;

		if(params !== undefined) {

			for(var param in params){
				if(param == "visible" && !params[param]) {
					visible = false;
					continue;
				}
				if(param == "textarea") {
					textarea = true;
					textareaRows = params[param];
				}
				if(params[param]) {
					checked  = param == "checkbox" ? true : checked;
					select   = param == "select"   ? true : select;
					date	 = param == "date" 	   ? true : date;
					month	 = param == "month"    ? true : month;
					required = param == "required" ? true : required;
					readonly = param == "readonly" ? true : readonly;
					disabled = param == "disabled" ? true : disabled;
					use 	 = param == "use" 	   ? true : use;
					popup 	 = param == "popup"	   ? true : popup;
					addonly  = param == "addonly"  ? true : addonly;
					rn		 = param == "rownum"   ? true : rn;
				}
				if(param == "required" && !addonly && required) {
					requiredField = params[param];
				}
				if(param == "popup" && !addonly && popup) {
					popupId = params[param];
					readonly = true;
					disabled = false;
				}
			}
		}

		if(!visible) {
			if(use) fieldInvisibleList.push(field);
			continue;
		}

		var html = "";

		if(checked && !disabled) {
			var isChecked = value == "" ? "" : ($($(ele).children()[i]).find("input[type=checkbox]").is(":checked") ? "checked " : "");

			html = "<input type='checkbox' class='form-check-input' name='"+field+"' value='Y' " + isChecked;
			html +=  disabled ? " disabled " : "";
			html +=">";

			fieldCheckboxList.push(field);
		}
		else if(select && !disabled) {
			html  = $("#select-"+field).html();

			fieldSelectList.push(field);
		}
		else if(date) {
			var formattedDate = isEmpty(value) ? '' : (value.length == 8 ? fn_date_nodashToDash(value) : value);
			html = "<input type='date' class='form-control onfocus='this.showPicker()' ";
			html += align == "right" ? " text-right" : "";
			html += "' autocomplete='off' name='"+field+"' value='"+formattedDate+"' ";
			html += (!addonly && required) ? " required data-name='" + requiredField + "' " : "";
			html += (!addonly && readonly) ? " readonly " : "";
			html += (!addonly && disabled) ? " disabled " : "";
			html += " >";

			fieldDateList.push(field);
		}
		else if(month) {
			var formattedDate = isEmpty(value) ? '' : (value.length == 6 ? fn_date_nodashToDash(value) : value);
			html = "<input type='month' class='form-control";
			html += align == "right" ? " text-right" : "";
			html += "' autocomplete='off' name='"+field+"' value='"+formattedDate+"' ";
			html += (!addonly && required) ? " required data-name='" + requiredField + "' " : "";
			html += (!addonly && readonly) ? " readonly " : "";
			html += (!addonly && disabled) ? " disabled " : "";
			html += " >";

			fieldMonthList.push(field);
		}
		else if(textarea) {
			html =  "<textarea class='form-control' rows='" + textareaRows;
			html += "' ";
			html += "name='"+field+"' "
			html += (!addonly && required) ? " required data-name='" + requiredField + "' " : "";
			html += (!addonly && readonly) ? " readonly " : "";
			html += (!addonly && disabled) ? " disabled " : "";
			html += ">" + value;
			html += "</textarea>";

			fieldTextAreaList.push(field);
		}
		else {
			if(rn) {
				value = row.getPosition() + 1;
			}
			html = "<input type='text' class='form-control";
			html += align == "right" ? " text-right" : "";
			html += "' autocomplete='off' name='"+field+"' value='"+value+"' ";
			html += (!addonly && required) ? " required data-name='" + requiredField + "' " : "";
			html += readonly ? " readonly " : "";
			html += disabled ? " disabled " : "";
			html += " >";
			if(!addonly && popup) {
				html += "<button type='button' class='btn-search' data-toggle='modal' data-target='#" + popupId +
						"'><img src='/images/btn-search.png' alt='검색'></button>";
			}
			if(!disabled){
				fieldTextList.push(field);
			}
		}

		$($(ele).children()[i]).html(html);
		if(select) {
			$("select[name="+field+"]").prop("disabled", false);
			$($("select[name="+field+"]")[1]).prop("disabled", "disabled");
			$($("select[name="+field+"]")[0]).prop("id", field);
			$("#"+field).val(value);
			$($("#"+field)).prop("required", required);
			$($("#"+field)).attr("data-name", requiredField);
		}
	}

	$("input").on("click", function(e){
		e.stopPropagation();
	});

	document.getElementById("btn"+id).addEventListener("click", function(){
		if(!validate(id)) {
			return;
		}

		var data = {};

		for(var i=0; i<fieldTextList.length; i++) {
			data[fieldTextList[i]] = $.trim($("input[name="+fieldTextList[i]+"]").val());
		}
		for(var i=0; i<fieldDateList.length; i++) {
			var dateValue = $("input[name="+fieldDateList[i]+"]").val();
			data[fieldDateList[i]] = $.trim(isEmpty(dateValue) ? '' : (dateValue.length != 8 ? fn_date_dashToNodash(dateValue) : dateValue));
		}
		for(var i=0; i<fieldMonthList.length; i++) {
			var dateValue = $("input[name="+fieldMonthList[i]+"]").val();
			data[fieldMonthList[i]] = $.trim(isEmpty(dateValue) ? '' : (dateValue.length != 6 ? fn_date_dashToNodash(dateValue) : dateValue));
		}
		for(var i=0; i<fieldCheckboxList.length; i++) {
			data[fieldCheckboxList[i]] = $("input[name="+fieldCheckboxList[i]+"]").is(":checked") ? "Y" : "N";
		}
		for(var i=0; i<fieldSelectList.length; i++) {
			data[fieldSelectList[i]] = $.trim($("select[name="+fieldSelectList[i]+"]").val());
		}
		for(var i=0; i<fieldInvisibleList.length; i++) {
			data[fieldInvisibleList[i]] = $.trim($(ele).find("div[tabulator-field="+fieldInvisibleList[i]+"]").text());
		}
		for(var i=0; i<fieldTextAreaList.length; i++) {
			data[fieldTextAreaList[i]] = $("textarea[name="+fieldTextAreaList[i]+"]").val();
		}

		data.type = "U";
		fn_save(data, tableId);
	});
}

function tt_stop_propagation(e, row){
	if(row.getElement().children.length > 0 && (row.getElement().children[0].tagName == "INPUT" || row.getElement().children[0].tagName == "BUTTON")){
		e.stopPropagation();
	}
}

function tt_virtualDom_Height(tableId) {
	const findTable = Tabulator.prototype.findTable("#" + tableId);

	if(findTable.length == 0) return;
	var headerHeight = "calc(100% - " + $(findTable[0].element).find(".tabulator-header").height() + "px)";

	$(findTable[0].element).find(".tabulator-tableHolder").css("min-height", headerHeight).css("height", headerHeight).css("max-height", headerHeight);

}

function customHeader(cell, formatterParams, onRendered){
    return "<div class='customHeader'><span class='req'>" + cell.getValue();  +"</span></div>";
};

//tabulator bottomCalc sum format함수
var fn_sum_format = function(values, data, calcParams){

  var calc = BigInt('0');

  values.forEach(function(value){
  	if(!isEmpty(value)){
	    	calc = calc + BigInt(exRound(value,0));
  	}
  });

  return setComma(calc+"");
}

function fn_context_pause() {
	$(".tabulator-header .tabulator-col").off("mouseup");
}

//tabulator 헤더에 우클릭시 Context Menu 표시하여 필터기능 수행 / filter기능 추가
function fn_context_init() {
	$(".tabulator-header .tabulator-col").off("mouseup").on("mouseup", function(e) {

		//우클릭 여부 체크
		const is_right_click = (event.which ==3) || (event.button ==2) ? true : false;
		//클릭한 필드명
		var id = $(this).attr("tabulator-field");
		//클릭한 테이블 id
		var table = $(this).parents("div.tabulator").attr("id");
		//클릭한 헤더 타이틀
		var title = $(this).text();
		//우클릭이고 수정,삭제가 아닐경우 실행
		if(is_right_click && id != "edit" && id != "del" && !isEmpty(id)) {
			//context 생성 함수 호출
			fn_context_create(e,id,table,title,"");
		}
	});
	//filter기능 추가 2023.08.08 CYU
	$(".filter_box .add-filter-box").off("click").on("click", function(e) {
    	e.stopPropagation();
		if($(e.target).hasClass('add_filter_a')) {
			return;
		}
		var target = $(e.currentTarget).attr('id').split('_');
		//클릭한 필드명
		var id = target[3];
		//클릭한 테이블 id
		var table = target[2];
		//클릭한 헤더 타이틀
		var title = $(this).children().first().text();

		console.log(e + id + table + title);
		//context 생성 함수 호출
		fn_context_create(e,id,table,title,"add");
	});
}
//context 생성 함수
var fn_context_create = (e,id,table,title,type) => {

	 const ctxMenu = document.getElementById('select_context_menu');
	 const ctxMenuNav = document.getElementById('select_context_menu_nav');
     const search = document.getElementById("context-search");
     const btn = document.getElementById("context-btn");
     const addFilter = document.getElementById("add_filter_"+table+"_"+id);

	    // Context Menu 생성
	    function handleCreateContextMenu(event){
		      // 기본 Context Menu가 나오지 않게 차단
			window.oncontextmenu = function () {
				return false;
			}

			//Context Menu 타이틀 표시
			$('#context-title').empty();
			$('#context-title').text(title);
		    // 노출 설정
		    ctxMenu.style.display = 'block';
			//Context Menu가 화면 길이를 넘을 경우 길이 반전하여 표시
		    var revWidth = 0;
		    if(screen.width - 220 < event.pageX) {
		      	revWidth = 220;
		    }
		    // 위치 설정
		    if(type !== "add"){
			    ctxMenu.style.top = event.pageY+'px';
			    ctxMenu.style.left = (event.pageX - revWidth)+'px';
		    } else {
			    ctxMenu.style.top = (addFilter.getBoundingClientRect().top+ window.pageYOffset + 40 ) +'px';
			    ctxMenu.style.left = addFilter.getBoundingClientRect().left+'px';
		    }

		    //해당 필드 데이터목록 ul생성
			$('#context-select').empty();
			$('#select_context_menu_nav ul').empty();
			$('#context-btn-box').removeClass('hidden');
			search.value = "";
			var list = [];

			const findTable = Tabulator.prototype.findTable("#" + table);
			const data = findTable[0].getData("active");

			for(var key in data) {
				for(var name in data[key]) {
					if(name == id) {
						if(!isEmpty(data[key][name])){
							list.push(data[key][name]);
						}
					}
				}
			}
			//중복제거
			list = list.filter((element, index) => {
			    return list.indexOf(element) === index;
			});
			if(list.length > 0) {
				//목록을 html(li)로 바인딩 한다.
				for(var key in list) {
					$('#select_context_menu_nav ul').append('<li>'+ list[key] +'</li>');
				}
				//div에 추가
			    $('#context-select').append($('#select_context_menu_nav').html());
				//필터제거 버튼 이벤트 초기화/설정
			    $('#context-reset-btn').removeAttr('onclick');
			    $('#context-reset-btn').attr('onclick','fn_context_filter("'+table+'","'+id+'","")');

			    //input에 값 입력시 해당내역과 비교하여 입력값을 포함하는 목록만 div에 표시 - 대소문자 구분 x
			    $('#context-search').off("input").on("input", (e) => {
			    	$('#context-select').find("li").each(function(){
			    		if($(this).text().toUpperCase().includes($('#context-search').val().toUpperCase())) {
			    			$(this).removeClass("hidden");
			    		} else {
			    			$(this).addClass("hidden");
			    		}
			    	});
			    })
				//목록 클릭시 해당값을 input에 바인딩
			    $('#context-select').find("li").off("click").on("click", (e) => {
			    	e.stopPropagation();

			    	var value = $(e.target).text();

			    	if(value.length > 20) {

			    		value = value.substring(0,20);
			    	}
			    	$('#context-search').val(value);
			    	$('#context-search').focus();
			    })
			}
	    }

	    // Context Menu 제거
	    //해당이벤트 존재시 초기화
	    if(document.handleClearContextMenu){
	   	  document.removeEventListener('click', document.handleClearContextMenu, false);
	    }
	    //함수 호출
	    document.handleClearContextMenu = (event) => {

		   	if(event.target.id == "context-search" || event.target.id == "context-select") {
		   		  return false;
		   	}
		    // 노출 초기화
		    ctxMenu.style.display = 'none';
		    ctxMenu.style.top = null;
		    ctxMenu.style.left = null;
			//input 초기화
		    search.value = "";

	    	ctxMenuNav.style.display = 'none';
	    	ctxMenuNav.style.top = null;
	    	ctxMenuNav.style.left = null;
			$('#select_context_menu_nav ul').empty();

			//기존 Context Menu 이벤트 살리기
			window.oncontextmenu = function () {
				return true;
			}
	    }

	    //엔터 누를시 이벤트
	    if(search.searchClick){
	     search.removeEventListener("keypress",search.searchClick);
	    }
	    search.searchClick = (event) => {

			const textInput = event.key;

			if( textInput == "Enter" ) {
				btn.click();
			}
	    }

	    //검색 버튼클릭시 이벤트
	    if(btn.btnClick){
	   	  btn.removeEventListener("click",btn.btnClick);
	    }

	    btn.btnClick = () => {
	   	  fn_context_filter(table,id,search.value);

	    }

	    // 이벤트 바인딩
	    search.addEventListener("keypress",search.searchClick);
	    document.addEventListener('click', document.handleClearContextMenu, false);
	    btn.addEventListener("click",btn.btnClick);

	    handleCreateContextMenu(e);
	setTimeout(function(){ search.focus();}, 50);
}
//filter내역을 담을 array선언
var filterList = new Array();
//필터 적용시 호출되는 함수
function fn_context_filter(tableId,id,val) {
	const findTable = Tabulator.prototype.findTable("#" + tableId);

	var json = new Object();
	//첫 호출이거나 같은 테이블 같은 필드에 대해 필터적용이 아닌경우
	if(filterList.length == 0 || !filterList.find((item,index) => {return item.table === tableId && item.field === id})) {
		//빈값이 아닌경우 filterList에 json형태로 필터내역을 담는다.
		if(!isEmpty(val)) {
			json.table = tableId;
			json.field = id;
			json.type = "like";
			json.value = val;

			filterList.push(json);
			//필터 적용된 필드는 테이블 헤더 타이틀을 빨간색으로 표시한다.
		   	$("#"+ tableId +" .tabulator-headers").find("div[tabulator-field="+ id +"]").find(".tabulator-col-title").css("color", "red");
		}
		//빈값일 경우 리턴한다.
		else {
			return false;
		}
	}
	//존재하는 필터내역인 경우
	else {
		for(var index in filterList) {
			if(filterList[index].table === tableId && filterList[index].field === id) {
				//filterList에서 해당 내역을 제거한다.
				filterList.splice(index,1);
				//빈값이 아닌경우 filterList에 json형태로 필터내역을 담는다.
				if(!isEmpty(val)) {
					json.table = tableId;
					json.field = id;
					json.type = "like";
					json.value = val;

					filterList.push(json);
				   	$("#"+ tableId +" .tabulator-headers").find("div[tabulator-field="+ id +"]").find(".tabulator-col-title").css("color", "red");
				   	break;
				}
				//빈값일 경우 테이블 헤더 타이틀에 필터 적용표시를 해제한다.
				else {
				   	$("#"+ tableId +" .tabulator-headers").find("div[tabulator-field="+ id +"]").find(".tabulator-col-title").css("color", "#333");
				   	break;
				}
			}
		}
	}
	//해당 테이블의 필터 내역만 바인딩한다.
	var fList = filterList.filter(item => item.table === tableId);

	//연산자 비교
	var compare = {

	    '=': function(a, b) { return a == b; },
	    '<': function(a, b) { return a < b; },
	    '<=': function(a, b) { return a <= b; },
	    '>': function(a, b) { return a > b; },
	    '>=': function(a, b) { return a >= b; },
	    '!=': function(a, b) { return a != b; },
	    'like': function(a, b) {
	    	a = (typeof a != "undefined" && a != null) ? a.replaceAll(/[,-]/g,"") : "";
	    	return a.includes(b.replaceAll(/[,-]/g,""));
	    	}
	};

	//Tree 여부 파악후 결과를 리턴한다.
	var filterTree = function (data, filter) {
		if(filter.length > 0) {
		  	for (var j in filter) {
		  		//tree 하위 단계일 경우
			    if (data['_children'] && data['_children'].length > 0) {
			    	var chk = false;
			        for (var i in data['_children']) {

						if(compare[filter[j].type](data[filter[j].field], filter[j].value) || filterTree(data['_children'][i], filter[j])) {
							chk =true;
						}
			        }
			        return chk;
			    }
			    else if(j == "table") {
			    	return compare[filter.type](data[filter.field], filter.value);
			    }
				    return compare[filter[j].type](data[filter[j].field], filter[j].value);
		      }
		} else {

			return compare[filter.type](data[filter.field], filter.value);
		}
	};

	//tabulator 필터 함수에 적용
	if(fList.length > 0) {
		//해당 테이블 필터 초기화
		findTable[0].clearFilter();
		$('#add_filter_'+ tableId + '_' + id +' .add-filter-value').text("");

		for(var i in fList) {
			var arr = [];
			arr.push(fList[i]);
			//해당 테이블에 적용한 필터를 추가한다.
			findTable[0].addFilter(filterTree, arr);
		}
		//필터 초기화 버튼 활성화
		$('#btn_reset_filter_'+tableId).removeClass("hidden");
		//필터박스가 없는경우 필터박스생성
		if($('#add_filter_'+ tableId + '_' + id).length == 0) {
			//추가 필터 생성함수
			add_filter_box_create($("#"+ tableId +" .tabulator-headers div[tabulator-field="+ id +"]").find(".tabulator-col-title").text(),tableId,id,val);
		} else {
			//필터에 값표시
			if(val.length !== 0) $('#add_filter_'+ tableId + '_' + id +' .add-filter-value').text(" : "+val);
		}
		$('button#btn_save_filter').attr('disabled', false);
	} else {
		findTable[0].setFilter();
		$('#add_filter_'+ tableId + '_' + id +' .add-filter-value').text("");
		$('#btn_save_filter').attr('disabled',true);
	}
}

//초기화
function fn_reset_filter(tableId){
	if(tableId == "ALL") {

		$('div.table-scroll-area.tabulator').each((index, item) => {
			const findTable = Tabulator.prototype.findTable("#" + $(item).attr('id'));
			findTable[0].clearFilter();
		})
		$(".tabulator .tabulator-headers").find(".tabulator-col-title").css("color", "#333");
		$('.btn_reset_filter').addClass("hidden");
		$('#btn_save_filter').attr('disabled',true);
		$('div.filter_box').empty();
		filterList = [];
	} else {
		const findTable = Tabulator.prototype.findTable("#" + tableId);
		findTable[0].clearFilter();
		$('#btn_reset_filter_'+tableId).addClass("hidden");
		$('#btn_save_filter').attr('disabled',true);
		$("#"+ tableId +" .tabulator-headers").find(".tabulator-col-title").css("color", "#333");
		$('div#filter_box_'+tableId).empty();

		for(var index = filterList.length-1;index >= 0;index--) {
			if(filterList[index].table === tableId) {
				//filterList에서 해당 내역을 제거한다.
				filterList.splice(index,1);
			}
		}
	}
}


$(".btn_add_filter").off("click").on("click", function(e) {
	e.stopPropagation();
	var table = $(this).attr("id").split('_')[3];

	var list = new Array();
	//화면에 표시된 해당 목록만..
	$("#"+ table +" .tabulator-headers").find("div.tabulator-col").each(function(i,item){
		var field = $(this).attr('tabulator-field');
		var name = $(this).find('.tabulator-col-title').text();
		if(field)
		if($(this).attr('style').indexOf('display: none;') === -1) { //field.indexOf('edit') === -1 && field.indexOf('del') === -1
			var obj = {
					"filed" : field,
					"name" : name,
					"check" : $('#add_filter_'+ table +'_'+field).length !== 0 ? "check" : "",
			};
			list.push(obj);
		}
	});

    const ctxMenu = document.getElementById('select_context_menu');
    const addFilter = document.getElementById('btn_add_filter_' + table);
    
	//Context Menu 타이틀 표시
	$('#context-title').empty();
	$('#context-title').text("필터 검색");
    // 노출 설정
    ctxMenu.style.display = 'block';
    // 위치 설정
    ctxMenu.style.top = (addFilter.getBoundingClientRect().top+ window.pageYOffset + 40 ) +'px';
    ctxMenu.style.left = addFilter.getBoundingClientRect().left+'px';

	$('#context-select').empty();
	$('#select_context_menu_nav ul').empty();
	$('#context-btn-box').addClass('hidden');

	if(list.length > 0) {
		//목록을 html(li)로 바인딩 한다.
		for(var key in list) {
			$('#select_context_menu_nav ul').append('<li class="'+ list[key].check +'" id="'+ list[key].filed +'">' + list[key].name +'</li>');
		}
		//div에 추가
	    $('#context-select').append($('#select_context_menu_nav').html());

	    //input에 값 입력시 해당내역과 비교하여 입력값을 포함하는 목록만 div에 표시 - 대소문자 구분 x
	    $('#context-search').off("input").on("input", (e) => {
	    	$('#context-select').find("li").each(function(){
	    		if($(this).text().toUpperCase().includes($('#context-search').val().toUpperCase())) {
	    			$(this).removeClass("hidden");
	    		} else {
	    			$(this).addClass("hidden");
	    		}
	    	});
	    })
		//목록 클릭시 해당값을 input에 바인딩
	    $('#context-select').find("li").off("click").on("click", (e) => {
	    	e.stopPropagation();
			const addId = $(e.target).attr("id");
			if($('#add_filter_'+ table + '_' + addId).length == 0) {
				//추가 필터 생성함수
				add_filter_box_create($(e.target).text(),table,addId,"");
				$('#btn_reset_filter_'+table).removeClass("hidden");
				$('#select_context_menu').find('li#'+addId).addClass("check");
			} else {
				//필터 삭제
				fn_del_add_filter(table,addId);
				//필터 초기화 버튼 비활성화
				if($('div#filter_box_'+table+' div').length == 0) {
					$('#btn_reset_filter_'+table).addClass("hidden");
				}
				$('#select_context_menu').find('li#'+addId).removeClass("check");
			}
	    })
	}
	$('html').off("click").on("click", (e) =>{
		if(!$(e.target).hasClass('btn_add_filter') && !$(e.target).hasClass('add-filter-box')) {
			console.log("hi");
		    ctxMenu.style.display = 'none';
		    ctxMenu.style.top = null;
		    ctxMenu.style.left = null;
		    $('html').off("click");
		}
	});
});
function fn_del_add_filter(tableId,id) {
	fn_context_filter(tableId,id,"");
	$('#add_filter_'+ tableId + '_' + id).remove();

	//필터 초기화 버튼 비활성화
	if($('div#filter_box_'+ tableId + ' div').length == 0) {
		$('#btn_reset_filter_'+tableId).addClass("hidden");
	}
	$('#select_context_menu').find('li#'+id).removeClass("check");

}
//추가 필터 생성함수
const add_filter_box_create = (title,tableId,id,val) => {
	val = val.length !== 0 ? " : " + val : "";
	var html = `<div class="d-inline-flex"><div>` + title + `</div><div class="add-filter-value ms-1">` + val + `</div><a class="add_filter_a ms-2" style="padding-right:8px;" href="javascript:fn_del_add_filter('`+ tableId +`','`+ id+`');"> x</a></div>`;
	$('div#filter_box_'+ tableId).append(
	        $('<div>').prop({
	            id: 'add_filter_'+ tableId + '_' +id,
	            innerHTML: html,
	            className: 'add-filter-box mr-2 mt-1',
	            style : `
//	            		float: left;
				        border: 1px solid #ddd;
				        padding: 0 0 0 8px;
				        background: #f4f4f4;
				        height: 24px;
				        line-height: 23px;
	            		cursor: pointer;
//	        			max-width: 200px;
//	            		white-space: nowrap;
//	            		overflow: hidden;
//	            		text-overflow: ellipsis;
	            		`
	        })
	);
	fn_context_init();
}

function tt_required_title(title){
	return "<em style='color:red;'>*</em>" + title; 
}