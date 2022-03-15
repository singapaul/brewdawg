import './App.scss';
import Banner from './Containers/Banner/Banner';
import Hero from './Containers/Hero/Hero';
// temporary! ==> import the data file =? will use API later! 
import tempData from "./assets/data/sampleData.js"
import Grid from './Containers/Grid/Grid';

function App() {
  return (
    <div className="App">
      <Hero/>
      <Banner/>
      <Grid tempData={tempData} />

    </div>
  );
}

export default App;
