let curl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
let eurl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"

let cdata
let edata

let canvas = d3.select("#canvas")
let tooltip = d3.select("#tooltip")

let drawMap = () => {

    canvas.selectAll("path").data(cdata)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "county")
    .attr("fill", (item) => {
        let id = item["id"]
        let county = edata.find((i) => {
            return i['fips'] === id
        })
        let percentage = county.bachelorsOrHigher
        if(percentage <= 15){
            return "red"
        }else if(percentage <= 30){
            return "orange"
        }else if(percentage <= 45){
            return "lightgreen"
        }else{
            return "limegreen"
        }
    })
    .attr("data-fips", i => {
        return i.id
    })
    .attr("data-education", i => {
        let id = i.id
        let county = edata.find((item) => {
            return item["fips"] === id
        })
        let percentage = county.bachelorsOrHigher
        return percentage
    })
    .on("mouseover", (event, item) => {
        tooltip.transition()
        .style("visibility", "visible")

        let id = item.id
        let county = edata.find((i) => {
            return i.fips === id
        })
        tooltip.text(county.fips + "-" + county.area_name + "-" + county.state + ":" + county.bachelorsOrHigher + "%") 
        tooltip.attr("data-education", county.bachelorsOrHigher)
    })
    .on("mouseout", i => {
        tooltip.transition()
        .style("visibility", "hidden")
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