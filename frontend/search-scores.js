"strict";

function main() {
    prepareMain(
        $("<div>").append(
            $("<h1>").text("Search Scores"),
            SearchFormBox(
                "Student Registration", 
                "Registration Number:", 
                "Enter registration number",
            ),
            SearchResultBox("Detailed Scores"),
        )
    );
}

/**
 * @param {string} title
 * @param {string} field
 * @param {string} placeholder
 * @returns
 */
function SearchFormBox(title, field, placeholder) {
    const warning = $("<div>").addClass("warn").html(
        "Invalid value!<br/>Must be an 8-digit decimal number, e.g. 01234567."
    ).hide();
    const textInput = (
        $("<input>")
        .attr("type", "text")
        .attr("name", "sbd")
        .attr("placeholder", placeholder)
        .attr("spellcheck", "false")
    );
    textInput.on("focusout", (event) => {
        if (isValidRegistrationNumber(textInput.val())) {
            warning.hide();
        }
        else {
            warning.show();
        }
    });
    return $("<div>").addClass("formbox").append(
        $("<form>").on("submit", onSubmitSearchForm).append(
            $("<h2>").text(title),
            $("<p>").text(field),
            $("<div>").append(textInput, $("<input>").attr("type", "submit")),
            warning,
        ),
    );
}

/**
 * 
 * @param {string} title 
 * @returns 
 */
function SearchResultBox(title) {
    return $("<div>").addClass("resultbox").append(
        $("<h2>").text(title),
        $("<table>").attr("id", "scoretable").addClass("table").append(
            $("<tr>").append(
                $("<th>").text("Subject"), $("<th>").text("Score")
            ),
            ...[...SUBJECTS, "ma_ngoai_ngu",].map((key) => (
                $("<tr>").attr("id", "scoretable-" + key).hide()
            )),
        ).hide(),
        (
            $("<p>")
            .attr("id", "scorenotfound")
            .html(
                "😅 That registration number is not found!<br>"
                + "✨ Try another number!"
            )
            .hide()
        ),
    );
}

/**
 * 
 * @param {JQuery.SubmitEvent<HTMLElement, undefined, HTMLElement, HTMLElement>} event 
 */
function onSubmitSearchForm(event) {
    event.preventDefault();
    /** @type {HTMLFormElement} */ // @ts-ignore
    const form = event.currentTarget;
    let sbd = undefined;
    if (form) {
        const formData = new FormData(form);
        sbd = formData.get("sbd") ?? "";
    }
    if (sbd === undefined || !isValidRegistrationNumber(sbd)) {
        return;
    }
    $.ajax({
        url: SERVER_ENDPOINT + "student/" + sbd + "/",
        type: "GET",
        crossDomain: true,
        headers: {
            accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        success: onSubmitSearchFormSuccess,
        error: onSubmitReportFormFailure,
    });
}

/** @type {JQuery.TypeOrArray<JQuery.Ajax.SuccessCallback<any>>} */
const onSubmitSearchFormSuccess = (response) => {
    console.log("success:", response);
    $("#scoretable").show("fast");
    $("#scorenotfound").hide();
    const keys = Object.keys(response).filter((key) => response[key] !== null);
    [...SUBJECTS, "ma_ngoai_ngu"].map((key) => {
        const item = $("#scoretable-" + key).html("");
        if (keys.indexOf(key) === -1) {
            item.hide("fast");
            return;
        }
        const score = (
            $("<td>")
            .addClass("scoretable-value")
            .text(scoreToString(response[key]))
        );
        if (+response[key] < 5.0) {
            score.addClass("scoretable-failscore");
        }
        item.append(
            (
                $("<td>")
                .addClass("scoretable-subject")
                .text(getSubjectName(key))
            ),
            score,
        ).show("slow")
    });
}

/** @type {JQuery.TypeOrArray<JQuery.Ajax.ErrorCallback<any>>} */
const onSubmitReportFormFailure = (xhr, status, error) => {
    console.warn("error:", status, error);
    $("#scoretable").hide();
    $("#scorenotfound").show("fast");
}

main();
