const ANIMATION = 200;
const WIDTH_CHANGE = "50px";

function toggleIcon(visible){
    $("#toggleMenuSVG").toggleClass("openedMenu");
}

const isNumeric = (x)=>/^-?\d+$/.test(x)

function setupDecadeLink(){
    let url_parts = window.location.pathname.split("/");
    let directory = url_parts[url_parts.length-2];
    let keep = false;
    if(isNumeric(directory)){
        let decade = parseInt(directory);
        if(decade>1950 && decade<2020){
            keep=true;
            $(".nav-link-decade").text("Decade "+directory);
        }
    }
    if(!keep)
        $(".nav-link-decade").remove();
}

$(document).ready(function(){
    let visible = false;

    const animation_length = (x)=>ANIMATION*(1.25*(x+1));

    setupDecadeLink();

    $(".nav-link").css({width:"-="+WIDTH_CHANGE});
    $("#toggleMenu").click((e)=>{
        e.preventDefault();
        

        $("#toggleMenu").toggleClass("navbar-menu-open");
        if($(".nav-link").is(":animated"))
            return;
        
        toggleIcon(visible);
        let children = $(".nav-links").children();
        for(let i=0;i<children.length;i++){
            let index = visible?i:children.length-(i+1); // if the menu is appearing, the animation should start from the last element, otherwise from the first element
            let operation = visible?"-=":"+="

            $(children[index]).animate({opacity:"toggle", width:operation+WIDTH_CHANGE}, animation_length(i));
        }
        visible=!visible;
    });
});