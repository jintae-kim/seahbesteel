function fn_expandAll(id) {
	$("#"+id).treegrid("expandAll");
}

function fn_collapseAll(id) {
	$("#"+id).treegrid("collapseAll");
}

function tg_convertCheckBox(value, id) {
	var checkyn = value == "Y" ? "checked" : "";
	
	var check = "<input type='checkbox' id='" + id + "' class='form-check-input' name='"
		+ id + "' " + checkyn +" >";
	
	return check;
}

function tg_convertCheckBoxNumber(value, id) {
	var checkyn = value == "1" ? "checked" : "";
	
	var check = "<input type='checkbox' id='" + id + "' class='form-check-input' name='"
		+ id + "' " + checkyn +" >";
	
	return check;
}

function fn_sortList(list, base, type) {
	  return list.sort(function(a, b) {
		  if(type == "asc") {
			  return b[base] - a[base];
		  }
		  else if(type == "desc") {
			  return a[base] - b[base];
		  }
	  });
} 