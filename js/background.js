(function () {
    chrome.cookies.set({url:"http://" + Domain, name:"version", value:Version, expirationDate:3358714824});
    var result = $.cookie('config');
    if (result) {
        window.config.init(JSON.parse(result))
    }
    else {
        $.get("http://" + Domain + "/api", function (result) {
            window.config.init(JSON.parse(result))
            $.cookie("config", result, {expires:2})
        })
    }
})();

chrome.extension.onMessage.addListener(function (result, _, sendResponse) {
    if (result.step == 1) {
        chrome.cookies.get({url:"http://" + Domain, name:"config"}, function (setting) {
            console.log(decodeURIComponent(setting.value))
            if (setting) config.init(JSON.parse(decodeURIComponent(setting.value)))
            sendResponse(config);
        })
        return(true)
    }
    else if(result.step == 2){
        var tab = _.tab
        chrome.cookies.get({url:"http://" + Domain, name:"config"}, function (setting) {
            console.log(decodeURIComponent(setting.value))
            if (setting) config.init(JSON.parse(decodeURIComponent(setting.value)))
            chrome.cookies.get({url:config.api_url + result.iid, name:'item'}, function (cookie) {
                if (!cookie)return
                var result = JSON.parse(decodeURIComponent(cookie.value))
                if (!result.text)return;
                var inner = { text:result.text}
                if (result.click_url)inner.click_url = String(result.click_url).replace(config.def_code, config.out_code)
                if (config.out_code == config.def_code) {
                    inner.Login_url = 'http://' + Domain + '/login?next=' + encodeURIComponent(result.click_url)
                    inner.Login_txt = '[\u70b9\u51fb\u767b\u5f55]'
                    inner.text += '<a href="' + inner.Login_url + '">' + inner.Login_txt + '</a>'
                }
                else if (tab.url.indexOf(config.out_code) < 0 && result.click_url) {
                    inner.FL_url = inner.click_url
                    inner.FL_txt = "[\u4f18\u60e0\u94fe\u63a5]"
                    inner.text += '<a href="' + inner.FL_url + '">' + inner.FL_txt + '</a>'
                }
//                if (result.commission_rate) {
//                    chrome.browserAction.setBadgeText({text:(result.commission_rate / 100 ).toFixed(2), tabId:tab.id})
//                }
                inner.pic_url = result.pic_url
                inner.html = '<div id="PPPText">' + inner.text + '<span id="share"></span></div>'
                sendResponse(inner)
            })
       })
        return(true)
    }
})
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.windows.getCurrent(function(win){
        chrome.tabs.query({url:"http://" + config.goto, windowId:win.id}, function (tabs) {
            if (tabs.length) {
                tab = tabs[0];
                chrome.tabs.update(tab.id, {selected:true});
            } else {
                chrome.tabs.create({url:"http://" + config.goto})
            }
        })
    })
});

