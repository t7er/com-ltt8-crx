Domain = "ltt8.com";
Version = "0.5";
window.config = {
    api_domain:"pupipa.sinaapp.com",
    api_url:"http://ltt8.com/api/item/",
    def_code:'PPPFanli',
    out_code:null,
    goto:"ltt8.com/report",
    wb_appkey:'3096972488',
    wb_ralateUid:"1970961153",
    pid : "mm_23179007_0_0",
    init:function (items) {
        for (var item in items) {
            this[item] = items[item]
        }
        return this
    }
};

function getParam(b, c) {
    var e = b.indexOf("?" + c + "=");
    if (e == -1) {
        e = b.indexOf("&" + c + "=")
    }
    if (e != -1) {
        var a = b.indexOf("&", e + c.length + 2);
        a = (a != -1 ? a : b.length);
        var d = b.substring(e + c.length + 2, a);
        return d
    }
    return null
}
function isTaobaoLink(a) {
    return(/item\.taobao\.com\/item.htm/.test(a) || /detail\.tmall\.com/.test(a) || /24\.taobao\.com\/item.htm/.test(a))
}
function getTaobaoId(a) {
    var c = [];
    if (isTaobaoLink(a)) {
        var b = getParam(a, "id");
        if (b == null) {
            b = getParam(a, "mallstItemId")
        }
        if (b != null) {
            c.push(b)
        }
    }
    return c[0]
}
show = function(img, title, msg) {
    var notification = window.webkitNotifications.createNotification(img, title, msg);
    notification.show();
    setTimeout(function () {
        notification.cancel();
    }, 10000)
}
