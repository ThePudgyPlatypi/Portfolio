
//Make cubes like the navigation
//grab those cube elements
//When they are halfway or above the viewable screen run animation to show section heading
//    have the heading for that section drop out like the navigation

//This function is taken from stackOverflow user Roko
//It finds if an element is in the viewport and allows you to do things with it


//This is potentially a better way to do the scroll reveal then the code down 
//at the bottom of this page. This was coded from a tutorial at http://xtianmiller.com/notes/animating-elements-when-they-appear-in-viewport/ since I am a noob and I need to learn somewhere!

function spinningHeader() {
    //if statement to check if animation can be run correctly
    if (window.requestAnimationFrame && document.documentElement.classList) {
        document.documentElement.classList.add('enhanced');
        
        //a variable toggle to select the correct animation frame for the correct   browser
        var _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
        
        //snagging all the elements to be watched for reveal
        var revealer = document.querySelectorAll('.header');
        
        //function that snags the size of the viewport so and returns it in an object
        var getViewportSize = function() {
            return {
                width: window.document.documentElement.clientWidth,
                height: window.document.documentElement.clientHeight
            };
        };
        
        //function that gets the page offsets to that we can see the scroll, returns an object with the data we need
        var getCurrentScroll = function() {
            return {
                x: window.pageXOffset,
                y: window.pageYOffset
            };
        };
        
        //heres the function that gets the elements dimensions for us and returns another object of the information. it passes in the element we are trying to measure. Using Offset instead of getBoundingBoxRect is faster. Hence this method.
        var getElemInfo = function(elem) {
            var offsetTop = 0;
            var offsetLeft = 0; 
            var offsetHeight = elem.offsetHeight;
            var offsetWidth = elem.offsetWidth;
            
            do {
                if(!isNaN(elem.offsetTop)) {
                    offsetTop += elem.offsetTop;
                }
                if (!isNaN(elem.offsetLeft)) {
                    offsetLeft += elem.offsetLeft;
                }
            } while ((elem = elem.offsetParent) !== null);
            
            return {
                top: offsetTop,
                left: offsetLeft,
                height: offsetHeight,
                width: offsetWidth
            };
        };
        
        //now we start the magic of finding the elements that are within the viewport 
        //and messing with them.
        var checkVisibility = function(elem) {
            var viewportSize = getViewportSize();
            var currentScroll = getCurrentScroll();
            var elemInfo = getElemInfo(elem);
            var spaceOffset = 4.5;
            var elemHeight = elemInfo.height;
            var elemWidth = elemInfo.width;
            var elemTop = elemInfo.top;
            var elemLeft = elemInfo.left;
            var elemBottom = elemTop + elemHeight;
            var elemRight = elemLeft + elemWidth;
            
            var checkBoudaries = function() {
                // Defining the element boundaries with the offset
                var top = elemTop + elemHeight * spaceOffset;
                var left = elemLeft + elemWidth * spaceOffset;
                var bottom = elemBottom - elemHeight * spaceOffset;
                var right = elemRight - elemWidth * spaceOffset;
                
                //defining the window boundaries and the window offset
                //I am not sure why adding zero to this number is necessary, will investigate
                var wTop = currentScroll.y + 0;
                var wLeft = currentScroll.x + 0;
                var wBottom = currentScroll.y - 0 + viewportSize.height;
                var wRight = currentScroll.x - 0 + viewportSize.width;
                
                //Then check if the element is actually in the boundaries
                return (top < wBottom) && (bottom > wTop) && (left > wLeft) && (right < wRight);
            };
            
            return checkBoudaries();
        };
        
        // this is the loop that will jump thru the list of revealer items and add
        // things as necessary
        var toggleElement = function() {
            for (var i = 0; i < revealer.length; i++) {
                var faces = revealer[i].querySelectorAll(".face");
                var faceState = ["front-active", "left-active", "bottom-active", "right-active", "top-active", "back-active"];
                var faceStateDesign = ["front-active", "left-active", "bottom-active-design", "right-active", "top-active", "back-active"];
                var letters = revealer[i].querySelectorAll('.headerVertSlide');
                if (checkVisibility(revealer[i])) {
                    if(i !== 2 ) {
                        for (var f = 0; f < faces.length; f++) {
                            faces[f].classList.add(faceState[f]);
                        }; 
                    } else {
                        for (var f = 0; f < faces.length; f++) {
                            faces[f].classList.add(faceStateDesign[f]);
                        }; 
                    }
                    verticalReveal(letters, 65);
                } else {
                    if(i !== 2 ) {
                        for (var f = 0; f < faces.length; f++) {
                            faces[f].classList.remove(faceState[f]);
                        }; 
                    } else {
                        for (var f = 0; f < faces.length; f++) {
                            faces[f].classList.remove(faceStateDesign[f]);
                        }; 
                    }
                    verticalClose(letters);
                }
            }
        };
        
        //This is a throttling function. As far as I understand it, it keeps 
        //this script from running constantly on scroll and instead only
        //checks every once and a while so that you can increase speed.
        //I will have to look into this a bit more later since I dont full
        //comprehend what is going on
        var scrollHandler = _.throttle(function() {
            _requestAnimationFrame(toggleElement);
        }, 300);
        
        var resizeHandler = _.throttle(function() {
            _requestAnimationFrame(toggleElement);
        }, 300);
        
        if (window.addEventListener) {
            addEventListener('scroll', scrollHandler, false);
            addEventListener('resize', resizeHandler, false);
        } else if (window.attachEvent) {
            window.attachEvent('onscroll', scrollHandler);
            window.attachEvent('onresize', resizeHandler);
        } else {
            window.onscroll = scrollHandler;
            window.onresize = resizeHandler;
        };
    };
};











//$(document).ready(function() {
//    function inViewport($el) {
//        var elH = $el.outerHeight(),
//            H = $(window).height(),
//            r = $el[0].getBoundingClientRect(), t=r.top, b=r.bottom;
//        return Math.max(0, t>0? Math.min(elH, H-t) : (b<H?b:H));
//    }
//
//    var a = $(".header");
//    console.log(a);
//    var headerOffset = 50;

//    READ FIRSTS!!
//    This works, but it is not exactly what I want.
//    The viewport function will stop at 30 when an element is in the viewport
//    so what i need to write is some function that will find the actual distance
//    between the top/bottom of the screen and the element so that I can have the 
//    animation trigger at a specific point. 
//    Take a look at the math in the above function first to see if I can tweak it
//    it looks like its returning true or false, so if I can just tweak where it returns
//    true or false then i should be golden
    
//    $(window).on("scroll resize", function() {
//        if(inViewport(a) > 0 ) {
//            document.querySelector(".right").classList.add("right-active");
//            document.querySelector(".left").classList.add("left-active");
//            document.querySelector(".front").classList.add("front-active");
//            document.querySelector(".back").classList.add("back-active");
//            document.querySelector(".bottom").classList.add("bottom-active");
////            verticalReveal(letters, headerOffset);
//        } else {
//            document.querySelector(".right").classList.remove("right-active");
//            document.querySelector(".left").classList.remove("left-active");
//            document.querySelector(".front").classList.remove("front-active");
//            document.querySelector(".back").classList.remove("back-active");
//            document.querySelector(".bottom").classList.remove("bottom-active");
////            verticalClose(letters);
//        }
//    })
//});