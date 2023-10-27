import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
   
    },
  },


};



export default function Facilities({
  data,
    handleChange,
  values,
  label
}: {
  data: Array<string>;
        handleChange: (event: SelectChangeEvent<string[]>, child: React.ReactNode) => void
    values: Array<string>
  label: string
}) {


 
  return (
    <>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={values}
          sx={{
            color: "#000",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0f172a",
            },
            ".MuiSvgIcon-root": {
              
            },
            "&:before": {
              borderBottom: `1px solid red`,
            },
            "&:hover": {
              ":before": {
                borderBottom: `1px solid green`,
              },
            },
            "& .MuiMenuItem-root": {
              // backgroundColor: "dark.primary",
            },
            "& .MuiMenu-paper": {
              // backgroundColor: "dark.primary",
            }, 
          }}
          onChange={handleChange}
          input={<OutlinedInput label={label} className="w-full overflow-hidden"/>}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          <MenuItem disabled value="">
            <em>Select {label}
            </em>
          </MenuItem>
          {data.map((name: string) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={values.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
