import React, { useEffect } from "react";
import * as d3 from "d3";

function extractGain(input) {
    if (!input) return 0;
    const m = String(input).match(/gain:([0-9]*\.?[0-9]+)/);
    return m ? Number(m[1]) : 0;
}

export default function Graph({ data = [] }) {

    useEffect(() => {
        const svg = d3.select("#graph-svg");
        const wrapper = document.querySelector("#graph-wrapper");

        if (!svg.node()) return;

        const rngArray = data.map(d => extractGain(d));
        svg.selectAll("*").remove();

        const rect = wrapper.getBoundingClientRect();
        let w = Math.max(320, rect.width) - 40;
        let h = Math.max(200, rect.height) - 25;

        const chart = svg.append("g")
            .attr("transform", "translate(30,3)");

        const yScale = d3.scaleLinear()
            .domain([0, 1])
            .range([h, 0]);

        const barWidth = w / Math.max(rngArray.length, 1);

        chart.append("g")
            .classed("axis y", true)
            .call(d3.axisLeft(yScale));

        chart.append("linearGradient")
            .attr("id", "line-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0)
            .attr("y1", yScale(0))
            .attr("x2", 0)
            .attr("y2", yScale(1))
            .selectAll("stop")
            .data([
                { offset: "0%", color: "#3b82f6" },
                { offset: "100%", color: "#a855f7" }
            ])
            .enter()
            .append("stop")
            .attr("offset", d => d.offset)
            .attr("stop-color", d => d.color);

        chart.append("path")
            .datum(rngArray)
            .attr("fill", "none")
            .attr("stroke", "url(#line-gradient)")
            .attr("stroke-width", 3)
            .attr("d",
                d3.line()
                    .x((d, i) => i * barWidth)
                    .y(d => yScale(d))
            );

    }, [data]);

    return (
        <div id="graph-wrapper" style={{ width: "100%", height: "260px", padding: "6px" }}>
            <div style={{ textAlign: "right", marginBottom: "4px" }}>
                <button onClick={() => d3.select("#graph-svg").selectAll("*").remove()} className="btn btn-sm btn-danger"> Clear Graph</button>
            </div>
            <svg id="graph-svg" style={{ width: "100%", height: "100%" }} />
        </div>
    );
}
