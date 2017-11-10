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
$(types).on("dblclick", tipsyOn);

function tipsyOn(e) {
    e.stopImmediatePropagation();
    $(types).off("dblclick", tipsyOn);

    var target = $(e.currentTarget),
        tText = "";

    if (window.getSelection) {
        tText = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        tText = document.selection.createRange().text;
    }

    target.tipsy("hide").unbind().data("tipsy", "");

    console.log(tText);

    target.tipsy({
        gravity: "n",
        html: true,
        fallback: tText,
        trigger: "manual"
    });

    target.tipsy("show");
    $(".tipsy").css("top", e.pageY).css("left", e.pageX);

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