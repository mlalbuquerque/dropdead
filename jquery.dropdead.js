(function( $ ) {
    
    $.fn.dropDead = function(options) {
        var settings = $.extend({
            menuElement: 'ul',
            submenuClass: 'submenu',
            itemHoverClass: 'submenu-item-hover',
            locationAttr: 'href'
        }, options);

        return this.each(function () {
            var $this = $(this),
                list = $this.children(settings.menuElement),
                items = list.children(),
                lastItem = list.children(':last-child');

            list.hide();
            list.addClass(settings.submenuClass);
            var menuLeft = $this.position().left, menuTop = $this.position().top,
                menuPadding = $this.css('padding'),
                menuPaddingBottom = _getIntegerValue($this.css('padding-bottom')),
                menuBorderWidth = _getIntegerValue($this.css('border-left-width')),
                listBorderWidth = _getIntegerValue(list.css('border-left-width'));
            list.css({
                'left': menuLeft+'px',
                'position': 'absolute',
                'top': (menuTop + $this.height() + 2*menuPaddingBottom) + 'px'
            });
            
            items.css({
                'text-align': 'center',
                'border-bottom': '1px solid '+list.css('border-bottom-color'),
                'padding': menuPadding,
                'width': ($this.width() + 2*(menuBorderWidth - listBorderWidth)) +'px'
            });
            lastItem.css({
                'border-bottom': '0'
            });
            
            $this.mouseover(function (event) {
                list.show();
            }).mouseout(function (event) {
                list.hide();
            });
            
            items.mouseover(function () {
                $(this).addClass(settings.itemHoverClass);
            }).mouseout(function () {
                $(this).removeClass(settings.itemHoverClass);
            }).click(function () {
                location.href = $(this).attr(settings.locationAttr);
            });
        });
    };
    
    function _getIntegerValue(value) {
        if (value.match(/^[0-9]+/) == null)
            return null;
        return new Number(value.match(/^[0-9]+/)[0]);
            
    }
    
})(jQuery);