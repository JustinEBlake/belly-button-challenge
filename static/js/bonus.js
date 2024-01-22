//Display Gauge Code
function gaugeChart(values){
    //Fetch Data
    d3.json(url).then((data)=> {
        //Get all metadata
        let metaData = data.metadata;

        //Filter based on the id used in the drop down menu
        let value = metaData.filter((value)=> value.id == values);

        //Get first index from array to get all data
        let info = value[0];

        //Assign washfrequency to variable
        let washFrq = info.wfreq

        //Check Value
        console.log(`CHECK WASH FREQUENCY = ${washFrq}`)

        let gaugeData = [
            {
                domain: { x: [0, 1], y: [0, 1]},
                value: washFrq,
                title: {text: "Wash Frequency"},
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: {range: [null, 9], tickwidth: 1, tickcolor: "lightblue"},
                    steps: [
                        {range: [0, 1]},
                        {range: [1, 2]},
                        {range: [2, 3]},
                        {range: [3, 4]},
                        {range: [4, 5]},
                        {range: [5, 6]},
                        {range: [6, 7]},
                        {range: [7, 8]},
                        {range: [8, 9]},
                    ]             
                },
                bar: {color: "lightblue"},
                bordercolor: "gray",
            }
        ]

        let layout = { 
            width: 600, 
            height: 400, 
            margin: { t: 0, b: 0 },
            font: {color: "grey", family: "monospace"},
         };
        //Use Plotly to plot chart
        Plotly.newPlot("gauge", gaugeData, layout);
    });
};