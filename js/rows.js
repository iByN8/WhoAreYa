export { getAge };

function getAge(dateString){
    var edad = 0;
    var arraySeparado = dateString.split("-");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    console.log(dd)
    console.log(mm)
    console.log(yyyy)
    if(mm<arraySeparado[0]){
        edad=edad+1;
    }else if(mm=arraySeparado[0] && dd<arraySeparado[1]){
        edad=edad+1;
    }

    edad=edad+(yyyy-arraySeparado[2]-1);
    return edad;
}