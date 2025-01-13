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

// authentication endpoints
async function register(query) {
  const REGISTER_URL = `${BASE_URL}/geocode/search?api_key=${
    import.meta.env.VITE_API_KEY
  }&text=${query}`;

  try {
    const response = await fetch(REGISTER_URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log("REGISTERED:", json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

async function login(query) {
  const LOGIN_URL = `${BASE_URL}/geocode/search?api_key=${
    import.meta.env.VITE_API_KEY
  }&text=${query}`;

  try {
    const response = await fetch(LOGIN_URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log("LOGGEDN IN:", json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}
export {
  getAllTaxistands,
  convertCoordsToAddress,
  searchLocations,
  register,
  login,
};
