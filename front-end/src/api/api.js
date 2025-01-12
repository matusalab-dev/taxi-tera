const baseUrl = "https://taxi-tera.onrender.com/api";

// fetch("https://fakestoreapi.com/products")
//   .then((res) => res.json())
//   .then((json) => console.log(json));

// products end points
async function getAllTaxistands() {
  const TAXISTANDS_URL = `${baseUrl}/taxistands`;

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

export { getAllTaxistands };
