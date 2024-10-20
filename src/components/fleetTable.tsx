import React, { useState, useEffect } from "react";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { Box, TextField, Select, MenuItem } from "@mui/material";
import {
  locationColumn,
  robotColumn,
  locationTypeColumn,
  starColumn,
} from "./fleeTableColumns";
import { Location } from "../mocks/db";
import axios from "axios";
import { worker } from "../mocks/browser";

// Extend Location type to include isStarred property
interface ExtendedLocation extends Location {
  isStarred?: boolean;
}

const FleetTable = () => {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const [rows, setRows] = useState<ExtendedLocation[]>([]);
  const [originalRows, setOriginalRows] = useState<ExtendedLocation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await worker.start;
        const response = await axios.get("/locations", {
          params: {
            page: 1,
            location_name: searchQuery,
            is_starred: filter === "ALL",
          },
        });
        const starredResponse = await axios.get("/starred_location_ids");
        const starredLocationIds = starredResponse.data.location_ids;

        const combinedData = response.data.locations.map(
          (location: Location) => ({
            ...location,
            isStarred: starredLocationIds.includes(location.id),
          })
        );

        setOriginalRows(combinedData);
        setRows(combinedData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [filter, searchQuery]);

  useEffect(() => {
    setRows((prevRows) => {
      let filteredRows = originalRows;

      if (filter === "Starred") {
        filteredRows = filteredRows.filter((row) => row.isStarred);
      }

      if (searchQuery) {
        filteredRows = filteredRows.filter(
          (row) =>
            row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (row.robot &&
              row.robot.id.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }

      return filteredRows;
    });
  }, [filter, searchQuery, originalRows]);

  const handleRowSelectionModelChange = (
    newRowSelectionModel: GridRowSelectionModel
  ) => {
    setRowSelectionModel(newRowSelectionModel);
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          variant="outlined"
        >
          <MenuItem value="All">All Locations</MenuItem>
          <MenuItem value="Starred">Starred</MenuItem>
        </Select>
        <TextField
          label="Search robot or location"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <DataGrid
        rows={rows}
        columns={[starColumn, locationColumn, robotColumn, locationTypeColumn]}
        initialState={{ pagination: { paginationModel: { pageSize: 6 } } }}
        checkboxSelection
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default FleetTable;
