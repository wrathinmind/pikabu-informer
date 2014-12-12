  var changeTooltipPosition = function(event) {
    var tooltipX = event.pageX - 8;
    var tooltipY = event.pageY + 8;
    $('div.pinformer_tooltip').css({top: tooltipY, left: tooltipX, position:'absolute', border:'1px solid', 'border-radius' : '3px' ,'z-index': 2, background: "#E7E7E7"});
  };

  var showTooltip = function(event) {
    $('div.pinformer_tooltip').remove();
    var xmlhttp = new XMLHttpRequest();
    $.get(this.href, function(data) {
      tooltip = $(data).find('.profile_wrap')[0];
      $('<div class="pinformer_tooltip">'+tooltip.innerHTML+'</div>').appendTo('body');
      changeTooltipPosition(event);
    });
  };

  var hideTooltip = function() {
    $('div.pinformer_tooltip').remove();
  };
//!!!!!

$("a").each(function(){if(/.*?pikabu.ru\/profile\/.*/.test(this.href)) $(this).bind({mouseenter: showTooltip, mouseleave: hideTooltip})})
$("body").bind({scroll:hideTooltip})
