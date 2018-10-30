const incomeChart = () => {
    let margin = {
        left: 80,
        right: 0,
        top: 10,
        bottom: 80
    };
    let width = 800 - margin.left - margin.right;
    let height = 600 - margin.top - margin.bottom;

    let svg = d3.select("#income-area")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Adding mouse following tooltip
    let tooltip = d3.select("#income-area")
        .append("div")
        .classed("tooltip2", true);
    tooltip.append("div")
        .classed("countryName2", true);
    tooltip.append("div")
        .classed("eachPopulation2", true);
    tooltip.append("div")
        .classed("lifeExpectancy2", true);

    // // X scale
    let x = d3.scaleLog()
        .domain([100, 150000])
        .range([0, width])
        .base(10);

    // Y scale
    let y = d3.scaleLinear()
        .domain([0, 90])
        .range([height, 0]);

    // Area
    let area = d3.scaleLinear()
        .range([20 * Math.PI, 1600 * Math.PI])
        .domain([500, 1500000000]);

    // X axis
    let xAxis = d3.axisBottom(x)
        .tickValues([10, 100, 1000, 10000, 100000])
        .tickFormat(d3.format("$"));

    // Y axis
    let yAxis = d3.axisLeft(y)
        .tickFormat((d) => {
            return d;
        });

    // X Label
    let xLabel = svg.append("text")
        .attr("x", width / 2 - 100)
        .attr("y", height + 50)
        .attr("font-size", "20px")
        .text("Average income per person (USD)");

    // Y Label
    let yLabel = svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -250)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Average Life Expectancy");

    let year = svg.append("text")
        .attr("y", height - 10)
        .attr("x", width - 40)
        .attr("font-size", "40px")
        .attr("opacity", "0.5")
        .attr("text-anchor", "middle")
        .text("1800");

    d3.json("data/SanMateoIncome95_2002.json", function (error, data) {
        data.forEach(function (d) {
            d.Date = d.DATE;
            d.Income = +d.PCPI06081;
        })
    });
    // Time constant
    let time = 0;

    // Color
    let pastelColor1 = d3.scaleOrdinal(d3.schemePastel1);
    let pastelColor2 = d3.scaleOrdinal(d3.schemePastel1);

    x.domain(data.map(function (d) { return d.Letter; }));
    y.domain([0, d3.max(data, function (d) { return d.Freq; })]);

    // add axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 5)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");


    // Add bar chart
    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.Date); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.Income); })
        .attr("height", function (d) { return height - y(d.Freq); });

};
