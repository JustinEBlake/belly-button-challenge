// Assign url to variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data, then console log it
d3.json(url).then((data)=> {
    console.log(data);
    let sampleData = data;
});

// Initialize Chart
function init() {
    //Create variable for dropdown menu
    let dropMenu = d3.select("#selDataset");

    //Fetch JSON data
    d3.json(url).then((data)=>{

        // Assign names to variable that will be used for dropdown
        let names = data.names;

        //Add sample to dropdown menu
        names.map((name)=>{
            dropMenu.append("option").text(name).property("value", name)
        });

        //Get first value from names variable to use for init charts
        init_value = names[0]

        //Initialize Plots
        barChart(init_value);
        bubbleChart(init_value);
        metaData(init_value)

    })
};

// Create BarChart
function barChart(values) {
    //Fetch Data
    d3.json(url).then((data)=> {
        //Get all sample data
        let sampleInfo = data.samples;

        //Filter based on the id used in the drop down menu
        let value = sampleInfo.filter((value)=> value.id == values);

        //Get first index from array to get all data
        let allData = value[0];

        //Get values needed for bar chart from allData
        let otu_ids = allData.otu_ids;
        let otu_labels = allData.otu_labels;
        let sample_values = allData.sample_values;

        //Check values
        console.log(otu_ids, otu_labels, sample_values);

        // Display items in descending order
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();

        //Trace for the bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        let barData = [trace]

        //Setup layout
        let layout = {
            title: "Top 10 OTUs"
        };

        //Use Plotly to plot chart
        Plotly.newPlot("bar", barData, layout);
    });
};


//Create Bubble Chart
function bubbleChart(values) {
    //Fetch Data
    d3.json(url).then((data)=> {
        //Get all sample data
        let sampleInfo = data.samples;

        //Filter based on the id used in the drop down menu
        let value = sampleInfo.filter((value)=> value.id == values);

        //Get first index from array to get all data
        let allData = value[0];

        //Get values needed for bar chart from allData
        let otu_ids = allData.otu_ids;
        let otu_labels = allData.otu_labels;
        let sample_values = allData.sample_values;

        //Trace for the bar chart
        let trace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids
            }
        };

        let bubbleData = [trace]

        //Setup layout
        let layout = {
            title: "Top 10 OTUs"
        };

        //Use Plotly to plot chart
        Plotly.newPlot("bubble", bubbleData, layout);
    });
};

//Display Demographic Info
function metaData(values){
    //Assign info panel to variable
    let infoPanel = d3.select(".panel-body");

    d3.json(url).then((data)=> {
        //Get all metadata
        let metaData = data.metadata;

        //Filter based on the id used in the drop down menu
        let value = metaData.filter((value)=> value.id == values);

        //Get first index from array to get all data
        let info = value[0];

        //Check data
        console.log(info);

        //Append metainfo to info panel
        let metaInfo = Object.keys(info).forEach((key)=>{
            console.log(`${key}: ${info[key]}`);
            infoPanel.append("h5").text(`${key}: ${info[key]}`)
        });
    });
};
init()