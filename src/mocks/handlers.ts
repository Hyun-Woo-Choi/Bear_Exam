import { http, HttpResponse } from 'msw';
import { Location, locations as dummyLocations } from './db';

interface LocationsResult {
  total_count: number;
  locations: Location[];
}

interface LocationsPathParams {
  page: string;
  location_name: string;
  robot_id: string;
  is_starred: string;
}

export const handlers = [
  http.get<LocationsPathParams>("/locations", ({ params }) => {
    console.log("params", params);
    const page = parseInt(params.page) || 1;
    const locationName = params.location_name || '';
    const robotId = params.robot_id || '';
    const isStarred = params.is_starred === 'true';

    let filteredLocations = dummyLocations;

    if (locationName) {
      filteredLocations = filteredLocations.filter((location) =>
        location.name.toLowerCase().includes(locationName.toLowerCase()),
      );
    }

    if (robotId) {
      filteredLocations = filteredLocations.filter(
        (location) => location.robot.id === robotId,
      );
    }

    if (isStarred) {
      const starredLocationIds = JSON.parse(
        sessionStorage.getItem("starred_location_ids") || "[]",
      );

      filteredLocations = filteredLocations.filter((location) =>
        starredLocationIds.includes(location.id),
      );
    }

    // const pageSize = 6;
    // const paginatedLocations = filteredLocations.slice((page - 1) * pageSize, page * pageSize);

    const result: LocationsResult = {
      total_count: filteredLocations.length,
      locations: filteredLocations,
    };

    return HttpResponse.json(result);
  }),

  http.get("/starred_location_ids", () => {
    const location_ids = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]",
    );

    return HttpResponse.json({
      location_ids,
    });
  }),

  http.put("/starred_location_ids", ({ request }) => {
    if (!request.body) {
      return HttpResponse.json(
        { error_msg: "Encountered unexpected error" },
        { status: 500 },
      );
    }
    sessionStorage.setItem(
      "starred_location_ids",
      JSON.stringify(request.body),
    );

    return HttpResponse.json(null, { status: 204 });
  }),
];
