import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const GlobalDropDown = (props) => {
  const label = props.label;
  const items = props.items;
  const value = props.stateVal;
  const handleChange = props.handleChange;

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
        {items.map((item) => {
          return <MenuItem value={item.value}>{item.title}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

export default GlobalDropDown;
