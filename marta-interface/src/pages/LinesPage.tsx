import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import TrainList from "../components/TrainList";
import { useLocation } from "react-router-dom";

export type Line = "gold" | "red" | "blue" | "green";
export type Status =
  | "Arriving"
  | "Scheduled"
  | "Northbound"
  | "Southbound"
  | "Eastbound"
  | "Westbound";

type Filter = "Arriving" | "Scheduled" | "North/South" | "East/West";

export type TrainData = {
  id: string | number;
  line: Line;
  station: string;
  status: "Arriving" | "Scheduled";
  direction?: "Northbound" | "Southbound" | "Eastbound" | "Westbound";
  arrivalTime?: string;
};

const COLOR_BY_LINE: Record<Line, string> = {
  gold: "#FFD700",
  red: "#C8102E",
  blue: "#005BBB",
  green: "#0B6E4F",
};

const API = "https://midsem-bootcamp-api.onrender.com";

export default function LinesPage() {
  const location = useLocation() as { state?: { line?: Line } };
  const initialLine: Line = (location.state?.line ?? "red") as Line;
  const [line, setLine] = useState<Line>(initialLine);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trains, setTrains] = useState<TrainData[]>([]);
  const [stations, setStations] = useState<string[]>([]);
  const [selectedStation, setSelectedStation] = useState<string | undefined>(
    undefined
  );
  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null);

  const color = COLOR_BY_LINE[line];

  useEffect(() => {
    const controller = new AbortController();
    const lc = line.toLowerCase();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [arrivalsRes, stationsRes] = await Promise.all([
          fetch(`${API}/arrivals/${lc}`, { signal: controller.signal }),
          fetch(`${API}/stations/${lc}`, { signal: controller.signal }),
        ]);

        if (!arrivalsRes.ok) throw new Error(`Arrivals ${arrivalsRes.status}`);
        if (!stationsRes.ok) throw new Error(`Stations ${stationsRes.status}`);

        const arrivalsJson = await arrivalsRes.json();
        const stationsJson = await stationsRes.json();

        const toDirection = (
          d: any
        ):
          | "Northbound"
          | "Southbound"
          | "Eastbound"
          | "Westbound"
          | undefined => {
          switch (String(d ?? "").toUpperCase()) {
            case "N":
              return "Northbound";
            case "S":
              return "Southbound";
            case "E":
              return "Eastbound";
            case "W":
              return "Westbound";
            default:
              return undefined;
          }
        };

        const toStatus = (waitingTime: any): "Arriving" | "Scheduled" => {
          const w = String(waitingTime ?? "").toLowerCase();
          return w.includes("arriv") || w.includes("approach")
            ? "Arriving"
            : "Scheduled";
        };

        const rawArr = Array.isArray(arrivalsJson)
          ? arrivalsJson
          : arrivalsJson.trains ?? [];
        const mappedTrains: TrainData[] = rawArr.map((t: any, idx: number) => ({
          id: t.TRAIN_ID ?? t.TRIP_ID ?? idx,
          line: String(t.LINE ?? line).toLowerCase() as Line,
          station: String(t.STATION ?? "")
            .replace(/ STATION$/i, "")
            .trim(),
          status: toStatus(t.WAITING_TIME),
          direction: toDirection(t.DIRECTION),
          arrivalTime: t.NEXT_ARR ?? t.WAITING_TIME,
        }));

        const stationList: string[] = (
          Array.isArray(stationsJson)
            ? stationsJson
            : stationsJson.stations ?? []
        )
          .map((s: any) =>
            typeof s === "string" ? s : s.name ?? s.station ?? ""
          )
          .map((name: string) => name.replace(/ STATION$/i, "").trim())
          .filter(Boolean)
          .sort();

        setTrains(mappedTrains);
        setStations(stationList);
        setSelectedStation((prev) =>
          prev && stationList.includes(prev) ? prev : undefined
        );
      } catch (e: any) {
        if (e.name !== "AbortError") setError(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [line]);

  const handleFilterClick = (f: Filter) => {
    setSelectedFilter((prev) => (prev === f ? null : f));
  };

  if (loading) return <div style={{ padding: 16 }}>Loading…</div>;
  if (error)
    return <div style={{ padding: 16, color: "crimson" }}>Error: {error}</div>;

  return (
    <div
      className="linesPage"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <NavBar
        line={line}
        colorByLine={COLOR_BY_LINE}
        stations={stations}
        selectedStation={selectedStation}
        onSelectStation={setSelectedStation}
        onSelectLine={setLine}
      />

      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #0b0b0bff",
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {(
          ["Arriving", "Scheduled", "North/South", "East/West"] as Filter[]
        ).map((f) => {
          const active = selectedFilter === f;
          return (
            <button
              key={f}
              onClick={() => handleFilterClick(f)}
              aria-pressed={active}
              style={{
                border: `2px solid ${active ? color : "transparent"}`,
                background: "#3e055fff",
                borderRadius: 8,
                padding: "6px 10px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      <TrainList
        trains={trains}
        line={line}
        color={color}
        selectedStation={selectedStation}
        selectedFilter={selectedFilter}
      />
    </div>
  );
}
