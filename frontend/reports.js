"strict";

let subject = "";

Object.defineProperty(this, subject, {
    get: () => subject,
    set: (value) => {
        subject = value;
        return subject;
    }
})

function main() {
    prepareMain(
        $("<div>").append(
            $("<h1>").text("Reports"),
            ReportFormBox("Report by Subject", "Subject:", "toan"),
            ReportBox(),
        ),
    );
}

/**
 * @param {string} title
 * @param {string} field
 * @param {string} defaultValue
 * @returns
 */
function ReportFormBox(title, field, defaultValue) {
    const select = $("<select>").attr("name", "subject").append(
        SUBJECTS.map((subject) => (
            $(subject === defaultValue ? "<option selected>" : "<option>")
            .val(subject)
            .text(getSubjectName(subject))
        )),
    );
    return $("<div>").addClass("formbox").append(
        $("<form>").on("submit", onSubmitReportForm).append(
            $("<h2>").text(title),
            $("<p>").text(field),
            $("<div>").append(select, $("<input>").attr("type", "submit")),
        ),
    );
}

function ReportBox() {
    return $("<div>").attr("id", "report-box").addClass("resultbox").append(
        $("<h3>").attr("id", "report-title"),
        $("<div>").attr("id", "report-chart")
    );
}

/**
 * 
 * @param {JQuery.SubmitEvent<
 *  HTMLElement, undefined, HTMLElement, HTMLElement
 * >} event 
 */
function onSubmitReportForm(event) {
    event.preventDefault();
    /** @type {HTMLFormElement} */ // @ts-ignore
    const form = event.currentTarget;
    if (form) {
        const formData = new FormData(form);
        // @ts-ignore
        subject = formData.get("subject");
    }
    if (typeof subject !== "string" || SUBJECTS.indexOf(subject) < 0) {
        return;
    }
    $.ajax({
        url: SERVER_ENDPOINT + "report/" + subject + "/",
        type: "GET",
        crossDomain: true,
        headers: {
            accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        success: onSubmitReportFormSuccess,
        error: (xhr, status, error) => {
            console.warn("error:", status, error);
            alert(`⚠️ Subject ${subject} is not found! ⚠️`);
        },
    });
}

/**
 * 
 * @param {any} response 
 */
function onSubmitReportFormSuccess(response) {
    console.log("success:", response);
    /** @type {number} */ // @ts-ignore
    const boxWidth = Math.min(500, $("#report-box").width());
    const graphMargin = 50;
    const graphWidth = boxWidth - 2 * graphMargin;
    const graphHeight = 250;
    const chart = $("#report-chart").html("").hide();
    makeBarChart(
        "#report-chart",
        response,
        {
            width: graphWidth,
            height: graphHeight,
            marginLeft: graphMargin,
            marginRight: 0,
            barWidth: boxWidth / 8,
        },
    );
    chart.append(
        $("<p>")
        .css("text-align", "left")
        .css("font-size", "small")
        .html(
            "<span style='font-weight:bold;padding-left:10px;'>X axis</span>"
            + "<br>"
            + "Level 1: Scores greater than or equal to 8<br>"
            + "Level 2: Scores from 6 (inclusive) to 8 (exclusive)<br>"
            + "Level 3: Scores from 4 (inclusive) to 6 (exclusive)<br>"
            + "Level 4: Scores less than 4<br><br>"
            + "<span style='font-weight:bold;padding-left:10px;'>Y axis</span>"
            + "<br>Number of students"
        )
    ).show("slow");
    $("#report-title").text(
        "Numbers of Students by Levels in " 
        + getSubjectName(subject)
    );
}

main();