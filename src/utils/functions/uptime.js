const uptime = (startTime) => {

    let Today = new Date();
    let date1 = startTime.getTime();
    let date2 = Today.getTime();
    let total = (date2 - date1) / 1000;

    let day = parseInt(total / (24 * 60 * 60));
    let afterDay = total - day * 24 * 60 * 60;
    let hour = parseInt(afterDay / (60 * 60)); 
    let afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; 
    let min = parseInt(afterHour / 60);
    let afterMin = Math.round(total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60);
    console.log(day + ' / ' + hour + ':' + min + ':' + afterMin);

    if (day >= 1)
        return day + ' Day(s) ' + hour + 'Hour(s)'/* + min + 'Minute(s)' + afterMin*/;
    else
        return /*day + ' Days' +*/ hour + 'Hour(s) ' + min + 'Minute(s)' /*+ afterMin + 'Second(s)'*/;
};

module.exports.uptime = uptime;