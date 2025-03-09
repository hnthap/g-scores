
/**
 * 
 * @param {string} selector
 * @param {{ [key: string]: number }} data
 * @param {{
 *  width?: number;
 *  height?: number;
 *  marginTop?: number;
 *  marginRight?: number;
 *  marginBottom?: number;
 *  marginLeft?: number;
 *  barWidth?: number;
 *  xLabel?: string;
 *  yLabel?: string;
 * }} options 
 */
function makeBarChart(selector, data, options) {
    const width = options.width ?? 480;
    const height = options.height ?? 300;
    const marginTop = options.marginTop ?? 20;
    const marginRight = options.marginRight ?? 20;
    const marginBottom = options.marginBottom ?? 30;
    const marginLeft = options.marginLeft ?? 40;
    const barWidth = options.barWidth ?? 40;
    const xLabel = options.xLabel ?? "x";
    const yLabel = options.yLabel ?? "y";

    const keys = Object.keys(data);
    const values = keys.map((key) => data[key]);

    const svg = (
        d3.select(selector)
        .append("svg")
        .attr("width", width + marginLeft + marginRight)
        .attr("height", height + marginTop + marginBottom)
    );

    const xScale = d3.scaleBand().domain(keys).range([0, width]);
    const xAxis = d3.axisBottom(xScale);
    (
        svg.append("g")
        .attr("transform", `translate(${marginLeft}, ${marginTop + height})`)
        .call(xAxis)
    );

    const yScale = (
        d3.scaleLinear()
        .domain([0, Math.max(...values)])
        .range([height, 0])
    );
    const yAxis = d3.axisLeft(yScale);
    (
        svg.append("g")
        .attr("transform", `translate(${marginLeft}, ${marginTop})`)
        .call(yAxis)
    );

    for (let i = 0; i < values.length; ++i) {
        const g = svg.append("g");
        const x = (
            i * (width / values.length) 
            + (width / values.length) / 2 
            - barWidth / 2
        );
        const scale = yScale(values[i]);
        (
            g.append("rect")
            .attr("x", x)
            .attr("y", scale)
            .attr("height", height - scale)
            .attr("width", barWidth)
            .attr("fill", "#88aaee")
            .attr("transform", `translate(${marginLeft}, ${marginTop})`)
        );
        (
            g.append("text")
            .attr("x", x)
            .attr("y", scale)
            .text(values[i])
            .attr("transform", `translate(${marginLeft}, ${marginTop - 2})`)
        )
    }
}