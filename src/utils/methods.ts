export const getFormattedTime = (strDate: string): string => {
    if (strDate == null || strDate == "") {
        return "";
    }

    var d = new Date(strDate);
    var year: any = d.getFullYear();
    var month: any = d.getMonth() + 1;
    //month = month < 10 ? '0'+month : month;
    var date: any = d.getDate();
    //date = date < 10 ? '0'+date : date;
    var hours : any = d.getHours();
    var minutes : any = d.getMinutes();
    var ampm : any = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = month + "/" + date + "/" + year + " " + hours + ':' + minutes + ' ' + ampm;

    return strTime;
}

export const numberWithComma = (val: number): string => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}