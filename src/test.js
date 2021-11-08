import {Line} from 'react-chartjs-2'
import {useState, useEffect} from 'react'
import numeral from 'numeral'

 const options = {
  legend : {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  };


const Graph = () => {
    const [data, setData] = useState()

    const buildChardData = (data, casesType='cases') => {
        const chartData = [];
        let lastDataPoint;
        for(let date in data.cases) {
         if (lastDataPoint) {
           const newDataPoint = {
             x: date,
             y: data[casesType][date] - lastDataPoint
           }
           chartData.push(newDataPoint)
       }
       lastDataPoint = data[casesType][date];
     };
     return chartData;
    }

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdadys=120')
        .then(res => res.json())
        .then(data => {
          const chartData = buildChardData(data);
          setData(chartData);
        });
    },[]);

    return (
        <div>
          <Line 
           options={options}
            data={{
              datasets: [{
                backgroundColor: "rgba(204, 16, 52, 0.5)", 
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }
        }
           />
        </div>
    )
}

export default Graph
