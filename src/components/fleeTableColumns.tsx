import React, { useEffect, useState } from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import axios from "axios";

const starImage = `${process.env.PUBLIC_URL}/star.svg`;
const coloredStarImage = `${process.env.PUBLIC_URL}/starcolored.svg`;
const starReset = `${process.env.PUBLIC_URL}/star-reset.svg`;

interface StyledLocationProps {
  isOnline: boolean;
}

const StyledLocation = styled("div")<StyledLocationProps>(({ isOnline }) => ({
  backgroundColor: isOnline ? "#0091FF" : "#E4E4E4",
  color: "white", // Adjust text color for better contrast
  padding: "0px",
  borderRadius: "4px",
  textAlign: "center",
}));

const StyledRobot = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const Circle = styled("div")<{ color: string }>(({ color }) => ({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: color,
}));

const StyledLocationType = styled("div")({
  color: "red",
});

export const locationColumn: GridColDef = {
  field: "name",
  headerName: "Locations",
  width: 420,
  renderCell: (params: GridRenderCellParams) => (
    <StyledLocation isOnline={params.row.robot?.is_online}>
      {params.value}
    </StyledLocation>
  ),
};

export const robotColumn: GridColDef = {
  field: "robot",
  headerName: "Robot",
  width: 240,
  renderCell: (params: GridRenderCellParams) => {
    console.log(params);
    const hasRobot = !!params.row.robot.is_online;
    return (
      <StyledRobot>
        <Circle color={hasRobot ? "green" : "grey"} />
        {hasRobot ? (
          params.value.id
        ) : (
          <span style={{ cursor: "pointer", color: "blue" }}>Add</span>
        )}
      </StyledRobot>
    );
  },
};

export const locationTypeColumn: GridColDef = {
  field: "locationType",
  headerName: "Location Types",
  width: 522,
  renderCell: (params: GridRenderCellParams) => (
    <StyledLocationType>{params.value}</StyledLocationType>
  ),
};

const StarCell = ({ params }: { params: GridRenderCellParams }) => {
  const [isStarred, setIsStarred] = useState(params.row.isStarred);

  useEffect(() => {
    setIsStarred(params.row.isStarred);
  }, [params.row.isStarred]);

  useEffect(() => {
    console.log(params);
    const updateStarredStatus = async () => {
      try {
        const updatedStarredLocationIds = isStarred
          ? params.row.id.filter((id: number) => id !== params.row.id)
          : [...params.row.id, params.row.id];

        await axios.put("/starred_location_ids", {
          location_ids: updatedStarredLocationIds,
        });
      } catch (error) {
        console.log(error);
        // alert("Could not star an item due to unexpected error");
      }
    };

    updateStarredStatus();
  }, [isStarred, params.row.id, params.row.starredLocationIds]);

  const StarHeader = (params: GridRenderCellParams) => {
    const resetStarred = async () => {
      try {
        await axios.put("/starred_location_ids", {
          location_ids: [],
        });
      } catch (error) {
        console.log(error);
        // alert("Could not star an item due to unexpected error");
      }
    };
    return (
      <img
        src={starReset}
        alt="reset"
        style={{ cursor: "pointer" }}
        onClick={resetStarred}
      />
    );
  };

  const toggleStar = () => {
    setIsStarred(!isStarred);
  };

  return (
    <div onClick={toggleStar} style={{ cursor: "pointer" }}>
      <img
        src={isStarred ? coloredStarImage : starImage}
        alt="star"
        style={{ display: isStarred ? "blue" : "grey" }}
      />
    </div>
  );
};

export const starColumn: GridColDef = {
  field: "star",
  headerName: "Starred",
  width: 100,
  renderCell: (params: GridRenderCellParams) => <StarCell params={params} />,
  // renderHeader: (params: GridRenderCellParams) => (
  //   <StarHeader params={params} />
  // ),
};

// Fake API call function
const fakeApiCall = (id: number, isStarred: boolean) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, isStarred });
    }, 500);
  });
};
