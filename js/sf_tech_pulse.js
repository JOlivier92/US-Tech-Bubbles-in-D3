const SFTechPulse = () => {
    let width = 600;
    let height = 500;
    let padding = 45;
    let dataset = [];
    Object.keys(sf_tech_pulse).map(key => {
        let dateArr = sf_tech_pulse[key].DATE.split("-");
        let date = Number(dateArr[0]) + (1 / 12) * Number(dateArr[2] / 30) + Number(dateArr[1] / 12);
        dataset.push([date, sf_tech_pulse[key].SFTPINDM114SFRBSF]);
    });


    //scale function
    let xScale = d3.scaleLinear()
        .domain([1991, 2004])
        .range([padding, width - padding * 2]);

    let yScale = d3.scaleLinear()
        .domain([13, d3.max(dataset, function (d) { return d[1]; })])
        .range([height - padding, padding]);


    let xAxis = d3
        .axisBottom()
        .scale(xScale)
        .ticks(5)
        .tickFormat(d3.format("d"));

    let yAxis = d3.axisLeft().scale(yScale).ticks(5);

    let svg = d3.select("#tech-pulse-area")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    let dataMax2 = d3.max(dataset, function (d) {
        return d[1];
    });
    dataset.forEach(function (d, i) {
        color = `(${Math.round(255 - (d[1] / dataMax2) * 255)}, ${Math.round((d[1] / dataMax2) * 255)}, 0)`
        setTimeout(function () {
            svg
              .append("circle")
              .datum(d)
              .attr("cx", xScale(d[0]))
              .attr("cy", yScale(d[1]))
              .attr("r", 2)
              .style("fill", `rgb${color}`)
              .enter();
        }, 100 * i);
    });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + padding + ", 0)")
        .call(yAxis);

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 15)
        .attr("x", -250)
        .attr("opacity", "0.5")
        .attr("font-size", "20px")
        .style("text-anchor", "middle")
        .text("SF Tech Pulse (fred)");

    svg.append("text")
        .attr("y", height)
        .attr("x", width - 300)
        .attr("font-size", "32px")
        .attr("opacity", "0.5")
        .style("text-anchor", "middle")
        .text("Year")
};
SFTechPulse();