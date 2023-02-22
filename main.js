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

        const X_SCALE = d3
          .scaleBand()
          .range([0, VIS_WIDTH])
          .domain(
            data.map(function (d) {
              return d.Category;
            })
          )
          .padding(0.2);

        const MAX_Y = d3.max(data, (d) => {
          return parseInt(d.Value);
        });

        const Y_SCALE = d3
          .scaleLinear()
          .domain([0, MAX_Y + 1])
          .range([VIS_HEIGHT, 0]);

        FRAME.selectAll("bars")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", function (d) {
            return X_SCALE(d.Category) + MARGINS.left;
          })
          .attr("y", function (d) {
            return Y_SCALE(d.Value) + MARGINS.bottom;
          })
          .attr("width", X_SCALE.bandwidth())
          .attr("height", function (d) {
            return VIS_HEIGHT - Y_SCALE(d.Value);
          })
          .attr("class", "bar");

        FRAME.append("g")
          .attr(
            "transform",
            "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")"
          )
          .call(d3.axisBottom(X_SCALE).ticks(5))
          .attr("font-size", 12);

        FRAME.append("g")
          .attr("transform", `translate( ${MARGINS.bottom}, ${MARGINS.left})`)
          .call(d3.axisLeft(Y_SCALE).ticks(5))
          .attr("font-size", 12);
    }
)