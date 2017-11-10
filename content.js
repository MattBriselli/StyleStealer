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

var types = "div, input, label, em, td, tr, span, a, p, h1, h2, h3";
$(types).on("mouseup", tipsyOn);

function tipsyOn(e) {
    console.log("now");
    e.stopImmediatePropagation();
    $(types).off("mouseup", tipsyOn);

    var target = $(e.currentTarget),
        tText = "";

    if (window.getSelection) {
        tText = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        tText = document.selection.createRange().text;
    }
    target.tipsy({
        gravity: "n",
        html: true,
        fallback: tText,
        trigger: "manual"
    });

    target.tipsy("show");

    setTimeout(function(){
        $(types).on("click", tipsyOff);
    }, 175);
}

function tipsyOff(e) {
    e.stopImmediatePropagation();
    $(types).off("click", tipsyOff);
    $(".tipsy").remove();
    setTimeout(function() {
        console.log("off");
        $(types).off("mouseup").on("mouseup", tipsyOn);
    }, 175);
}