const nasdaqChart = () => {
    console.log("Hi")
    let width = 600;
    let height = 400;
    let padding = 40;
    let dataset = [];
    Object.keys(nasdaq_weekly).map(key => {
      let dateArr = nasdaq_weekly[key].DATE.split("-");
      let date = Number(dateArr[0]) + (1 / 12) * Number(dateArr[2] / 30) + Number(dateArr[1] / 12);
      dataset.push([date, nasdaq_weekly[key].NASDAQCOM]);
    });


    //scale function
    let xScale = d3.scaleLinear()
        //.domain(["Alabama","Alaska","Arizona","Arkansas","California"])
        .domain([1996, 2003])
        //.range([padding, w-padding * 2]);
        .range([padding, width - padding * 2]);

    let yScale = d3.scaleLinear()
        .domain([1000, d3.max(dataset, function (d) { return d[1]; })])
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

    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xScale(d[0]);
        })
        .attr("cy", function (d) {
            return yScale(d[1]);
        })
        .attr("r", 2)
        .attr("fill", "#FFFFF");
    
    //x axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);

    //y axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + padding + ", 0)")
        .call(yAxis);
    


    svg.append("text")
        .attr("x", width / 2 - 100)
        .attr("y", height + 50)
        .attr("font-size", "20px")
        .text("Year");

    // Y Label
    let yLabel = svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -55)
        .attr("x", -250)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Average Income per person living in San Mateo");

    let year = svg.append("text")
        .attr("y", height - 10)
        .attr("x", width - 40)
        .attr("font-size", "40px")
        .attr("opacity", "0.5")
        .attr("text-anchor", "middle")

    console.log(dataset);


};
nasdaqChart();