"strict";

function main() {
    prepareMain(
        $("<div>").append(
            $("<h1>").text("Dashboard"),
            Dashboard(),
        ),
    );
    $.ajax({
        url: SERVER_ENDPOINT + "top/",
        type: "GET",
        crossDomain: true,
        headers: {
            accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        success: onLoadDashboardSuccess,
        error: onLoadDashboardFailure,
    });
}

function Dashboard() {
    return $("<div>").addClass("resultbox").append(
        $("<h2>").text("Top 10 Students (Group A)"),
        $("<div>").attr("id", "topstudentslist"),
        $("<p>").text("⌛ Loading...").attr("id", "topstudentsmessage"),
    );
}

/**
 * 
 * @param {number} top
 * @param {Student} student 
 */
function TopStudent(top, student) {
    // @ts-ignore
    const keys = SUBJECTS.filter((key) => student[key] !== null);
    const topValue = (
        top === 1 
        ? "🥇" 
        : top === 2 
            ? "🥈" 
            : top === 3 
                ? "🥉" 
                : top.toString() + "."
    );
    return $("<div>").attr("id", "topstudent").append(
        $("<h4>").text(topValue + " Registration Number " + student.sbd),
        $("<table>").addClass("table topstudenttable").append(
            $("<tr>").append(
                ...keys.map((key) => $("<th>").text(getSubjectShortName(key))),
                $("<th>").text("Group A")
            ),
            $("<tr>").append(
                ...keys.map((key) => $("<td>").text( // @ts-ignore
                    scoreToString(student[key])
                )),
                $("<td>").text(scoreToString(( // @ts-ignore
                    +student.toan + +student.vat_li + +student.hoa_hoc
                ).toString())),
            ),
        )
    );
}

/** @type {JQuery.TypeOrArray<JQuery.Ajax.SuccessCallback<any>>} */
const onLoadDashboardSuccess = (response) => {
    console.log("success:", response);
    $("#topstudentsmessage").hide();
    (
        $("#topstudentslist")
        .html("")
        .append(...response.students.map( // @ts-ignore
            (student, i) => TopStudent(i + 1, student)
        ))
        // .append(
        //     $("<tr>").append(...[
        //         "Top", "R. No.", 
        //         ...[...SUBJECTS, "ma_ngoai_ngu"].map(getSubjectName),
        //     ].map((s) => $("<th>").text(s))),
        //     // @ts-ignore
        //     ...response["students"].map((student, i) => (
        //         $("<tr>").append(...[
        //             i + 1, student.sbd, student.toan, student.ngu_van,
        //             student.ngoai_ngu, student.vat_li, student.hoa_hoc,
        //             student.sinh_hoc, student.lich_su, student.dia_li,
        //             student.gdcd, student.ma_ngoai_ngu,
        //         ].map((s) => $("<td>").text(s)))
        //     ))
        // )
        .show("fast")
    );
};

/** @type {JQuery.TypeOrArray<JQuery.Ajax.ErrorCallback<any>>} */
const onLoadDashboardFailure = (xhr, status, error) => {
    console.warn("error:", status, error);
    $("#topstudentslist").hide();
    $("#topstudentsmessage").text("🚧 Failed to retrieve data").show("fast");
};

main();
