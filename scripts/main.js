/********************************************
    DEVELOPER:  INDRANIL PAL
    E-MAIL:     indranil.pal.0602@gmail.com
*********************************************/

function makeDispNone() {
    var i, formcontent, tablinks;
    formcontent = document.getElementsByClassName("formcontent");
    for (i = 0; i < formcontent.length; i++) {
        formcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
}

function openCity(evt, cityName) {
    makeDispNone();
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function stopDivVisibility() {
    document.getElementById("container").style.visibility = "hidden";
    toggleFilterBtnPin(true); 
}

function toggleFilterBtnPin(state) {
    document.getElementById("filterBtn11").disabled = state;
    document.getElementById("filterBtn12").disabled = state;
    document.getElementById("filterBtn13").disabled = state;
    document.getElementById("filterBtn14").disabled = state;
    document.getElementById("filterBtn15").disabled = state;
    document.getElementById("filterBtn16").disabled = state;
}

function fetchPin() {
    var pin = document.getElementById("pin").value;
    var dt = document.getElementById("date").value + "";

    var date = dt.substring(8) + "-" + dt.substring(5, 7) + "-" + dt.substring(0, 4);   
    var finalUrl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" + pin + "&date=" + date;
    sendRequest(finalUrl);
}

var pinResponse;

function sendRequest(finalUrl, callback) {
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', finalUrl, true);
    xhr.send();
    xhr.onreadystatechange = processRequest;

    function processRequest(e) {
        if (xhr.status == 404) {
            alert("location not found");
        }
        if (xhr.readyState == 4 && xhr.status == 200) {
            var res = JSON.parse(xhr.responseText);
            pinResponse = res;
            createDistTable(res, true, true, true, true, true, true);
        }
    }
}

