var types = "div:not(.tipsy):not(.tipsy-inner):not(.tipsy-arrow), ul, li, input, label, em, td, tr, span, a, p, h1, h2, h3";
$(types).on("dblclick", tipsyOn);

function tipsyOn(e) {
    e.stopImmediatePropagation();
    $(types).off("dblclick", tipsyOn);

    var target = $(e.currentTarget),
        tText = "";

    tText = "Font Family: " + target.css("font-family");

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
    $(".tipsy").remove();

    setTimeout(function() {
        $(types).off("dblclick", tipsyOn).on("dblclick", tipsyOn);
    }, 100);
}