import "../../../node_modules/react-vis/dist/style.css";
import './charts.css'
import {
  XYPlot,
  LineSeries,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  LabelSeries
} from "react-vis";
import BarchartDist from './barchart_dist'
import Barchart from './barchart'
import LabeledHeatmap from './heatmap'
import PieChart from "./pie_chart";
import ScatterGraph from './scatter'


const Chart = (params) => {
  
  return (
    <div class="wrapper">
      <div class="box a">
        <h3 className="titulo_charts">Distancia recorrida (km)</h3>
        <BarchartDist/>
      </div>
      <div class="box b">
        <h3 className="titulo_charts">Combustimble consumido (l/100km)</h3>
        <ScatterGraph calendar_ranges={params.calendar_ranges}/>
      </div>
      <div class="box c"> 
        <h3 className="titulo_charts">Tipos de infracción</h3>
        <PieChart calendar_ranges={params.calendar_ranges}/>
      </div>
      <div class="box d">
        <h3 className="titulo_charts">Vehículos según la hora y el día</h3>
        <LabeledHeatmap/>
      </div>
      <div class="box e">
        <h3 className="titulo_charts">Tiempo en conducción</h3>
        <Barchart/>
      </div>
    </div>
  );
};

export default Chart;