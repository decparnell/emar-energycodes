import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const GlobalDropDown = (props) => {
  const label = props.label;
  const items = props.items;
  const value = props.stateVal;
  const labelValue = props.labelValue;
  const labelKey = props.labelKey;
  const handleChange = props.handleChange;
  // searchTyp : {Market Messages, Scenario Variant, Schedules code}
  const searchType = props.searchType;

  return (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <InputLabel id="demo-simple-select-helper-label" size="small">
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={value}
        label={label}
        onChange={handleChange}
        size="small"
        defaultValue=""
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {
          searchType === "Codes Schedules" ?
            items.map((item) => {
              return (
                <MenuItem value={item} key={item[labelKey]}>
                  {item[labelValue]}
                </MenuItem>
              );
            })
            :
            items.map((item) => {
              return (
                <MenuItem value={item[labelValue]} key={item[labelKey]}>
                  {item[labelValue]}
                </MenuItem>
              );
            })

        }



      </Select>
    </FormControl>
  );
};

export default GlobalDropDown;
