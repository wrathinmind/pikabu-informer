
var changeTooltipPosition = function(event) {
    var tooltipX = event.pageX - 8;
    var tooltipY = event.pageY + 8;
    $('div.pinformer_tooltip').css({top: tooltipY, left: tooltipX, position:'absolute', border:'1px solid', 'border-radius' : '3px' ,'z-index': 2, background: "#E7E7E7"});
};

var donthideme = function(){
    bhideme = false;
}

var hideme = function(){
    bhideme = true;
    $('div.pinformer_tooltip').remove();
}

var showTooltip = function(event) {
    $('div.pinformer_tooltip').remove();
    currentURL = this.href;
    bshowtooltip = true;
    if(!cache[this.href]){
        var xmlhttp = new XMLHttpRequest();
        $.get(this.href, function(data) {
                tooltip = $(data).find('.profile_wrap')[0];
                cache[currentURL] = tooltip.innerHTML;
                if(bshowtooltip){
                    $('<div class="pinformer_tooltip">'+ cache[currentURL] +'</div>').appendTo('body');
                    changeTooltipPosition(event);
                    $('div.pinformer_tooltip').bind({mouseenter: donthideme, mouseleave: hideme});
                }
            }
        );
    }
    else {
        $('<div class="pinformer_tooltip">'+cache[this.href]+'</div>').appendTo('body');
        changeTooltipPosition(event);
        $('div.pinformer_tooltip').bind({mouseenter: donthideme, mouseleave: hideme});
    }
};




var hideTooltip = function() {
    bshowtooltip = false;
    setTimeout(function(){
        console.log(bhideme);
        if(bhideme){
            $('div.pinformer_tooltip').remove();
            bhideme = true;
        } 
    },400);
};


var cache = {};
var currentURL = null;
var bshowtooltip = false;
var bhideme = true;

$("a").each(
    function(){
        if(/^.*?pikabu.ru\/profile\/\w*$/.test(this.href)){
            cache[this.href] = null;
            $(this).bind({mouseenter: showTooltip, mouseleave: hideTooltip});
        }
    }
)
for(i in cache)
    console.log(i);

$(window).bind({scroll:hideTooltip})
