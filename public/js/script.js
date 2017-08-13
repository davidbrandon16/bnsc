$(document).ready(function(){
    $('.menu-item').click(function(){
        var link = $(this).find('a').attr("href");
        window.location.href= link;
    });
});