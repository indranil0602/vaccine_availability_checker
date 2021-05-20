/********************************************
    DEVELOPER:  INDRANIL PAL
    E-MAIL:     indranil.pal.0602@gmail.com
*********************************************/

var flag = false;

function fetchStateCodes() {
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
                //console.log(stateRes);
                createStateOption(stateRes);
            }
        }
        flag = true;
    }
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
            //console.log(distRes);
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
        selectDist.appendChild(distOption);
    }
}

function getDistrictCode() {
    var distCode = document.getElementById("districts");
    var districtId = distCode.options[distCode.selectedIndex].value;
    var dt = document.getElementById("dateDist").value + "";
    var date = dt.substring(8) + "-" + dt.substring(5, 7) + "-" + dt.substring(0, 4);
    var distsrictUrl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + districtId +
                        "&date=" + date;
    //console.log(distsrictUrl);
    fetchDistResponse(distsrictUrl);
}

function fetchDistResponse(distsrictUrl){
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
            //console.log(sessionRes);
            createDistTable(sessionRes);
        }
    }
}

function createDistTable(res) {
    var container = document.querySelector('#container');

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    var dispSection = document.getElementById("container");

    var tbl = document.createElement('table');
    tbl.style.backgroundColor = "#EEE2DC";
    tbl.style.fontSize = "small";
    tbl.style.tableLayout = "fixed";
    tbl.style.width = "100%";
    tbl.setAttribute('border-bottom', '1');

    var tbdy = document.createElement('tbody');

    if (res.sessions.length == 0) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.style.padding = "1% 2% 1% 2%";
        td.style.textAlign = 'left';
        var msg = "No information available";
        td.appendChild(document.createTextNode(msg));
        tr.appendChild(td);
        tbdy.appendChild(tr);
    } else {
        for (var i = 0; i < res.sessions.length; i++) {
            var tr = document.createElement('tr');
            var borderColor;
            if (i % 2 == 0) { 
                tr.style.backgroundColor = "#EEE2DC";
                borderColor = "#EEE2DC";
            } else { 
                tr.style.backgroundColor = "#EDC7B7";
                borderColor = "#EDC7B7";
            }
            tr.style.borderBottom = "1px solid #123C69";
            for (var j = 0; j < 4; j++) {
                var td = document.createElement('td');
                td.style.padding = "0.8% 1.5% 0.8% 1.5%";
                td.style.textAlign = 'left';
                if (j == 0) {
                    var div_name = document.createElement('div');
                    div_name.appendChild(document.createTextNode(res.sessions[i].name));
                    div_name.style.fontWeight = "bold";
                    td.appendChild(div_name);
                    var div_addr = document.createElement('div');
                    var addr = (res.sessions[i].address).trim();
                    div_addr.appendChild(document.createTextNode(addr));
                    div_addr.style.fontSize = "small";
                    td.appendChild(div_addr);
                    var div_loc = document.createElement('div');
                    var loc = res.sessions[i].district_name + ", " + res.sessions[i].state_name + ", " + res.sessions[i].pincode;
                    div_loc.appendChild(document.createTextNode(loc));
                    td.appendChild(div_loc);
                } else if (j == 1) {
                    div_date = document.createElement('div');
                    div_date.style.fontWeight = "bold";
                    res_date = res.sessions[i].date;
                    div_date.appendChild(document.createTextNode(res_date));
                    td.appendChild(div_date);

                    var div_vaccine = document.createElement('div');
                    var vaccine = res.sessions[i].vaccine;
                    div_vaccine.appendChild(document.createTextNode(vaccine));
                    td.appendChild(div_vaccine);

                    var div_price = document.createElement('div');
                    var price;
                    if (res.sessions[i].fee_type == "Free") {
                        price = res.sessions[i].fee_type;
                        div_price.appendChild(document.createTextNode(price));
                        div_price.style.backgroundColor = "#123C69";
                        div_price.style.color = "white";
                        div_price.style.marginRight = "85%";
                        div_price.style.textAlign = "center";
                    } else {
                        price = res.sessions[i].fee_type + " : Rs " + res.sessions[i].fee;
                        div_price.appendChild(document.createTextNode(price));
                        div_price.style.backgroundColor = "#AC3B61";
                        div_price.style.color = "white";
                        div_price.style.marginRight = "67%";
                        div_price.style.textAlign = "center";
                    }
                    td.appendChild(div_price);
                } else if (j == 2) {
                    div_dose = document.createElement('div');
                    div_dose.style.width = "60%";
                    div_dose.style.display = "table";

                    div_dose1 = document.createElement('div');
                    div_dose1.style.display = "table-row";

                    div_dose1_dose = document.createElement('div');
                    div_dose1_dose.style.display = "table-cell";
                    div_dose1_dose.style.width = "15%";
                    var dose1 = 'Dose : 1';
                    div_dose1_dose.appendChild(document.createTextNode(dose1));
                    
                    div_dose1_stat = document.createElement('div');
                    div_dose1_stat.style.display = "table-cell";
                    div_dose1_stat.style.textAlign = "center";
                    div_dose1_stat.style.width = "60%";
                    var stat1;
                    if (res.sessions[i].available_capacity_dose1 == 0) {
                        var stat1 = 'Booked';
                        div_dose1_stat.style.backgroundColor = "#AC3B61";
                        div_dose1_stat.style.color = "white";
                        div_dose1_stat.style.marginRight = "72%";
                    } else {
                        stat1 = 'Available ' + res.sessions[i].available_capacity_dose1;
                        div_dose1_stat.style.backgroundColor = "#123C69";
                        div_dose1_stat.style.color = "white";
                    }
                    div_dose1_stat.style.border = "1px solid " + borderColor;
                    div_dose1_stat.appendChild(document.createTextNode(stat1));   
                    
                    div_dose1.appendChild(div_dose1_dose);
                    div_dose1.appendChild(div_dose1_stat);
                    div_dose.appendChild(div_dose1);                                //dose 1 completed

                    div_dose2 = document.createElement('div');
                    div_dose2.style.display = "table-row";

                    div_dose2_dose = document.createElement('div');
                    div_dose2_dose.style.display = "table-cell";
                    div_dose2_dose.style.width = "30%";
                    var dose2 = 'Dose : 2';
                    div_dose2_dose.appendChild(document.createTextNode(dose2));

                    div_dose2_stat = document.createElement('div');
                    div_dose2_stat.style.display = "table-cell";
                    div_dose2_stat.style.textAlign = "center";
                    div_dose2_stat.style.width = "50%";
                    var stat2;
                    if (res.sessions[i].available_capacity_dose2 == 0) {
                        var stat2 = 'Booked';
                        div_dose2_stat.style.backgroundColor = "#AC3B61";
                        div_dose2_stat.style.color = "white";
                        div_dose2_stat.style.marginRight = "72%";
                    } else {
                        stat2 = 'Available ' + res.sessions[i].available_capacity_dose2;
                        div_dose2_stat.style.backgroundColor = "#123C69";
                        div_dose2_stat.style.color = "white";
                    }
                    div_dose2_stat.style.border = "1px solid " + borderColor;
                    div_dose2_stat.appendChild(document.createTextNode(stat2));   
                    
                    div_dose2.appendChild(div_dose2_dose);
                    div_dose2.appendChild(div_dose2_stat);
                    div_dose.appendChild(div_dose2);

                    td.appendChild(div_dose);
                    td.appendChild(document.createTextNode("Age : " + res.sessions[i].min_age_limit + "+"));
                } else {
                    var div_time = document.createElement('div');
                    div_time.style.textAlign = "center";
                    div_time.style.border = "1.5px solid #123C69";
                    div_time.style.marginRight = "55%";
                    div_time.style.padding = "0.3% 1% 0.3% 1%";
                    var timing = res.sessions[i].from + " - " + res.sessions[i].to;
                    div_time.appendChild(document.createTextNode(timing));
                    td.appendChild(div_time);

                    for (var k = 0; k < res.sessions[i].slots.length; k+= 2) {
                        var div = document.createElement('div');
                        div.appendChild(document.createTextNode(res.sessions[i].slots[k] + " " 
                                                                + res.sessions[i].slots[k + 1]));
                        td.appendChild(div);
                    }
                }
                tr.appendChild(td);
            }
            tbdy.appendChild(tr);
        }
    }
    tbl.appendChild(tbdy);
    dispSection.appendChild(tbl);
    dispSection.style.visibility = "visible";
}

