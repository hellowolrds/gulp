var tool = {
    get_params: function () {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");     
        var r = window.location.search.substr(1).match(reg);
        //search,查询？后面的参数，并匹配正则     
        if (r!=null) {
            return unescape(r[2]); 
        }
        return '';
    },
    getTime: function(created_at, fmt) {
        var date = new Date(parseInt(created_at + "000"));
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            S: date.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    },
}