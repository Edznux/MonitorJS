/**
 *Socket (socket.io) connection at the server, without parameter for automatic connection
 */
var socket = io.connect();
/**
 * Display options for global gauges
 */

Chart.defaults.global = {
    animation: false,
    animationSteps: 60,
    animationEasing: "easeOutQuart",
    showScale: true,
    scaleOverride: false,
    scaleSteps: null,
    scaleStepWidth: null,
    scaleStartValue: null,
    scaleLineColor: "rgba(0,0,0,.1)",
    scaleLineWidth: 1,
    scaleShowLabels: true,
    scaleLabel: "<%=value%>",
    scaleIntegersOnly: true,
    scaleBeginAtZero: false,
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    scaleFontSize: 12,
    scaleFontStyle: "normal",
    scaleFontColor: "#666",
    responsive: false,
    showTooltips: true,
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],
    tooltipFillColor: "rgba(0,0,0,0.8)",
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    tooltipFontSize: 14,
    tooltipFontStyle: "normal",
    tooltipFontColor: "#fff",
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    tooltipTitleFontSize: 14,
    tooltipTitleFontStyle: "bold",
    tooltipTitleFontColor: "#fff",
    tooltipYPadding: 6,
    tooltipXPadding: 6,
    tooltipCaretSize: 8,
    tooltipCornerRadius: 6,
    tooltipXOffset: 10,
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
    multiTooltipTemplate: "<%= value %>",
    onAnimationProgress: function(){},
    onAnimationComplete: function(){}
}

function makeReadableLogs(logs) {
    logs = logs.replace(/(?:\r\n|\r|\n)/g, '<br />');
    return (logs);
}

function drawnTable(table, data) { //draw table with data in Array
    var divTable = document.getElementById(table);
    var tableau = "";
    tableau = "<table>";
    for (var i = 0; i < data.length; i++) {
        tableau += "<tr>";
        for (var j = 0; j < data[i].length; j++) {
            if( data[i][j]!=""){

            tableau += "<td>";
            tableau += data[i][j];
            tableau += "</td>";
            }else{
                data[i].splice(j,1)
            }
        }
        tableau += "</tr>";
    }
    tableau += "</table>";
    divTable.innerHTML = tableau;
}
// options = {
//     thickness: 1
// }
var scroll_boxes = document.getElementById("scroll_boxes");
var checkbox_box = document.getElementById("checkbox_box");

function maskIt(i) {
    if (document.getElementsByClassName(i)[0].style.display == "none") {
        document.getElementsByClassName(i)[0].style.display = "block";
    } else {
        document.getElementsByClassName(i)[0].style.display = "none";
    }
}

socket.on('clients', function(data) {
    if(data.clients > 1){
        document.getElementById('number').innerHTML="CONNECTED USERS : ";
    }
    document.getElementById('nbClients').innerHTML=data.clients
    document.getElementById("heure").innerHTML=data.heure;
});


function writeUptime(time){
    return Math.round((time/ 3600) * 100) / 100 + "h";
}

function setValues(route,items,callback){
    items.forEach(function(element,index){
        $.ajax({ 
            type: 'GET', 
            url: '/api/raw/'+route+"/"+element, 
            dataType: 'json',
            success: function (data) { 
                callback(data)
            }
        });
    });
}
function getAlert(callback){
    $.ajax({ 
        type: 'GET', 
        url: '/api/alert',
        dataType: 'json',
        success: function (data) { 
            callback(data)
        }
    });
}
function writeValue(route,value){
    document.getElementById(route).innerHTML=value;
}
function converter(data,units){
    switch(units){
        case "o":
            var unit = 1;
        break;
        case "ko":
            var unit = 1024;
        break;
        case "mo":
            var unit = 1048576;
        break;
        case "go":
            var unit = 1073741824;
        break;
        case "to":
           var unit = 1099511627776;
        break;
        case "po":
           var unit = 1125899906842624; // anyone ? no? sure...
        break;
    }
    if(data instanceof Array){
        for(var i = 0; i<data.length;i++){
            data[i]/=unit;
        }
    }
    if(typeof data === 'number'){
        data/=unit;
    }
    return data
}

function timeNow(){
    var heure =new Date();
    var h=(heure.getHours()<10)?("0"+heure.getHours()):(heure.getHours());
    var m=(heure.getMinutes()<10)?("0"+heure.getMinutes()):(heure.getMinutes());
    var s=(heure.getSeconds()<10)?("0"+heure.getSeconds()):(heure.getSeconds());
    return  h+":"+m+":"+s;
}

ctx={};
myChart={};
dataAll={}

function initChart(name,type,data,options){
    ctx[name] = document.getElementById(name).getContext("2d");
    myChart[name] = new Chart(ctx[name])[type](data, options);
}

var timer2Min = 60 * (1/clockGlobal*1000);
function drawChart(name,type,d){
    // remove data for BARs DATASETS
    if(myChart[name].datasets !== undefined && myChart[name].datasets[0].bars!== undefined){
        if(myChart[name].datasets[0].bars.length > timer2Min){ //shift first value after
            myChart[name].removeData();
        }
    }
    // remove data for POINTS DATASETS
    if(myChart[name].datasets !== undefined && myChart[name].datasets[0].points!== undefined){
        if(myChart[name].datasets[0].points.length > timer2Min){ //shift first value after
            myChart[name].removeData();
        }
    }
    myChart[name].addData(d,timeNow());
    myChart[name].update();
}
dataCpu = [
    {
        value: 90,
        color:"rgb(255, 127, 14)",
        highlight: "#FFC107",
        label: "Red"
    },
    {
        value: 10,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },

];
dataMem = {
    labels: [""],
    datasets: [{
            label: "Memory",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: []
        }]
};
dataNet = {
    labels: [""],
    datasets: [{
            label: "Network Tx",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [0]
        },{
            label: "Network Rx",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [0]
        }]
};

var datenow = timeNow();
switch (page) {
        case "disk":
            setInterval(function(){
                setValues("disk",["all"],function(d){
                    drawnTable("diskTable",d);
                });
            },clockGlobal);
            break;

        case "cpu":
            setValues("cpu",["stats"],function(d){ 
                document.getElementById('cpuInfos').innerHTML="Core Numbers :" + d.length +"<br>Processor Name :" + d[0].model;
            });
            setInterval(function(){
                setValues("cpu",["stats"],function(d){ 
                    drawnTable("cpuStatsTable",d);
                });
                setValues("cpu",["infos"],function(d){ 
                    drawnTable("cpuInfosTable",d);
                });
            },clockGlobal);
            break;

        case "ram":
            setValues("memory",["total"],function(d){ // need to get max value of ram for scaling
                initChart("memoryChart","Bar",dataMem,{barValueSpacing : 0,scaleOverride : true,scaleSteps : 10,scaleStepWidth :converter(d,"go")/10})
            });
            setInterval(function(){
                setValues("memory",["all"],function(d){
                    drawnTable("memoryTable",d);
                });
                setValues("memory",["total"],function(total){ 
                   setValues("memory",["free"],function(free){ 
                    memused =total-free;
                    drawChart("memoryChart","Bar",converter([memused],"go"));
                    });
                });
            },clockGlobal);
            break;

        case "network":
            setInterval(function(){
                setValues("network",["interfaces"],function(d){
                    writeValue("network-interfaces",d);
                });
            },clockGlobal);
            break;

        case "logs":
            setInterval(function(){

            },clockLogs);
            break;
        case "index":
            setValues("memory",["total"],function(d){ // need to get max value of ram for scaling
                initChart("memoryChart","Bar",dataMem,{barValueSpacing : 0,scaleOverride : true,scaleSteps : 10,scaleStepWidth :converter(d,"go")/10})
            });
            initChart("networkChart","Line",dataNet,{bezierCurve: false});
            initChart("cpuChart","Doughnut",dataCpu,{percentageInnerCutout: 80});
            setInterval(function(){
                setValues("cpu",["load"],function(value){
                    myChart["cpuChart"].segments[0].value=value;
                    myChart["cpuChart"].segments[1].value=100-value;
                    myChart["cpuChart"].update();
                    writeValue("cpuValue",Math.round(value*100)/100+"%");
                });

                setValues("memory",["total"],function(total){ 
                   setValues("memory",["free"],function(free){ 
                    memused =total-free;
                    drawChart("memoryChart","Bar",converter([memused],"go"));
                    });
                });

                setValues("network",["rx"],function(rx){
                    setValues("network",["tx"],function(tx){
                        drawChart("networkChart","Line",converter([tx,rx],"go"));
                    });
                });
                
                setValues("disk",["all"],function(d){
                    drawnTable("diskTable",d);
                });

            },clockGlobal);
            break;
            // writeValue("uptime",writeUptime(getValue("cpu","uptime")));
}
setInterval(function(){
    getAlert(function(info){
        if(info.success !== ""){
            toastr.success(info.success);
        }
        if(info.info !== ""){
            toastr.info(info.info);
        }
        if(info.warning !== ""){
            toastr.warning(info.warning);
        }
        if(info.error !== ""){
            toastr.error(info.error);
        }
    });
},600000);

/**
 * Clock for update server tickrate, without this, refresh of the server will be 10sec
 */
setInterval(function() {
    socket.emit("all", {
        hello: "world"
    });
}, 1000);

function initLogs() {
    socket.emit("logs", {
        hello: "world"
    });
    setInterval(function() {
        // console.log('tac');
        socket.emit("logs", {
            hello: "world"
        });
    }, clockLogs);
}