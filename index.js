$(function(){
    //初始化jQuery‑UI标签页组件
    $("#tabs").tabs({
        active:0,
        show:{
            effect:"fade",
            duration:350
        },
        hide:{
            effect:"fade",
            duration:250
        }
    });

    // 鼠标悬停标签简单高亮
    $("#tabs > ul > li").hover(function(){
        $(this).css("cursor","pointer");
    });
});
