import {ResponsiveBar} from '@nivo/bar'
import React, {useEffect, useState} from 'react'
import s from './MyBar.module.scss'
interface IDataPoints {
    dataPoints: Array<OneColumn>;
}
interface OneColumn {
    last_name: number,
    count: number,
}
interface ArrayOfPhoto {
    photos: Array<Photos>;
}
interface Photos {
    photo: string;
}

const MyBar: React.FC<IDataPoints> = (data) => {
    const [bastards, setBastards] = useState([]);
    useEffect(() => {

    })
    return (
        <div className={s.root}>
            <ResponsiveBar
                data={(data as IDataPoints).dataPoints}
                keys={['count']}
                indexBy={'last_name'}
                margin={{top: 50, right: 130, bottom: 50, left: 60}}
                padding={0.3}
                valueScale={{type: 'linear'}}
                indexScale={{type: 'band', round: true}}
                colors={{scheme: 'nivo'}}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#f50093',
                        size: 4,
                        padding: 1,
                        stagger: true
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'count'
                        },
                        id: 'dots'
                    },
                ]}
                borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'person',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'votes',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            /></div>);
}

export default MyBar;
