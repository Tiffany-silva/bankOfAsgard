/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const today = dayjs();

const DatePicker = ({ value, onChange }) => {
    const handleDateChange = (date) => {
        const year = dayjs(date).get('year');
        const month = dayjs(date).get('month') + 1;
        const day = dayjs(date).get('date');

        onChange(`${year}-${month}-${day}`);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MUIDatePicker
                maxDate={ today }
                openTo="year"
                views={ ["year", "month", "day"] }
                yearsOrder="desc"
                className="mui-input date-picker"
                defaultValue={ (value === "") ? today : dayjs(value) }
                onChange={ (date) => handleDateChange(date) }
                disableFuture
            />
        </LocalizationProvider>
    );
}

DatePicker.propTypes = {
    onChange: PropTypes.object.isRequired,
    value: PropTypes.object.isOptional
};

export default DatePicker;
