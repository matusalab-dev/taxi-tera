import { useParams } from "react-router";
import { useSearchLocation } from "../api/queries.js/locaction-queries";

const StandsPage = () => {
  const { id: routeId } = useParams();
  //   const { data: address = {} } = useSearchLocation(searchQuery);
  //   const { features } = address;
  //   console.log("address", address);
  return <div>StandsPage {routeId} </div>;
};

export default StandsPage;
