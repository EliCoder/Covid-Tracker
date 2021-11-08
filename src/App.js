import { React, useEffect, useState } from 'react';
import './App.css';
import {FormControl, Select, MenuItem, Card, CardContent} from '@material-ui/core'
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import {sortData} from './util'
import Graph from './Graph';

function App() {
  const [countries, setCountries] = useState([]); //All countries names
  const [country, setCountry] = useState('worldwide'); //Current country's name
  const [countryInfo, setCountryInfo] = useState({}); //worldwide/specific country Corona info 
  const [tableData, setTableData] = useState([]) //All countries Corona info


  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(res => res.json())
    .then(data => {
      setCountryInfo(data)
    })
  },[])

  useEffect(() => {
    const getCountriesData = async () => {
     await fetch('https://disease.sh/v3/covid-19/countries')
     .then((res) => res.json())
     .then((data) => {
       const countries = data.map((country) => ({
         name: country.country, //UNITED STATES, UNITED KINDOM
         value: country.countryInfo.iso2 //USA, UK, IL
       }));

       const sortedData = sortData(data)
       setTableData(sortedData)
       setCountries(countries)
     });
  };
  getCountriesData(countries);
},[]);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    
    const url =
     countryCode === "worldwide"
    ? 'https://disease.sh/v3/covid-19/all'
    :`https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(res => res.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data)
    })
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1> Eli's COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select 
            variant="outlined" 
            value={country}
            onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map(country => {
                  return <MenuItem value={country.value}>
                    {country.name}
                  </MenuItem>
                })
              }
            </Select>
          </FormControl>
        </div>
        
        {/* Card Statistics */}
        <div className="app__stats">
          <InfoBox 
          title="CoronaVirus cases" 
          total={countryInfo.cases} 
          cases={countryInfo.todayCases}
          />
          <InfoBox 
          title="Recoverd" 
          total={countryInfo.recovered} 
          cases={countryInfo.todayRecovered}
          />
          <InfoBox 
          title="Deaths" 
          total={countryInfo.deaths} 
          cases={countryInfo.todayDeaths} 
          />

       </div>
         
      </div>
      <Card className="app__right">
        <CardContent>
          <h3> Live Cases by Country</h3>
          <Table countries={tableData} />
        <h3>Worldwide new Cases</h3>
        <Graph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
