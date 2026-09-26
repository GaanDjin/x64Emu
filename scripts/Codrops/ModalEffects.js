/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
//var ModalEffects = (function () {

    function InitModalEffects() {

        //var overlay = document.querySelector('.md-overlay');
        
        //[].slice.call(document.querySelectorAll('.md-trigger')).forEach(function (el, i) {
        $('.md-modal').each(function () { 
            var el = $(this);

            el.on('click', function (ev) {
                $(this).addClass('md-show');
                //$('.md-overlay').on('click', '');
                
                if (el.hasClass('md-setperspective')) {
                    setTimeout(function () {
                        $(document.documentElement).addClass('md-perspective');
                    }, 25);
                }
            });
        });

        $('.md-overlay').on('click', removeModalHandler);


            $('.md-close').on('click', function (ev) {
                ev.stopPropagation();
                removeModalHandler();
            });

    }

        function removeModal(hasPerspective) {
            $('.md-modal').removeClass('md-show');

            if (hasPerspective) {
                //classie.remove(document.documentElement, 'md-perspective');
                $(document.documentElement).removeClass('md-perspective');
            }
        }
            function removeModalHandler() {
                removeModal($('.md-modal').hasClass('md-setperspective'));
                if (location.hash.length > 0)
                    location.hash = "";
}

function openModal(id){
    $("#modal-" + id).addClass("md-show");
    location.hash = "#" + id;
}
			
    InitModalEffects();

//})();