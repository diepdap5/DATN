import React, { Component } from 'react';
import CanvasJSReact from '../_helpers/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class DoughnutChart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			title: {
				text: ""
			},
			subtitles: [{
				text: "Total: 100",
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###'%'",
				dataPoints: [
					{ name: "In bucket", y: 50 },
					{ name: "Maintaing", y: 30 },
					{ name: "In progress", y: 20 },
				]
			}]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default DoughnutChart;