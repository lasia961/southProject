const Utils = {
    DateToTimeStamp: function(date){
        let newDate = Date.parse(date).toString();
        return newDate.substring(0, newDate.length-3);
    },
    UnixToDate: function(date,types){
        let unixTime = this.DateToTimeStamp(date);
        let time = new Date(unixTime * 1000);
        let ymdhis = "";
        let hms = ' '+time.getHours()+':'+ time.getMinutes()+':'+time.getSeconds();
        ymdhis += time.getUTCFullYear() + types;
        if(time.getUTCMonth()+1<10){
            ymdhis += "0"+ (time.getUTCMonth()+1) + types;
        }else{
            ymdhis += (time.getUTCMonth()+1) + types;
        }
        if(time.getUTCDate() <10){
            ymdhis += "0" +time.getUTCDate()+hms;
        }else{
            ymdhis += time.getUTCDate()+hms;
        }
        return ymdhis;
    }
}


