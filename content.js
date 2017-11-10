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

var types = "div:not(.tipsy):not(.tipsy-inner):not(.tipsy-arrow), input, label, em, td, tr, span, a, p, h1, h2, h3";
$(types).on("dblclick", tipsyOn);

function tipsyOn(e) {
    e.stopImmediatePropagation();
    $(types).off("dblclick", tipsyOn);

    var target = $(e.currentTarget),
        tText = "";

    // if (window.getSelection) {
    //     tText = window.getSelection().toString();
    // } else if (document.selection && document.selection.type != "Control") {
    //     tText = document.selection.createRange().text;
    // }

    tText = target.css("font-family");

    console.log(target, tText);

    target.tipsy("hide").unbind().data("tipsy", "");
    target.tipsy({
        gravity: "n",
        html: true,
        fallback: tText,
        trigger: "manual"
    });
    target.tipsy("show");

    $(".tipsy").css("top", e.pageY + 15).css("left", e.pageX - ($(".tipsy").width() / 2));

    setTimeout(function(){
        $(types).on("click", function(e) {
            tipsyOff(e, target)
        });
    }, 100);
}

function tipsyOff(e, target) {
    e.stopImmediatePropagation();
    $(types).off("click", tipsyOff);

    target.tipsy("hide").unbind().data("tipsy", "");

    setTimeout(function() {
        $(types).off("dblclick").on("dblclick", tipsyOn);
    }, 100);
}