import React from 'react';

import "../style/Chart.css"

import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    LineSeries,
    DiscreteColorLegend
  } from 'react-vis';

const Graph = ({data}) => {
    const ITEMS = [
        "CAC40",
        "NASDAQ"
      ];
      const COLORS = [
        '#5B9BD5',
        '#ED7F35',
      ];
  return (
    <div className="container__graph">
          <XYPlot
            width={1400}
            height={500}>
            <HorizontalGridLines style={{stroke: '#E2E2E2'}}/>
            <XAxis style={{
              line: {stroke: '#ffffff'},
              ticks: {stroke: '#E2E2E2'},
              text: {stroke: 'none', fill: '#6b6b76', fontWeight: 800}
            }}/>
            <YAxis style={{
              line: {stroke: '#ffffff'},
              ticks: {stroke: '#E2E2E2'},
              text: {stroke: 'none', fill: '#6b6b76', fontWeight: 800}
            }} />
            <LineSeries
              animation="noWobble"
              className="first-series"
              data={data[0]}
              color="#5B9BD5"
              style={{
                strokeLinejoin: 'round',
                strokeWidth: 4
              }}
            />
            <LineSeries
              animation="noWobble"
              color="#ED7F35"
              className="first-series"
              data={data[1]}
              style={{
                strokeLinejoin: 'round',
                strokeWidth: 4
              }}
            />
          </XYPlot>
            <DiscreteColorLegend
              colors={COLORS}
              orientation="horizontal"
              width={"auto"}
              items={ITEMS}
            />
          </div>
  )
}

export default Graph
