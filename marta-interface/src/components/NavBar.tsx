import React from "react";
import type { Line } from "../pages/LinesPage";

type NavBarProps = {
  stations: string[];
  selectedStation?: string;
  onSelectStation: (s?: string) => void;

  line: Line; 
  colorByLine: Record<Line, string>;

  onSelectLine?: (ln: Line) => void; 
  showLineButtons?: boolean;

  className?: string;
};

const ALL_LINES: Line[] = ["gold", "red", "blue", "green"];
const pretty = (ln: Line) => ln.charAt(0).toUpperCase() + ln.slice(1); // "gold" -> "Gold"

const NavBar: React.FC<NavBarProps> = ({
  stations,
  selectedStation,
  onSelectStation,

  line,
  colorByLine,

  onSelectLine,
  showLineButtons = true,

  className = "",
}) => {
  const barColor = colorByLine[line];

  return (
    <div
      className={`navbarContent ${className}`}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: barColor,
        padding: "12px 16px",
        borderBottom: "2px solid #222",
        color: "#fff",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 12,
        }}
      >

        <div
          style={{
            justifySelf: "start",
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {showLineButtons &&
            onSelectLine &&
            ALL_LINES.map((ln) => {
              const bg = colorByLine[ln];
              const isActive = ln === line;
              const textColor = ln === "gold" ? "#000" : "#fff";
              return (
                <button
                  type="button"
                  key={ln}
                  onClick={() => onSelectLine(ln)} 
                  aria-pressed={isActive}
                  title={`${pretty(ln)} Line`}
                  style={{
                    backgroundColor: bg,
                    color: textColor,
                    border: isActive
                      ? "3px solid rgba(0,0,0,0.6)"
                      : "2px solid rgba(0,0,0,0.35)",
                    padding: "6px 10px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: 700,
                    filter: isActive ? "brightness(0.95)" : undefined,
                  }}
                >
                  {pretty(ln)}
                </button>
              );
            })}
        </div>


        <div style={{ justifySelf: "center" }}>
          <select
            value={selectedStation ?? ""}
            onChange={(e) => onSelectStation(e.target.value || undefined)}
            style={{ padding: "6px 8px", borderRadius: 8 }}
          >
            <option value="">All Stations</option>
            {stations.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div style={{ justifySelf: "end", fontWeight: 800 }}>
          {pretty(line)} Line
        </div>
      </div>
    </div>
  );
};

export default NavBar;
