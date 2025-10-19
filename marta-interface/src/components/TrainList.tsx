
import React from "react";
import Train from "./Train";
import type { Line, TrainData } from "../pages/LinesPage";


type Filter = "Arriving" | "Scheduled" | "North/South" | "East/West";

type TrainListProps = {
  trains: TrainData[];
  line: Line; 
  color: string; 
  selectedStation?: string; 
  selectedFilter: Filter | null; 
  className?: string;
};

const TrainList: React.FC<TrainListProps> = ({
  trains,
  line,
  color,
  selectedStation,
  selectedFilter,
  className = "",
}) => {
  const filtered = trains.filter((t) => {

    if (t.line !== line) return false;

    
    if (selectedStation) {
      const a = (t.station || "").trim().toLowerCase();
      const b = selectedStation.trim().toLowerCase();
      if (a !== b) return false;
    }

    
    if (selectedFilter) {
      if (selectedFilter === "Arriving" && t.status !== "Arriving")
        return false;
      if (selectedFilter === "Scheduled" && t.status !== "Scheduled")
        return false;
      if (
        selectedFilter === "North/South" &&
        !(t.direction === "Northbound" || t.direction === "Southbound")
      )
        return false;
      if (
        selectedFilter === "East/West" &&
        !(t.direction === "Eastbound" || t.direction === "Westbound")
      )
        return false;
    }

    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className={`trainList ${className}`} style={{ padding: 16 }}>
        <em style={{color: "black"}}>No trains to display. Try a different station or filter.</em>
      </div>
    );
  }

  return (
    <div className={`trainList ${className}`} style={{ padding: 16 }}>
      {filtered.map((t) => (
        <Train key={t.id} train={t} color={color} />
      ))}
    </div>
  );
};

export default TrainList;
