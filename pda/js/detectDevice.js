document.addEventListener("DOMContentLoaded", initDetect)

function initDetect() {		
    window.addEventListener("resize", detectDevice)
    detectDevice()
}

detectDevice = () => {
	let deviceType;
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    	deviceType = "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    	deviceType = "mobile";
    }
    deviceType = "desktop";
	
    let detectDeviceObj = {
        device: deviceType,
        orientation: deviceType == 'desktop' ? 'desktop' : !window.screen.orientation.angle ? 'portrait' : 'landscape'
    }

    updateText(detectDeviceObj)
}

updateText = (detectDeviceObj) => {
    let h1Text = document.querySelector("#device");
    let h2Text = document.querySelector("#orientation");

    //console.log(detectDeviceObj.device);
    //console.log(detectDeviceObj.orientation);

    h1Text.value = detectDeviceObj.device;
    h2Text.value = detectDeviceObj.orientation;
}