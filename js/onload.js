config.iid = getTaobaoId(location.href)

chrome.extension.sendMessage( {step:1,iid:config.iid}, function (response) {
    config.init(response)
    $(function(){
        $('body').prepend('<iframe  name="FL" id="LTT8"  src="'+config.api_url + config.iid+'#'+config.iid+'" style="display:none"></iframe>')
    })
})
setTimeout(function(){
    var INT = setInterval(function () {
        chrome.extension.sendMessage( {step:2,iid:config.iid}, function (result) {
            if (result != null) {
                if(result.click_url ){
                    if(location.href.indexOf(config.pid) < 0) location.href = result.click_url
                }
                $(function(){
                        if($("#PPPInfo").length <= 0){
                            $('body').css("padding-top","36px")
                            $('body').prepend('<div id="PPPInfo">'+result.html+'</div>')
                        }
                        else{
                            $("#PPPInfo").html(result.html)
                        }
                        wb(result.click_url,result.pic_url)
                        clearInterval(INT)
                    }
                )
            }
        })
    },200)
},1000)

//todo weibo分享
wb = function(url,pic){
    var _w = 32 , _h = 32;
    var param = {
        url:location.href,
        type:'1',
        count:'',
        appkey:"",
        title:'',
        pic:'',
        ralateUid:"",
        language:'zh_cn',
        rnd:new Date().valueOf()
    }
    console.log(param)
    for(item in param){
        if(config['wb_'+item]){
            console.log('wb_'+item+"  :  "+config['wb_'+item])
            param[item] = config['wb_'+item]
        }
    }
    console.log(param)
    var temp = [];
    for( var p in param ){
        if(url) param.url = url
        param.title = document.title
        if(pic)param.pic = pic
        temp.push(p + '=' + encodeURIComponent( param[p] || '' ) )
    }
    $('#share').html('<iframe allowTransparency="true" frameborder="0" scrolling="no" src="http://hits.sinajs.cn/A1/weiboshare.html?' + temp.join('&') + '" width="'+ _w+'" height="'+_h+'"></iframe>')
}