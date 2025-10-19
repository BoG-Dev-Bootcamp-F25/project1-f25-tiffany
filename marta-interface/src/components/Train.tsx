import React, { useEffect, useState } from "react";
import type { Line, TrainData } from "../pages/LinesPage";

type TrainProps = {
  train: TrainData;
  color: string;
};

const prettyLine = (ln: Line) => ln.charAt(0).toUpperCase() + ln.slice(1);

function formatETAtoMins(eta?: string, nowMs?: number): string {
  if (!eta) return "—";
  const s = String(eta).trim();

  const minMatch = s.match(/(\d+)\s*min/i);
  if (minMatch) {
    const n = Math.max(0, parseInt(minMatch[1], 10));
    return `${n} min${n === 1 ? "" : "s"}`;
  }
  const secMatch = s.match(/(\d+)\s*sec/i);
  if (secMatch) {
    const secs = Math.max(0, parseInt(secMatch[1], 10));
    const mins = Math.ceil(secs / 60);
    const n = Math.max(0, mins);
    return `${n} min${n === 1 ? "" : "s"}`;
  }

  const ts = Date.parse(s);
  if (!Number.isNaN(ts)) {
    const now = nowMs ?? Date.now();
    const diff = Math.max(0, ts - now);
    const mins = Math.ceil(diff / 60000);
    const n = Math.max(0, mins);
    return `${n} min${n === 1 ? "" : "s"}`;
  }

  return s;
}

const Train: React.FC<TrainProps> = ({ train, color }) => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="train"
      style={{
        borderLeft: `4px solid ${color}`,
        background: "#bdbdbdff",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        color: "black",
      }}
    >
      <div style={{ fontWeight: 700 }}>
        {train.station} — {prettyLine(train.line)} Line
      </div>
      <div>Direction: {train.direction ?? "—"}</div>
      <div>Status: {train.status}</div>
      <div>ETA: {formatETAtoMins(train.arrivalTime, now)}</div>
    </div>
  );
};

export default Train;