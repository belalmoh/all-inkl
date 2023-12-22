import { useContext, useEffect, useState, useMemo } from "react";
import { Chart } from "react-google-charts";

import { AppActions, AppContext } from "../../contexts/AppContext";
import RadioButtons from "../../components/RadioButtons";

const Results = () => {

    const {state, dispatch} = useContext(AppContext);

    const [columnNames, setColumnNames] = useState([]);
    const [transformedData, setTransformedData] = useState([]);

    const handleSelection = (selected, axis) => {
        if(axis == 'x') {
            dispatch({type: AppActions.SET_X_AXIS, payload: {xAxis: selected}});
        } else if (axis == 'y') {
            dispatch({type: AppActions.SET_Y_AXIS, payload: {yAxis: selected}});
        }
    }

    const transformData = () => {
        const result = state.databaseResults.map((data) => ([data[state.xAxis], Number(data[state.yAxis])])) || [];
        
        if (result.length) {
            setTransformedData([[state.xAxis, state.yAxis], ...result]);
        } else {
            setTransformedData([]);
        }

    }

    useEffect(() => {
        if(state.databaseResults && state.databaseResults.length) {
            const columnNames = Object.keys(state.databaseResults[0]);
            setColumnNames(columnNames);
        }
    }, [state.databaseResults]);

    useEffect(() => {
        transformData();
    }, [state.xAxis, state.yAxis]);


    const options = (state.xAxis && state?.yAxis) && {
        // title: "Population of Largest U.S. Cities",
        chartArea: { width: "50%" },
        hAxis: {
          title: state?.xAxis ?? '',
        },
        vAxis: {
          title: state?.yAxis ?? '',
        },
    };


    return (
        <div>
            <RadioButtons values={columnNames} selectedIndex={0} handleSelection={(selected) => handleSelection(selected, 'x')} />
            <RadioButtons values={columnNames} selectedIndex={0} handleSelection={(selected) => handleSelection(selected, 'y')} />
            {transformedData.length ? 
                <Chart
                    chartType="BarChart"
                    width="100%"
                    height="400px"
                    data={transformedData}
                    options={options}
                />
                :
                "Nothing to show for now"
            }
        </div>
    );
}

export default Results;