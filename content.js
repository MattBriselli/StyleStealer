// content.js


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "clicked_browser_action" ) {
            var birthdays = $(".fbReminders"),
                firstHref = $("a[href^='http']").eq(0).attr("href");

            while (birthdays.children().length != 0) {
                birthdays.children().each(function () {
                    $(this).click();
                });
                birthdays = birthdays.children().first();
            }
        }
    }
);


$("div, input, label").on("dblclick", function(e) {
    var target = $(e.currentTarget),
        tText = target.text();

    if (tText.indexOf("\n") == -1) {

        $.get("http://www.thesaurus.com/browse/"+tText)
            .done(function(){
                console.log(this)
            });

        geturl = $.ajax({
            type: "GET",
            url: 'http://www.thesaurus.com/browse/'+tText,
            success: function () {
                alert("done!"+ geturl.getAllResponseHeaders());
            }
        });
        
    }
});

function tipsyOn() {
    console.log(this.responseText);
}