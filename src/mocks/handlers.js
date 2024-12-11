import { http, delay, HttpResponse } from "msw";

const buildings = [
  { id: 1, name: "Headquarters" },
  { id: 2, name: "Branch A" },
  { id: 3, name: "Branch B" },
  { id: 4, name: "Branch C" },
  { id: 5, name: "Branch D" },
  { id: 6, name: "Branch E" },
];

const assets = [
  { id: 1, name: "Room 101", type: "room", building_id: 1 },
  { id: 2, name: "Room 102", type: "room", building_id: 1 },
  { id: 3, name: "Meter 1060", type: "meter", building_id: 2 },
  { id: 4, name: "Meter 1001", type: "meter", building_id: 3 },
  { id: 5, name: "Room 1012", type: "room", building_id: 4 },
  { id: 6, name: "Room 1023", type: "room", building_id: 4 },
  { id: 7, name: "Room 1025", type: "room", building_id: 4 },
  { id: 8, name: "Room 1028", type: "room", building_id: 4 },
  { id: 9, name: "Meter 103", type: "meter", building_id: 5 },
  { id: 10, name: "Room 104", type: "room", building_id: 6 },
  { id: 11, name: "Room 105", type: "room", building_id: 6 },
];

const searchResults = {
  room: [
    { date: "2024-12-01", temperature: "22°C", humidity: "55%" },
    { date: "2024-12-02", temperature: "23°C", humidity: "60%" },
    { date: "2024-12-03", temperature: "21°C", humidity: "50%" },
    { date: "2024-12-04", temperature: "24°C", humidity: "65%" },
    { date: "2024-12-05", temperature: "20°C", humidity: "45%" },
  ],
  meter: [
    { date: "2024-12-01", energy: "120.1 kWh", cost: "€15.20" },
    { date: "2024-12-02", energy: "80.2 kWh", cost: "€10.45" },
    { date: "2024-12-03", energy: "90.3 kWh", cost: "€12.95" },
    { date: "2024-12-04", energy: "110.4 kWh", cost: "€14.70" },
    { date: "2024-12-05", energy: "130.5 kWh", cost: "€17.05" },
  ],
};

export const handlers = [
  http.get("/api/buildings", async ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    await delay();

    // Filter buildings based on query
    const filteredBuildings = buildings.filter((building) =>
      building.name.toLowerCase().includes(query.toLowerCase())
    );

    return HttpResponse.json(filteredBuildings);
  }),

  http.get("/api/building-assets/:buildingId", async ({ params }) => {
    const { buildingId } = params;

    await delay();

    return HttpResponse.json(
      assets.filter((asset) => asset.building_id == buildingId)
    );
  }),

  http.post("/api/search", async ({ request }) => {
    const { dataType } = await request.json();

    await delay();

    //Failed to fetch data 10% of the time
    if (Math.random() < 0.1) {
      return HttpResponse.json(
        { message: "Failed to fetch data. Please try again." },
        { status: 500 }
      );
    }

    return HttpResponse.json(searchResults[dataType] ?? []);
  }),
];
