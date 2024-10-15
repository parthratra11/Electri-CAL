import React, { useState } from "react";
import RouteReportModal from "./routeReportModal";
require("dotenv").config();

const vehicleModel = (selectedCar) => {
  return selectedCar.replace(/ /g, "_");
};

const GenerateRouteReport = ({
  selectedCar,
  startLat,
  startLng,
  destinationLat,
  destinationLng,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    batteryState: "N/A",
    distance: "N/A",
    energyElectric: "N/A",
    time: "N/A",
  });

  const handleGenerateReport = async () => {
    const model_name = vehicleModel(selectedCar);
    const payload = {
      origin_lat: startLat,
      origin_lon: startLng,
      destination_lat: destinationLat,
      destination_lon: destinationLng,
      model_name: model_name,
      start_time: "09:00:00",
      start_weekday: "monday",
      vehicle_rates: {},
      weights: {
        distance: 1,
        energy_electric: 1,
        energy_liquid: 0,
        time: 1,
      },
    };

    // INSERT YOUR API KEY HERE
    const ROUTE_API_KEY = process.env.NEXT_PUBLIC_ROUTE_API_KEY;

    if (!ROUTE_API_KEY) {
      console.error("API Key not found !");
    }

    try {
      const response = await fetch("http://localhost:8000/route_report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": ROUTE_API_KEY,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const routeData = data.route || {};
      const traversalSummary = routeData.traversal_summary || {};

      setModalContent({
        batteryState: traversalSummary.battery_state?.toFixed(3) || "N/A",
        distance: traversalSummary.distance?.toFixed(3) || "N/A",
        energyElectric: traversalSummary.energy_electric?.toFixed(3) || "N/A",
        time: traversalSummary.time?.toFixed(3) || "N/A",
      });
    } catch (error) {
      setModalContent({
        batteryState: "N/A",
        distance: "N/A",
        energyElectric: "N/A",
        time: "N/A",
      });
      console.error("Error calculating compass route: \n" + error.message);
    }

    setIsModalOpen(true);
  };

  return (
    <div>
      <button
        className="mt-4 text-primary shadow-sm shadow-primary-content border-primary-content btn w-full bg-base-300 font-bold text-sm size-10 
        hover:bg-base-300 hover:opacity-75 hover:border-primary-content"
        onClick={handleGenerateReport}
      >
        Generate Route Report
      </button>

      {isModalOpen && (
        <RouteReportModal
          modalContent={modalContent}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default GenerateRouteReport;
