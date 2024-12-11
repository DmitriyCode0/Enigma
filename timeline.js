// Timeline Data
const timelineData = [
    { label: "Вчора", description: "Дії, які вже відбулись у минулому.", time: "past", group: "main" },
    { label: "Прямо зараз", description: "Дії, які відбуваються у поточний момент часу.", time: "now", group: "main" },
    { label: "Завтра", description: "Дії, які стануться у майбутньому.", time: "future", group: "main" },
    { label: "Загалом", description: "Ширший контекст, який включає теперішнє.", time: "general", group: "secondary" },
];

// Dynamically set container width
const containerWidth = document.getElementById("timeline").offsetWidth;

// Dimensions
const height = 300;
const margin = { top: 20, right: 20, bottom: 50, left: 50 };

// Create SVG Containers for Two Timelines
const svgMain = d3
    .select("#timeline")
    .append("svg")
    .attr("width", containerWidth)
    .attr("height", height)
    .style("background-color", "#f9f9f9")
    .style("border", "1px solid #ddd")
    .style("margin-bottom", "20px");

const svgSecondary = d3
    .select("#timeline")
    .append("svg")
    .attr("width", containerWidth)
    .attr("height", height / 2)
    .style("background-color", "#f9f9f9")
    .style("border", "1px solid #ddd");

// Filter Data by Group
const mainData = timelineData.filter(d => d.group === "main");
const secondaryData = timelineData.filter(d => d.group === "secondary");

// Create Scales for Both Timelines
const xScaleMain = d3.scalePoint()
    .domain(mainData.map(d => d.time))
    .range([margin.left, containerWidth - margin.right]);

const xScaleSecondary = d3.scalePoint()
    .domain(secondaryData.map(d => d.time))
    .range([margin.left, containerWidth - margin.right]);

// Draw Main Timeline Line
svgMain.append("line")
    .attr("x1", margin.left)
    .attr("x2", containerWidth - margin.right)
    .attr("y1", height / 2)
    .attr("y2", height / 2)
    .attr("stroke", "#004080")
    .attr("stroke-width", 2);

// Draw Secondary Timeline Line
svgSecondary.append("line")
    .attr("x1", margin.left)
    .attr("x2", containerWidth - margin.right)
    .attr("y1", height / 4)
    .attr("y2", height / 4)
    .attr("stroke", "#004080")
    .attr("stroke-width", 2);

// Add Circles and Labels for Main Timeline
svgMain.selectAll("circle")
    .data(mainData)
    .enter()
    .append("circle")
    .attr("cx", d => xScaleMain(d.time))
    .attr("cy", height / 2)
    .attr("r", 10)
    .attr("fill", "#004080")
    .on("mouseover", function (event, d) {
        d3.select(this).attr("fill", "#80bfff");
        tooltip.transition().style("opacity", 1);
        tooltip.html(`<strong>${d.label}</strong><br>${d.description}`)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 28}px`);
    })
    .on("mouseout", function () {
        d3.select(this).attr("fill", "#004080");
        tooltip.transition().style("opacity", 0);
    });

svgMain.selectAll("text")
    .data(mainData)
    .enter()
    .append("text")
    .attr("x", d => xScaleMain(d.time))
    .attr("y", height / 2 + 30)
    .attr("text-anchor", "middle")
    .text(d => d.label)
    .attr("fill", "#004080")
    .style("font-size", "14px")
    .style("font-weight", "bold");

// Add Labels for Secondary Timeline (No Circles)
svgSecondary.selectAll("text")
    .data(secondaryData)
    .enter()
    .append("text")
    .attr("x", d => xScaleSecondary(d.time))
    .attr("y", height / 4 + 30)
    .attr("text-anchor", "middle")
    .text(d => d.label)
    .attr("fill", "#004080")
    .style("font-size", "14px")
    .style("font-weight", "bold");

// Tooltip
const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background-color", "white")
    .style("padding", "8px")
    .style("border", "1px solid #ddd")
    .style("border-radius", "5px")
    .style("opacity", 0)
    .style("pointer-events", "none");
