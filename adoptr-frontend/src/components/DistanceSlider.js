
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

function valueLabelFormat(value) {
    const [coefficient, exponent] = value
        .toExponential()
        .split('e')
        .map((item) => Number(item));
    return `${Math.round(coefficient)}e^${exponent}`;
}

export default function DistanceSlider(props) {


    const handleChange = (event, newValue) => {
        props.setValue(newValue);
    };

    return (
        <div style={{ width: '200px', display: 'flex' }}>
            <Typography id="non-linear-slider" gutterBottom>
                Max Distance
      </Typography>
            <Slider
                value={props.value}
                min={1}
                step={1}
                max={101}
                scale={(x) => x ** 10}
                getAriaValueText={valueLabelFormat}
                valueLabelFormat={props.value.toFixed(0) != 101 ? props.value.toFixed(0) : '100+'}
                onChange={handleChange}
                valueLabelDisplay="on"
                aria-labelledby="non-linear-slider"
            />
        </div>
    );
};