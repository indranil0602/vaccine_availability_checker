/********************************************
    DEVELOPER:  INDRANIL PAL
    E-MAIL:     indranil.pal.0602@gmail.com
*********************************************/

var flag = false;

function fetchStateCodes() {
    toggleFilterBtn(true);
    document.getElementById("container").style.visibility = "hidden";

    if (!flag) {
        var stateUrl = "https://cdn-api.co-vin.in/api/v2/admin/location/states";

        var stateReq = new XMLHttpRequest();
        stateReq.open('GET', stateUrl, true);
        stateReq.send();
        stateReq.onreadystatechange = processRequest;

        function processRequest(e) {
            if (stateReq.status == 404) {
                alert("location not found");
            }
            if (stateReq.readyState == 4 && stateReq.status == 200) {
                var stateRes = JSON.parse(stateReq.responseText);
                createStateOption(stateRes);
            }
        }
        flag = true;
    }
}

function toggleFilterBtn(state) {
    document.getElementById("filterBtn21").disabled = state;
    document.getElementById("filterBtn22").disabled = state;
    document.getElementById("filterBtn23").disabled = state;
    document.getElementById("filterBtn24").disabled = state;
    document.getElementById("filterBtn25").disabled = state;
    document.getElementById("filterBtn26").disabled = state;
}

function createStateOption(stateRes) {
    var selectState = document.getElementById("states");
    for (var i = 0; i < stateRes.states.length; i++) {
        var stateOption = document.createElement('option');
        var id = stateRes.states[i].state_id;
        stateOption.setAttribute("id", id);
        stateOption.setAttribute("value", id);
        var stateName = stateRes.states[i].state_name;
        stateOption.appendChild(document.createTextNode(stateName));
        stateOption.style.backgroundColor = "white";
        stateOption.style.width = "20%";
        stateOption.style.marginRight = "5%";
        selectState.appendChild(stateOption);
    }
}

function fetchDistrict() {
    var stateCode = document.getElementById("states");
    var code = stateCode.options[stateCode.selectedIndex].value;
    var distsUrl = "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + code;
    fetchDistrictCode(distsUrl);
}

function fetchDistrictCode(distsUrl, callback) {
    var distReq = new XMLHttpRequest();
    distReq.open('GET', distsUrl, true);
    distReq.send();
    distReq.onreadystatechange = processRequest;

    function processRequest(e) {
        if (distReq.status == 404) {
            alert("location not found");
        }
        if (distReq.readyState == 4 && distReq.status == 200) {
            var distRes = JSON.parse(distReq.responseText);
            createDistOption(distRes);
        }
    }
}

function createDistOption(distRes) {
    var selectAttrib = document.querySelector('#districts');
    while (selectAttrib.firstChild) {
        selectAttrib.removeChild(selectAttrib.firstChild);
    }
    var selectDist = document.getElementById("districts");
    for (var i = 0; i < distRes.districts.length; i++) {
        var distOption = document.createElement('option');
        var id = distRes.districts[i].district_id;
        distOption.setAttribute("id", id);
        distOption.setAttribute("value", id);
        var distName = distRes.districts[i].district_name;
        distOption.appendChild(document.createTextNode(distName));
        distOption.style.backgroundColor = "white";
        distOption.style.width = "20%";
        distOption.style.marginRight = "5%";
        selectDist.appendChild(distOption);
    }
}

function getDistrictCode() {
    var distCode = document.getElementById("districts");
    var districtId = distCode.options[distCode.selectedIndex].value;
    var dt = document.getElementById("dateDist").value + "";
    var date = dt.substring(8) + "-" + dt.substring(5, 7) + "-" + dt.substring(0, 4);
    var distsrictUrl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + 
                        districtId + "&date=" + date;
    //console.log(distsrictUrl);
    fetchDistResponse(distsrictUrl);
}

var flag18to44 = true;
var flag45plus = true;
var flagFree = true;
var flagPaid = true;
var flagCovaxin = true;
var flagCovishild = true;

function fetchDistResponse(distsrictUrl){
    flag18to44 = true;
    flag45plus = true;
    flagFree = true;
    flagPaid = true;
    flagCovaxin = true;
    flagCovishild = true;

    toggleFilterBtn(false);

    var sessionReq = new XMLHttpRequest();
    sessionReq.open('GET', distsrictUrl, true);
    sessionReq.send();
    sessionReq.onreadystatechange = processRequest;

    function processRequest(e) {
        if (sessionReq.status == 404) {
            alert("location not found");
        }
        if (sessionReq.readyState == 4 && sessionReq.status == 200) {
            var sessionRes = JSON.parse(sessionReq.responseText);
            distResponse = sessionRes;
            createDistTable(sessionRes, true, true, true, true, true, true);
        }
    }
}