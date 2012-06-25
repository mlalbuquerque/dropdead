(function( $ ) {
    
    $.fn.dropDead = function(options) {
        var settings = $.extend({
            menuElement: 'ul',
            submenuClass: 'submenu',
            itemHoverClass: 'submenu-item-hover',
            locationAttr: 'title',
            callback: function (element, attrValue) {
                location.href = element.attr(attrValue);
            }
        }, options);

        return this.each(function () {
            var $this = $(this),
                list = ($this.children(settings.menuElement).length > 0) ? 
                    $this.children(settings.menuElement) :
                    $this.next(settings.menuElement);

            var items = list.children(),
                lastItem = list.children(':last-child');

            list.hide();
            list.addClass(settings.submenuClass);
            var menuLeft = $this.position().left, menuTop = $this.position().top,
                menuPadding = $this.css('padding'),
                menuPaddingBottom = _getIntegerValue($this.css('padding-bottom')),
                menuBorderLeftWidth = _getIntegerValue($this.css('border-left-width')),
                menuBorderTopWidth = _getIntegerValue($this.css('border-top-width')),
                listBorderWidth = _getIntegerValue(list.css('border-left-width'));
            list.css({
                'padding': '0',
                'margin': '0',
                'list-style': 'none',
                'left': menuLeft+'px',
                'position': 'absolute',
                'top': (menuTop + $this.height() + 2*menuBorderTopWidth + 2*menuPaddingBottom) + 'px'
            });
            
            items.css({
                'border-bottom': '1px solid '+list.css('border-bottom-color'),
                'cursor': 'pointer',
                'padding': menuPadding,
                'text-align': 'center',
                'min-width': ($this.width() + 2*(menuBorderLeftWidth - listBorderWidth)) +'px'
            });
            lastItem.css({
                'border-bottom': '0'
            });
            
            if (items.css('display') == 'inline')
                items.css('display', 'block');
            
            $this.mouseover(function (event) {
                list.show();
            }).mouseout(function (event) {
                list.hide();
            });
        
            list.mouseover(function (event) {
                list.show();
            }).mouseout(function (event) {
                list.hide();
            });
            
            items.mouseover(function () {
                $(this).addClass(settings.itemHoverClass);
            }).mouseout(function () {
                $(this).removeClass(settings.itemHoverClass);
            }).focusin(function () {
                $(this).addClass(settings.itemHoverClass);
            }).focusout(function () {
                $(this).removeClass(settings.itemHoverClass);
            }).click(function () {
                settings.callback($(this), settings.locationAttr);
                list.hide();
            });
        });
    };
    
    function _getIntegerValue(value) {
        if (value == undefined)
            return 0;
        else if (value.match(/^[0-9]+/) == null)
            return 0;
        
        return new Number(value.match(/^[0-9]+/)[0]);  
    }
    
})(jQuery);