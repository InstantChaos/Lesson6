/* custom JS goes here */

//IIFE
(function(){
    $(".btn-danger").click(function(event){
        console.log("danger button clicked");
        if(!confirm("Are you sure?")) {
            event.preventDefault();
            window.location.assign("/games");
        }
    });

})();