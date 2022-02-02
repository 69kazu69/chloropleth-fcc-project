let curl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
let eurl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"

let cdata
let edata

let canvas = d3.select("#canvas")

let drawMap = () => {

    canvas.selectAll("path").data(cdata)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "county")
    .attr("fill", (item) => {
        let id = item["id"]
        let county = edata.find((i) => {
            return item['fips'] === id
        })
    })

}


d3.json(
    curl
).then(
    (data, error) => {
        error ? 
            console.log(err)
        :
        cdata = topojson.feature(data, data.objects.counties).features
        console.log(cdata)
    }
)

d3.json(eurl)
    .then(
        (data, err) => {
            err ?
            console.log(err)
            :
            edata = data
            console.log(edata)
            drawMap()
        }
    )