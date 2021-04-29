import {ResponsiveBar} from '@nivo/bar'
import React, {useEffect, useState} from 'react'
import s from './MyBar.module.scss'
interface IDataPoints {
    dataPoints: Array<OneColumn>;
}
interface OneColumn {
    last__name: string,
    votes: number,
}
interface ArrayOfPhoto {
    photos: Array<Photos>;
}
interface Photos {
    photo: string;
}
interface ArrBackResp {
    array: Array<BaskResponse>,
}
interface BaskResponse {
    people_id_id: number,
    count: string,
    photo: string,
    description: string,
    first__name: string,
    middle__name: string,
    last__name: string,
}
function getDataForChart(data: Array<BaskResponse>) {
    let array_for_chart: Array<OneColumn> = [];
    data.map((one_json) => {
        array_for_chart.push({
            'last__name': one_json.last__name,
            'votes': Number(one_json.count)
        })
    })
    return array_for_chart;
}

const MyBar: React.FC = () => {
    const [bastards, setBastards] = useState([]);
    useEffect(() => {
        fetch('/api/voting/list_with_votes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((async response => {return await response.json() as Array<BaskResponse>;}))
            .then(data => {
                if(bastards.length !== data.length) {
                    // @ts-ignore
                    setBastards(data);
                }
            });
    },[bastards]);
    return (
        <div className={s.root}>
            <h1 className={s.h1}>Statistics of votes :*</h1>
            <div className={s.chart}>
            <ResponsiveBar
                data={getDataForChart(bastards)}
                keys={['votes']}
                indexBy={'last__name'}
                margin={{top: 50, right: 130, bottom: 50, left: 60}}
                padding={0.3}
                valueScale={{type: 'linear'}}
                indexScale={{type: 'band', round: true}}
                colors={{scheme: 'purple_red'}}
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
                            id: 'votes'
                        },
                        id: 'dots'
                    },
                ]}
                borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 10,
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
                labelTextColor={{from: 'color', modifiers: [['darker', 0]]}}

                animate={true}
                motionStiffness={90}
                motionDamping={15}
            /></div>
        </div>);
}

export default MyBar;
