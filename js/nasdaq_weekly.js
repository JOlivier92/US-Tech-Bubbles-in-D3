const nasdaqChart = () => {
    console.log("Hi")
    let width = 600;
    let height = 500;
    let padding = 45;
    let dataset = [];
    Object.keys(nasdaq_weekly).map(key => {
      let dateArr = nasdaq_weekly[key].DATE.split("-");
      let date = Number(dateArr[0]) + (1 / 12) * Number(dateArr[2] / 30) + Number(dateArr[1] / 12);
      dataset.push([date, nasdaq_weekly[key].NASDAQCOM]);
    });


    //scale function
    let xScale = d3.scaleLinear()
        //.domain(["Alabama","Alaska","Arizona","Arkansas","California"])
        .domain([1996.7, 2003])
        //.range([padding, w-padding * 2]);
        .range([padding, width - padding * 2]);

    let yScale = d3.scaleLinear()
        .domain([1100, d3.max(dataset, function (d) { return d[1]; })])
        //.range([padding, w-padding * 2]);
        .range([height - padding, padding]);
    

    let xAxis = d3
        .axisBottom()
        .scale(xScale)
        .ticks(5)
        .tickFormat(d3.format("d"));

    let yAxis = d3.axisLeft().scale(yScale).ticks(5);


    //create svg element
    let svg = d3.select("#nasdaq-area")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


    let dataMax = d3.max(dataset, function(d) {
      return d[1];
    });
    dataset.forEach(function (d, i) {
        setTimeout(function () {
            color = `(${Math.round(255 - (d[1] / dataMax)*255)}, ${Math.round((d[1] / dataMax)*255)}, 0)`
            console.log(color)
            svg
              .append("circle")
              .datum(d)
              .attr("cx", xScale(d[0]))
              .attr("cy", yScale(d[1]))
              .attr("r", 2)
              .style("fill", `rgb${color}`)
              .enter();
        }, 50 * i);
    });
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + padding + ", 0)")
        .call(yAxis);
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 12)
      .attr("x", -250)
      .attr("opacity", "0.5")
      .attr("font-size", "18px")
      .style("text-anchor", "middle")
      .text("Index Feb 5th, 1971=100");

    svg.append("text")
        .attr("y", height)
        .attr("x", width - 300)
        .attr("font-size", "32px")
        .attr("opacity", "0.5")
        .style("text-anchor", "middle")
        .text("Year")

    console.log(dataset);
    
    const area = d3.area()
        .x(function (dataset) { return x(dataset.DATE); })
        .y0(height)
        .y1(function (dataset) { return y(dataset.NASDAQCOM); });
    console.log(area);

};
nasdaqChart();



