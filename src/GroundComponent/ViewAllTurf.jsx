import Carousel from "../page/Carousel";
import axios from "axios";
import { useState, useEffect } from "react";
import GroundCard from "./GroundCard";
import "./ViewAllTurf.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const ViewAllTurf = () => {
  const [grounds, setGrounds] = useState([]);

  const [locations, setLocations] = useState([]);

  const [locationId, setLocationId] = useState("");
  const [tempLocationId, setTempLocationId] = useState("");

  const retrieveAllLocations = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/api/location/fetch/`
    );
    return response.data;
  };

  useEffect(() => {
    const getAllLocations = async () => {
      const resLocation = await retrieveAllLocations();
      if (resLocation) {
        setLocations(resLocation.locations);
      }
    };

    const getAllGrounds = async () => {
      const allGrounds = await retrieveAllGrounds();
      if (allGrounds) {
        setGrounds(allGrounds.grounds);
      }
    };

    const getAllGroundByLocation = async () => {
      const allGrounds = await retrieveAllGroundsByLocation();
      if (allGrounds) {
        setGrounds(allGrounds.grounds);
      }
    };

    if (locationId !== "") {
      getAllGroundByLocation();
    } else {
      getAllGrounds();
    }

    getAllLocations();
  }, [locationId]);

  const retrieveAllGrounds = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/ground/fetch`);

    return response.data;
  };

  const retrieveAllGroundsByLocation = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/api/ground/search?locationId=` + locationId
    );

    return response.data;
  };

  const searchByLocation = (e) => {
    e.preventDefault();
    setLocationId(tempLocationId);

    setTempLocationId("");
  };

  return (
    <div className="container-fluid mb-2">
      <Carousel />

      <h5 className="text-color-second text-center mt-3">
        Search Ground By Location here..!!
      </h5>

      <div className="d-flex aligns-items-center justify-content-center">
        <div className="row">
          <div className="col">
            <div className="mt-3">
              <form class="row g-3">
                <div class="col-auto">
                  <select
                    name="tempLocationId"
                    onChange={(e) => setTempLocationId(e.target.value)}
                    className="form-control"
                    required
                  >
                    <option value="">Select Location</option>

                    {locations.map((location) => {
                      return (
                        <option value={location.id}> {location.city} </option>
                      );
                    })}
                  </select>
                </div>

                <div class="col-auto">
                  <button
                    type="submit"
                    class="btn bg-color custom-bg-text mb-3"
                    onClick={searchByLocation}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="card-text">
  <div className="row mt-4">
    <div className="col-sm-12">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {grounds.map((ground) => (
          <GroundCard key={ground.id} item={ground} />
        ))}
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default ViewAllTurf;
