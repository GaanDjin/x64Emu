//plugin to make any element text editable
$.fn.extend({
    editable: function (inputboxwidth = 22, maxlen = 2) {
        $(this).each(function () {
            var $el = $(this),
                $edittextbox = $('<input type="text" style="width: ' + inputboxwidth + 'px;" maxlength="' + maxlen + '"></input>').css('min-width', $el.width()),
                submitChanges = function () {
                    if ($edittextbox.val() !== '') {
                        $el.html($edittextbox.val());
                        $el.show();
                        $el.trigger('editsubmit', [$el.html()]);
                        $(document).unbind('click', submitChanges);
                        $edittextbox.detach();
                    }
                },
                tempVal;
            $edittextbox.click(function (event) {
                event.stopPropagation();
            });

            $el.dblclick(function (e) {
                tempVal = $el.html();
                $edittextbox.val(tempVal).insertBefore(this)
                    .bind('keypress', function (e) {
                        var code = e.keyCode ? e.keyCode : e.which;
                        if (code === 13) {
                            submitChanges();
                        }
                        //https://stackoverflow.com/questions/16052592/javascript-prevent-default-for-keyup
                        if (code >= 48 && code <= 57) {
                            return true;
                        }
                        if  (code >= 65 && code <= 70) {
                            return true;
                        }
                        else if (code >= 97 && code <= 102) {
                            e.keyCode = code - 49;
                            return true;
                        }
                        else
                            return false;
                    }).select();
                $el.hide();
                $(document).click(submitChanges);
            });
        });
        return this;
    }
});
