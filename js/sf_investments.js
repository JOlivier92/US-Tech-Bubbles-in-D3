const SFInvestments = () => {
    let width = 600;
    let height = 500;
    let padding = 45;
    let dataset = [];
    Object.keys(sf_investments).map(key => {
        let dateArr = sf_investments[key].DATE.split("-");
        let date = Number(dateArr[0]) + (1 / 12) * Number(dateArr[2] / 30) + Number(dateArr[1] / 12);
        dataset.push([date, sf_investments[key].SMU06418845552300001]);
    });


    //scale function
    let xScale = d3.scaleLinear()
        //.domain(["Alabama","Alaska","Arizona","Arkansas","California"])
        .domain([1995, 2005])
        //.range([padding, w-padding * 2]);
        .range([padding, width - padding * 2]);

    let yScale = d3.scaleLinear()
        .domain([10, d3.max(dataset, function (d) { return d[1]; })])
        //.range([padding, w-padding * 2]);
        .range([height - padding, padding]);


    let xAxis = d3
        .axisBottom()
        .scale(xScale)
        .ticks(5)
        .tickFormat(d3.format("d"));

    let yAxis = d3.axisLeft().scale(yScale).ticks(5);


    //create svg element
    let svg = d3.select("#investment-area")
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
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -55)
        .attr("x", -250)
        .attr("font-size", "20px")
        .style("text-anchor", "middle")
        .text("Average Income per person living in San Mateo");

    svg.append("text")
        .attr("y", height)
        .attr("x", width - 300)
        .attr("font-size", "40px")
        .attr("opacity", "0.5")
        .style("text-anchor", "middle")
        .text("Year")

    console.log(dataset);

    const area = d3.area()
        .x(function (dataset) { return x(dataset.DATE); })
        .y0(height)
        .y1(function (dataset) { return y(dataset.SMU06418845552300001); });
};
SFInvestments();