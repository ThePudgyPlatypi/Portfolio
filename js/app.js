$(document).foundation();

$(document).ready(function() {
    //    variables to grab elements and set the offset of how far I want the elements to sit from the 
    //    main navigation "cube"
    var cube = document.getElementById("cube");
    var heading = document.getElementById("heading").getElementsByClassName("slideElement");
    var nav = document.getElementById("nav").getElementsByClassName("slideElement");
    var initialOffset = 175;
    var initialOffsetNav = 100;
    
    navReveal(heading, nav, initialOffset, initialOffsetNav);
    spinningHeader();
    anchorClick();
});

    


                                