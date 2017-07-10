//    grab each element in the heading and nav
//    on a mouse event/touch event loop thru elements
//        move first block set width 
//        move next block set width plus width of last Element
//        cont... 
//    reverse this on mouse out

//    this function sets the mouseover action and loops thru the letters, pushing them out one by one
function horizontalReveal(element, offset) {
    for(var i = 0; i < element.length; i++) {
        if (i <= 0) {
            element[i].style.transform = "translateX(" + offset + "px)";  
        } else {
            var width = (element[i].offsetWidth * i) + offset;
            element[i].style.transform = "translateX(" + width + "px)";
        };
    };
};
//    this just reverses everything back to 0 so that it collapses
function horizontalClose(element) {
    for(var i = element.length - 1; i >= 0; i--) {
        element[i].style.transform = "translateX(0px)";
    };
};

//    effectively follows the same logic as the horizontalReveal but does it    vertically
function verticalReveal(element, offset) {
    for(var i = 0; i < element.length; i++) {
        if (i <= 0) {
            element[i].style.transform = "translateY(" + offset + "px)";  
        } else {
            var height = (element[i].offsetHeight * i) + offset;
            element[i].style.transform = "translateY(" + height + "px)";
        };
        var linkSlide = element[i].getElementsByClassName("slideNavElement");
        horizontalReveal(linkSlide, 0);
    };
};

function verticalClose(element) {
    for(var i = element.length - 1; i >= 0; i--) {
        element[i].style.transform = "translateY(0px)";
        horizontalClose(element[i].getElementsByClassName("slideNavElement"))
    };    
};

    
function navReveal(heading, nav, initialOffset, initialOffsetNav) {
    //    set eventlisteners for both horizontal and vertical actions as well as mouseon and off
    cube.addEventListener('mouseover', function() {
        horizontalReveal(heading, initialOffset);
        verticalReveal(nav, initialOffsetNav);
    });
    cube.addEventListener('mouseout', function() {
        horizontalClose(heading);
        verticalClose(nav);
    });
};