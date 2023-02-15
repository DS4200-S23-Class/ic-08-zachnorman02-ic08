const FRAME_HEIGHT = 600;
const FRAME_WIDTH = 200;
const MARGINS = { left: 50, right: 50, top: 50, bottom: 50 };
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const FRAME = d3.select('#vis')
    .append('svg')
    .attr('width', FRAME_WIDTH)
    .attr('height', FRAME_HEIGHT)
    .attr('class', 'frame');

d3.csv('data/data.csv').then(
    (data) => {
        console.log(data);

        const MAX_Y = d3.max(data, (d) => {
          return parseInt(d.Value);
        });

        const Y_SCALE = d3
          .scaleLinear()
          .domain([0, MAX_Y])
          .range([0, VIS_HEIGHT]);

        FRAME.selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("y", (d) => {
            return 500-Y_SCALE(parseInt(d.Value));
          })
          .attr("x", (d, i) => {
            return (i * 20) + MARGINS.left;
          })
          .attr("height", (d) => {
            return Y_SCALE(parseInt(d.Value));
          })
          .attr("width", 10)
          .attr("class", "bar");

        FRAME.append("g")
          .attr(
            "transform",
            "translate(" + (VIS_WIDTH + MARGINS.left + MARGINS.right) + "," + MARGINS.top + ")"
          )
          .call(d3.axisLeft(Y_SCALE).ticks(4))
          .attr("font-size", 20);
        
        FRAME.append("g")
          .attr(
            "transform",
            "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")"
          )
          .call(
            d3
              .axisBottom(Y_SCALE)
              .tickFormat(function (d) {
                return d.Category;
              })
              .ticks(4)
          )
          .attr("font-size", 20);
    }
)