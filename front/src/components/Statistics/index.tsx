import {ResponsiveBar} from '@nivo/bar'
import React, {useEffect, useState} from 'react'
import s from './MyBar.module.scss'
import {Avatar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {pink} from "@material-ui/core/colors";
import FilterVintageIcon from "@material-ui/icons/FilterVintage";

interface OneColumn {
    last__name: string,
    votes: number,
}
const useStyles = makeStyles((theme) => ({
    icon: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    }
}));
interface Photos {
    photo: string;
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
            'last__name': one_json.last__name + '(' + one_json.people_id_id + ')',
            'votes': Number(one_json.count)
        });
    })
    return array_for_chart;
}

const MyBar: React.FC = () => {
    const [bastards, setBastards] = useState([]);
    const classes = useStyles();
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
    // @ts-ignore
    return (
        <div className={s.rooot}>
            <div className={s.root}>
            <h1 className={s.h1}>Statistics of votes :*</h1>
            <div className={s.chart}>
                <ResponsiveBar
                    theme={{
                        fontSize: 20,
                        fontFamily: 'monospace',
                        textColor: 'white',
                    }
                    }
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
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legendPosition: 'middle',
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{from: 'color', modifiers: [['darker', 0]]}}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            </div>
            <div className={s.icons}>
                {bastards.map(
                    (slaves: Photos) =>
                        <Avatar className={classes.icon} src={'http://' + slaves.photo} alt={'тут должно быть фото'}/>
                )}
            </div>
        </div>
            <FilterVintageIcon style={{fontSize: 40, color: pink[500]}} color={'primary'} className={s.flower}/>
            <FilterVintageIcon style={{fontSize: 60, color: pink[500]}} color={'primary'} className={s.flower_1}/>
            <FilterVintageIcon style={{fontSize: 30, color: pink[500]}} color={'primary'} className={s.flower_2}/>
        </div>

    );
}
export default MyBar;
