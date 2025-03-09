"strict";

const SUBJECTS = [
    "toan", "ngu_van", "ngoai_ngu", "vat_li", "hoa_hoc",
    "sinh_hoc", "lich_su", "dia_li", "gdcd",
];

/**
 * @typedef {{
 *  sbd: string;
 *  toan: number | null;
 *  ngu_van: number | null;
 *  ngoai_ngu: number | null;
 *  vat_li: number | null;
 *  hoa_hoc: number | null;
 *  sinh_hoc: number | null;
 *  lich_su: number | null;
 *  dia_li: number | null;
 *  gdcd: number | null;
 *  ma_ngoai_ngu: "N1" | "N2" | "N3" | "N4" | "N5" | "N6" | "N7" | null;
 * }} Student 
 */

const CURRENT_PAGE = location.pathname.split('/').pop();

/**
 * HTML anchor element, i.e. <a>
 * @param {string} href 
 * @param {string} text 
 * @returns {JQuery<HTMLElement>}
 */
function Anchor(href, text) {
    if (href.split('/').pop() === CURRENT_PAGE) {
        return $("<a>").html("&nbsp; " + text).addClass("current");
    }
    return $("<a>").attr("href", href).html(text);
}

/**
 * Sidenav
 * @returns {JQuery<HTMLElement>}
 */
function Sidenav() {
    return (
        $("<div>").attr("id", "sidenav").append(
            $("<nav>").append(
                $("<div>").attr("id", "app-title").text("G-Scores"),
                $("<ul>").append(
                    $("<li>").append(Anchor("/index.html", "Dashboard")),
                    $("<li>").append(
                        Anchor("/search-scores.html", "Search Scores")
                    ),
                    $("<li>").append(Anchor("/reports.html", "Reports")),
                )
            )
        )
    )
}

/**
 * Prepare main div's nodes.
 * @param {JQuery<HTMLElement>} content 
 */
function prepareMain(content) {
    const sidebar = Sidenav();
    $("#main").append(sidebar, content.attr("id", "content"));
}

/**
 * 
 * @param {unknown} value 
 * @returns {boolean} Whether `value` is a valid registration number
 */
function isValidRegistrationNumber(value) {
    return typeof value === "string" && value.length === 8 && !isNaN(+value);
}

/**
 * 
 * @param {string} rawName 
 * @returns Subject name in English
 */
function getSubjectName(rawName) {
    switch (rawName) {
        case "toan":
            return "Mathematics";

        case "ngu_van":
            return "Literature";

        case "ngoai_ngu":
            return "Foreign Language";

        case "vat_li":
            return "Physics";

        case "hoa_hoc":
            return "Chemistry";

        case "sinh_hoc":
            return "Biology";

        case "lich_su":
            return "History";

        case "dia_li":
            return "Geography";

        case "gdcd":
            return "Civic Education";

        case "ma_ngoai_ngu":
            return "Foreign Language Code";

        default:
            return "";
    }
}

/**
 * 
 * @param {string} rawName 
 * @returns Subject name in English
 */
function getSubjectShortName(rawName) {
    switch (rawName) {
        case "toan":
            return "Math.";

        case "ngu_van":
            return "Lit.";

        case "ngoai_ngu":
            return "FL";

        case "vat_li":
            return "Phys.";

        case "hoa_hoc":
            return "Chem.";

        case "sinh_hoc":
            return "Bio.";

        case "lich_su":
            return "Hist.";

        case "dia_li":
            return "Geo.";

        case "gdcd":
            return "CE";

        case "ma_ngoai_ngu":
            return "FLC";

        default:
            return "";
    }
}

/**
 * 
 * @param {string} score 
 */
function scoreToString(score) {
    const scoreValue = +score;
    return (
        isNaN(scoreValue) 
        ? score
        : scoreValue.toString().indexOf(".") >= 0 
            ? scoreValue 
            : scoreValue.toString() + ".0"
    );
}
