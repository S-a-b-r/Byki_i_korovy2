var secret = [];
Hod=0;
win=0;
var k = 1;
var m = 1;
function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}
//Рандомное 4ех значное число. Все работает четко
function secr() {
    for(var i=0;i<=3;i++){
        secret[i]=randomInteger(0,9);
        while(secret[i]==secret[i-1]||secret[i]==secret[i-2]||secret[i]==secret[i-3]){
            secret[i]=randomInteger(0,9);
        }
    }
    return secret;
}

// рестарт Игры

function restart() {
    Hod=0;
    win=0;
    secret = secr();
    console.log(secret);
    document.getElementById("inpA").value = "";
    document.getElementById('pLog').innerHTML= "Началась новая игра";
    var tbl = document.getElementById("table");
    var tbody = document.getElementById("parentId");
    var a = document.getElementsByTagName("tr");
    for (var i = a.length - 1; i>=0; i--) {
    tbl.removeChild(a[i]);
    k=1;
    Log(0,0,0);
 }
}

//Проверка числа

function checkStr(str) {
    if((str.length!=4)|| (str[0]="")) return false;
    for (var i = 0;  i < 4; i++){
        if ( (str[i] < '0') || (str[i] > '9') ) return false;
    }
    for(i=0;i<4;i++)
        for(var j=1;j<4;j++)
            if( (i!=j) && (str[i] == str[j]) ) return false;

return true;
}

function validate(){
    var txt = document.getElementById('inpA');
    var btn = document.getElementById("btnOk");
    if(checkStr(txt.value) && win==0){
        txt.className = "col-lg-3  form-control is-valid btn-block";
        btn.removeAttribute("disabled");
    }
    else{
        btn.className = " btn btn-success";
        btn.setAttribute("disabled","disabled");
        txt.className = "col-lg-3 form-control is-invalid btn-block";
    }
}

// Конец проверки

//Само деяние

function Move() {
    var str=document.getElementById("inpA").value;
    var cow=0;
    var bull=0;
    Hod++;

    //Посчитать быков

    for( var i=0;i<4;i++){
        if(secret[i]==str[i])
            bull++;
    }

    //Количество коров

    for( i=0;i<4;i++)
        for( var j= 0; j<4;j++){
            if((j!=i) && str[i]==secret[j])
                cow++;
        }

    //Победа
    Log(str,bull,cow);
}
function Log(str,bull,cow) {
    sinTable(str,bull,cow);
    var p = document.getElementById('pLog');
    if(bull==4){
        document.getElementById("btnOk").setAttribute("disabled","disabled");
        p.innerHTML ="Вы взяли число " + str + "<br>У вас " + bull + " быка. И "+ cow +" коровы.<br>Вы выиграли!!!";
        alert("Вы победили!");
        win++;
    }
    else
    p.innerHTML ="Вы взяли число " + str + "<br>У вас " + bull + " быка. И "+ cow +" коровы";
}


function sinTable(str,bull,cow){
    var tbl = document.getElementById("table"); //получаем нашу таблицу
    var tds = tbl.getElementsByTagName("td"); //все ячейки из таблицы
    createTable(k);
    createTable(k);
    createTable(k);
    createTable(k);
    tds[4*k-4].innerHTML=Hod;
    tds[4*k-3].innerHTML=str;
    tds[4*k-2].innerHTML=bull;
    tds[4*k-1].innerHTML=cow;
    k++;
}
function createTable(k){
    k++;
    var tbl = document.getElementById("table"); //получаем нашу таблицу
    var tds = tbl.getElementsByTagName("td");
    var b = document.createElement('tr');
    tbl.appendChild(b);
    var trs = tbl.getElementsByTagName("tr"); //все ячейки из таблицы
    var a = document.createElement('td');
    trs[k].appendChild(a);
}
window.onload = restart();

