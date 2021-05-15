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

function fetchPin() {
    var pin = document.getElementById("pin").value;
    var dt = document.getElementById("date").value + "";

    var date = dt.substring(8) + "-" + dt.substring(5, 7) + "-" + dt.substring(0, 4);
    console.log(date);
    
    var finalUrl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" + pin + "&date=" + date;
    console.log(finalUrl);
    sendRequest(finalUrl);
}

function sendRequest(finalUrl, callback) {
    document.getElementById("err_msg").style.visibility = "hidden";
    document.getElementById("container").style.visibility = "visible";               

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
            console.log(res);
            tableCreate(res);
        }
    }
}

function tableCreate(res) {
    var container = document.querySelector('#container');

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    var tbl = document.createElement('table');
    tbl.style.backgroundColor = "#EEE2DC";
    tbl.style.fontSize = "small";
    tbl.style.tableLayout = "fixed";
    tbl.style.width = "100%";
    tbl.setAttribute('border-bottom', '1');

    var tbdy = document.createElement('tbody');

    if (res.centers.length == 0) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.style.padding = "1% 2% 1% 2%";
        td.style.textAlign = 'left';
        var msg = "No information available";
        td.appendChild(document.createTextNode(msg));
        tr.appendChild(td);
        tbdy.appendChild(tr);
    } else {
        for (var i = 0; i < res.centers.length; i++) {
            var tr = document.createElement('tr');
            tr.style.borderBottom = "1px solid #123C69";
            for (var j = 0; j < 4; j++) {
                var td = document.createElement('td');
                td.style.padding = "0.8% 1.5% 0.8% 1.5%";
                td.style.textAlign = 'left';
                if (j == 0) {
                    var div_name = document.createElement('div');
                    div_name.appendChild(document.createTextNode(res.centers[i].name));
                    div_name.style.fontWeight = "bold";
                    td.appendChild(div_name);
                    var div_addr = document.createElement('div');
                    var addr = (res.centers[i].address).trim();
                    div_addr.appendChild(document.createTextNode(addr));
                    div_addr.style.fontSize = "small";
                    td.appendChild(div_addr);
                    var div_loc = document.createElement('div');
                    var loc = res.centers[i].district_name + ", " + res.centers[i].state_name + ", " + res.centers[i].pincode;
                    div_loc.appendChild(document.createTextNode(loc));
                    td.appendChild(div_loc);
                } else if (j == 1) {
                    div_date = document.createElement('div');
                    div_date.style.fontWeight = "bold";
                    res_date = res.centers[i].sessions[0].date;
                    div_date.appendChild(document.createTextNode(res_date));
                    td.appendChild(div_date);

                    var div_vaccine = document.createElement('div');
                    var vaccine = res.centers[i].sessions[0].vaccine;
                    div_vaccine.appendChild(document.createTextNode(vaccine));
                    td.appendChild(div_vaccine);

                    var div_price = document.createElement('div');
                    var price;
                    if (res.centers[i].fee_type == "Free") {
                        price = res.centers[i].fee_type;
                        div_price.appendChild(document.createTextNode(price));
                        div_price.style.backgroundColor = "#123C69";
                        div_price.style.color = "white";
                        div_price.style.marginRight = "87%";
                        div_price.style.textAlign = "center";
                    } else {
                        price = res.centers[i].fee_type + " rs";
                        div_price.appendChild(document.createTextNode(price));
                    }
                    td.appendChild(div_price);
                } else if (j == 2) {
                    div_stat = document.createElement('div');
                    div_stat.style.textAlign = "center";
                    var status;
                    if (res.centers[i].sessions[0].available_capacity == 0) {
                        status = 'Booked';
                        div_stat.style.backgroundColor = "red";
                        div_stat.style.color = "white";
                        div_stat.style.marginRight = "72%";
                    } else {
                        status = 'Available ' + res.centers[i].sessions[0].available_capacity;
                    }
                    div_stat.appendChild(document.createTextNode(status));
                    td.appendChild(div_stat);
                    td.appendChild(document.createTextNode("Age : " + res.centers[i].sessions[0].min_age_limit + "+"));
                } else {
                    var div_time = document.createElement('div');
                    div_time.style.border = "1.5px solid #123C69";
                    div_time.style.marginRight = "55%";
                    div_time.style.padding = "0.3% 1% 0.3% 1%";
                    var timing = res.centers[i].from + " - " + res.centers[i].to;
                    div_time.appendChild(document.createTextNode(timing));
                    td.appendChild(div_time);

                    for (var k = 0; k < res.centers[i].sessions[0].slots.length; k+= 2) {
                        var div = document.createElement('div');
                        div.appendChild(document.createTextNode(res.centers[i].sessions[0].slots[k] + " " 
                                                                + res.centers[i].sessions[0].slots[k + 1]));
                        td.appendChild(div);
                    }
                } 
                tr.appendChild(td);
            }
            tbdy.appendChild(tr);
        }
    }
    tbl.appendChild(tbdy);
    document.getElementById("container").appendChild(tbl);
}
