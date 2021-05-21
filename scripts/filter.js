/********************************************
    DEVELOPER:  INDRANIL PAL
    E-MAIL:     indranil.pal.0602@gmail.com
*********************************************/

function get18to44(reqDiv) {
    var res;
    if (reqDiv == "pin") {
        res = pinResponse;
    } else {
        res = distResponse;
    }
    flag18to44 = false;
    createDistTable(res, flag18to44, true, true, true, true, true);
    flag18to44 = true;
}

function get45plus(reqDiv) {
    var res;
    if (reqDiv == "pin") {
        res = pinResponse;
    } else {
        res = distResponse;
    }
    flag45plus = false;
    createDistTable(res, true, flag45plus, true, true, true, true);
    flag45plus = true;
}

function getFree(reqDiv) {
    var res;
    if (reqDiv == "pin") {
        res = pinResponse;
    } else {
        res = distResponse;
    }
    flagFree = false;
    createDistTable(res, true, true, flagFree, true, true, true);
    flagFree = true;
}

function getPaid(reqDiv) {
    var res;
    if (reqDiv == "pin") {
        res = pinResponse;
    } else {
        res = distResponse;
    }
    flagPaid = false;
    createDistTable(res, true, true, true, flagPaid, true, true);
    flagPaid = true;
}

function getCovaxin(reqDiv) {
    var res;
    if (reqDiv == "pin") {
        res = pinResponse;
    } else {
        res = distResponse;
    }
    flagCovaxin = false;
    createDistTable(res, true, true, true, true, flagCovaxin, true);
    flagCovaxin = true;
}

function getCovishild(reqDiv) {
    var res;
    if (reqDiv == "pin") {
        res = pinResponse;
    } else {
        res = distResponse;
    }
    flagCovishild = false;
    createDistTable(res, true, true, true, true, true, flagCovishild);
    flagCovishild = true;
}