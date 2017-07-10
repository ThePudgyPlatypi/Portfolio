//This is the code for opening the info div that is below each anchor 
//this keeps me from using the target css selector
function anchorClick() { 
    var anchors = document.querySelectorAll(".anchor"); 
    var imgOverlay, imgBackground;
    // http://youmightnotneedjquery.com/#add_class
    function addClass(el, className) {
        if (el.classList) { 
            el.classList.add(className); 
        } else { 
            el.className += ' ' + className; 
        };
    }

    // http://youmightnotneedjquery.com/#remove_class
    function removeClass(el, className) {
        if (el.classList) { 
            el.classList.remove(className); 
        } else { 
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' '); 
        };
    }

    function grabImgEl(e) {
        imgOverlay = e.querySelector(".imgOverlay");
        imgBackground = e.querySelector(".imgBackground");
        img = e.getElementsByTagName("img");
        return imgOverlay, imgBackground, img;
    }

    function revealInfo(e) {
        removeClass(e.nextElementSibling, 'info');
        addClass(e.nextElementSibling, 'info-active');
        grabImgEl(e);
        addClass(img[0], 'img-active');
        addClass(imgOverlay, 'imgOverlay-active');
        addClass(imgBackground, 'imgBackground-active');
    }

    function hideInfo(e) {
        removeClass(e.nextElementSibling, 'info-active');
        addClass(e.nextElementSibling, 'info');
        grabImgEl(e);
        removeClass(img[0], 'img-active');
        removeClass(imgOverlay, 'imgOverlay-active');
        removeClass(imgBackground, 'imgBackground-active');
    }
    
    Array.prototype.forEach.call(anchors, function(element) {
        element.addEventListener('click', function() { 
            revealInfo(element); 
        }, false );
        window.addEventListener('click', function() { 
            hideInfo(element); 
        }, true );
    });
};
