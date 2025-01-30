const BASE_URL = "https://taxi-tera.onrender.com/api";
// const API_KEY = "5b3ce3597851110001cf6248e351b2b8bffd43aa941f41dce4a1ad64";

const ORS_URL = "https://api.openrouteservice.org";
// ORS end points

async function getAllTaxistands() {
  const TAXISTANDS_URL = `${BASE_URL}/taxistands`;

  try {
    const response = await fetch(TAXISTANDS_URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log("json:", json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

// to perform reverse geocoding
async function convertCoordsToAddress(lat, lng, radius = 1) {
  const ORS_COORDS_ADDRESS_URL = `${ORS_URL}/geocode/reverse?api_key=${
    import.meta.env.VITE_API_KEY
  }&point.lon=${lng}&point.lat=${lat}&boundary.circle.radius=${radius}&size=10&layers=address,street,neighbourhood,locality,venue,region,country&sources=openstreetmap`;

  try {
    const response = await fetch(ORS_COORDS_ADDRESS_URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log("json coords to address:", json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

// search location based on user input
async function searchLocations(query) {
  const ORS_COORDS_ADDRESS_URL = `${ORS_URL}/geocode/search?api_key=${
    import.meta.env.VITE_API_KEY
  }&text=${query}`;

  try {
    const response = await fetch(ORS_COORDS_ADDRESS_URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log("founded address:", json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

// finding route based on user start and destination input
async function findRoute(routeObject) {
  const { startCoordinates, endCoordinates } = routeObject;
  const [latStart, lngStart] = startCoordinates;
  const [latDestination, lngDestination] = endCoordinates;
  console.log(start);

  const ORS_COORDS_ADDRESS_URL = `${ORS_URL}/v2/directions/driving-car?api_key=${
    import.meta.env.VITE_API_KEY
  }&start=${latStart},${lngStart}&end=${latDestination},${lngDestination}`;

  try {
    const response = await fetch(ORS_COORDS_ADDRESS_URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log("founded routes:", json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

// authentication endpoints
async function registerUser(newUser) {
  const REGISTER_URL = `${BASE_URL}/auth/signup`;

  try {
    const response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log("REGISTERED successfully:", json);
    return json;
  } catch (error) {
    console.log("server error:");

    console.error(error.message);
  }
}

async function loginUser(user) {
  const LOGIN_URL = `${BASE_URL}/auth/login`;

  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log("logged successfully:", json);
    return json;
  } catch (error) {
    console.log("server error:");
    console.error(error.message);
    return error.message;
  }
}
export {
  getAllTaxistands,
  convertCoordsToAddress,
  searchLocations,
  findRoute,
  registerUser,
  loginUser,
};
