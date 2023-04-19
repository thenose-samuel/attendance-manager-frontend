import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function Home() {
  return (
    <>
      <div className="flex">
        <SideBar></SideBar>
        <div className="w-3 h-screen"></div>
        <div className="bg-red-800 w-10 h-10"></div>
      </div>
    </>
  );
}

function SideBar() {
  return (
    <div className="">
      <div className="h-screen bg-neutral-900 w-max p-6 pl-6 pt-4 border-neutral-800 border-solid border-x-2">
        <div>
          <div className="font-extrabold text-md mb-6">
            Welcome, {"<Student Name>"}
          </div>
          <div>
            <div className="text-neutral-600 text-xs font-medium mb-3">
              Select course from the dropdown below
            </div>
            <FormControl
              autoFocus={false}
              variant="filled"
              sx={{ minWidth: 250 }}
            >
              <InputLabel
                id="demo-simple-select-filled-label"
                className="text-sm"
              >
                Select Course
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value=""
                onChange={() => {}}
              >
                <MenuItem value={10}>CS 372</MenuItem>
                <MenuItem value={20}>CE 372</MenuItem>
                <MenuItem value={30}>HS 392</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}
