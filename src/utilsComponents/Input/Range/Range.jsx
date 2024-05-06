import React, { useEffect, useState } from "react";
import "./Range.sass";

/**
 * @typedef {Object} RangeConfig
 * @property {Number} [min=0]
 * @property {Number} [max=100]
 * @property {Number}current_min
 * @property {Number} current_max
 * @property {Function} [callback=()=>()]
 * @property {Number} diff
 */

/**
 *
 * @param {RangeConfig} props
 * @returns
 */

const RangeInput = (props) => {
  const {
    min: min_value = !props.min ? 0 : props.min,
    max: max_value = !props.max ? 100 : props.max,
    current_min = min_value,
    current_max = max_value,
    // diff,
    callback,
  } = props;
  let [min, max] = [min_value, max_value];
  const [minValue, setMinValue] = useState(current_min);
  const [maxValue, setMaxValue] = useState(current_max);
  const [leftSlider, setLeftSlider] = useState(getPercent(current_min, max));
  const [rightSlider, setRightSlider] = useState(getPercent(current_max, max));

  const handleMinValue = (e) => {
    let value = e.target.value === "" ? min : e.target.value;
    if (checkDiff(value, maxValue)) {
      setMinValue(value);
      let left_gap = min > 0 && value <= min ? getPercent(min, max).replace("%", "") : 0;
      let percent_value = getPercent(value, max).replace("%", "") - left_gap + "%";
      setLeftSlider(percent_value);
    }
  };
  const hanldeMaxValue = (e) => {
    let value = e.target.value === "" ? max : e.target.value;
    // && value <= max
    if (checkDiff(minValue, value)) {
      setMaxValue(value);
      setRightSlider(getPercent(value, max));
    }
  };

  /**
   *
   * @param {Number} min
   * @param {Number} max
   * @returns
   */
  const checkDiff = (min, max) => {
    // let diff = max - min;
    // if (diff < props.diff) return false;
    //else
    return true;
  };
  useEffect(() => {
    callback(minValue, maxValue);
  }, [minValue, maxValue]);

  return (
    <div className="filter_container">
      <div className="title"></div>
      <div className="form_content">
        <div className="input_text_row">
          <div className="block">
            <label htmlFor="min">Min </label>
            <input type="text" onChange={handleMinValue} value={minValue} name="" id="min" />
          </div>
          <div className="space"> </div>
          <div className="block">
            <label htmlFor="max">Max </label>
            <input type="text" onChange={hanldeMaxValue} value={maxValue} name="" id="max" />
          </div>
        </div>

        {/* //// */}
        <div className="input_slider_row">
          <div className="slider_line_b">
            <div className="slider_line" style={{ left: leftSlider }}></div>
            <div className="slider_right" style={{ left: rightSlider }}></div>
          </div>
          <input type="range" name="min_range" onChange={handleMinValue} min={min} max={max} id="min_range" value={minValue} />
          <input type="range" name="max_range" onChange={hanldeMaxValue} min={min} max={max} id="max_range" value={maxValue} />
        </div>
      </div>
    </div>
  );
};

/**
 *
 * @param {Number} value
 * @param {Number} repere
 * @returns
 */

const getPercent = (value, repere) => {
  let percent = ((value * 100) / repere).toFixed(0);
  return percent + "%";
};

export default RangeInput;
