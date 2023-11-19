var messages;
var contextPath = "/pda";

if (typeof langUse === 'undefined') {
	langUse = 'Y';
}

function fnIsNull(obj) {
	return (typeof obj != "undefined" && obj != null && obj != "") ? false : true;
}


function applicationContextPath() {
    if (location.pathname.split('/').length > 1)
        return "/" + location.pathname.split('/')[1];
    else
        return "/";
}

//jQuery aJax 공통
function gCallAjax(){
	var o = {};

	
	o.url = "";
    o.type = "POST";
    o.async = true;
    o.param = "";
    o.dataType = "text";
    o.contentType = "application/json; charset=UTF-8";
    o.callback = "";
    
    this.setUrl = function setUrl(url){
    	o.url = url;
    };

    this.setType = function setType(type){
        o.type = type;
    };
    
    this.setAsync = function setAsync(async){
    	o.async = async;
    };
    
    this.setParam = function setParam(param){
    	o.param = JSON.stringify(param);
    	//o.param = param;
    };
    
    this.setDataType = function setDataType(dataType){
    	o.dataType = dataType;
    };
    
    this.setContentType = function setContentType(contentType){
    	o.contentType = contentType;
    };
    
    this.setCallback = function setCallback(callBack){
        o.callback = callBack;
    };
     
    console.log(o.param);
    this.call = function call(){
        $.ajax({
            url      	: o.url,   
            type     	: o.type,  
            async    	: o.async,
            data    	: o.param,
            dataType 	: o.dataType,
            contentType : o.contentType,
            beforeSend:function(data) {
            	
            },
            error: function (jqXHR, status, thrownError){
        		if (jqXHR.status == 403) {
        			alert("세션이 끊겼습니다. 로그인 후 다시 사용하세요.");
        			window.location.href="<c:url value='/login'/>";
        		} else {
        		    console.log(jqXHR.responseText);
        		    alert(jqXHR.responseText);
        		}            	
            },
            
            success : function(data, status) {
                if(typeof(o.callback) == "function"){
                	o.callback(data);
                }
                else {
                	(new Function(o.callback + "(data);"))();
                }
            }
        });
    };
    console.log(o.param);
}

//jQuery Ajax 공통
var ComAjax = function () {
    var f = {};
    var o = { $f:jQuery(f), type:"POST", async:true, dataType:"json", contentType:"application/json; charset=UTF-8"};
 
    f.url = function(url)
    {
        o.url = url;
        return f;
    };
 
    f.type = function(type)
    {
        o.type = type;
        return f;
    };
 
    f.async = function(async)
    {
        o.async = async;
        return f;
    };
 
    f.param = function(param)
    {
		//자바스크립트 값을 json문자열로 변경
		//{"NOTICE_TITLE":"제목", "NOTICE_CONTENT":"내용"} json형태로 변경
        o.param = JSON.stringify(param);
        return f;
    };
 
    f.dataType = function(dataType)
    {
        o.dataType = dataType;
        return f;
    };
 
    f.contentType = function(contentType)
    {
        o.contentType = contentType;
        return f;
    };
    
    this.setCallback = function setCallback(callBack){
        o.callback = callBack;
        return f;
    };
    
    f.before = function(before)
    {
        o.before = before;
        return f;
    };
 
    f.success = function(success)
    {
        o.success = success;
        return f;
    };
 
    f.call = function call(){
        $.ajax({
            url         : o.url,
            type        : o.type,
            async       : o.async,
            data        : o.param,
            dataType    : o.dataType,
            contentType : o.contentType,
            beforeSend:function() {
                if(!fnIsNull(o.before)){
                    if(typeof(o.before) == "function"){
                        o.before();
                    }
                    else {
                    	(new Function(o.before + "();"))();
                    }
                }
            },
            error: function (jqXHR, status, errorThrown){
        		if (jqXHR.status == 403) {
        			alert("세션이 끊겼습니다. 로그인 후 다시 사용하세요.");
        			window.location.href="<c:url value='/login'/>";
        		} else {
        		    console.log(jqXHR.responseText);
        		    alert(jqXHR.responseText);
        		}
            },
            success : function(data, status, xhr) {
                if(status == "success" && xhr.status == 200){
                    if(typeof(o.success) == "function"){
                        o.success(data);
                    }
                    else {
                    	(new Function(o.success + "(data);"))();
                    }
                }
            }
        });
    };
    return f;
};

//Message
//messageJs("msg.grid.id")
//messageJs("msg.com.text", "디펄트", [100,50])
//{#0}건 중 {#1} 건 수정하시겠습니까? {}에 각각 100, 50이 순차적으로 들어가서 출력된다.

var messageJs = function (code, defaultMsg, args) {
    var f = {};
    var o = {msg:""};
 
    var data;
	$(messages).each(function(key, value) {
		const obj = value
        if(obj.key == code) {
            console.log(code + ": " + obj.value);
            data = obj.value;
        }
	})

    o.msg = data;

    
    if(isNull(o.msg) && !isNull(defaultMsg)){
        o.msg = defaultMsg;
    }else{
        o.msg = code;
    }
 
    if(!isNull(args) && $.type(args) === "array"){
        args.forEach(function(val, idx){
            o.msg = o.msg.replace("{" + idx + "}", val);
            o.msg = o.msg.replace("{#" + idx + "}", val);
        });
    }
 
    return o.msg;
};

(function () {
	if(langUse == "Y") {
	    var ajax = new ComAjax();
	    if (lang == "")
	    	lang = 'ko'
	    var url = contextPath + '/retrieveMessage/' + lang;
	    
	    ajax.url(url);    
	    ajax.type("GET")
	    ajax.async(false);
	    ajax.success(function(data){
	        console.log(JSON.stringify(data));   	
	        messages = data;
	    });
	    ajax.call();
	}
}());

