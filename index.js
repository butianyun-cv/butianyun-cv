// index.js jQuery + jQuery‑UI Tabs初始化，增加切换动画效果
$(function(){
    //初始化标签页，开启淡入动画
    $("#product‑tabs").tabs({
        show:{
            effect:"fade",
            duration:400
        },
        hide:{
            effect:"fade",
            duration:300
        },
        active:0
    });

    //页面载入完成简单动画：标题渐入
    $(".site‑header").hide().fadeIn(600);
});
