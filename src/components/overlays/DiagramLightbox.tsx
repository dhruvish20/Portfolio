import React, { useEffect, useState } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import "../../styles/diagramLightbox.css";
import type { Diagram } from "../../data/diagrams";

interface DiagramLightboxProps {
  diagram: Diagram | null;
  onClose: () => void;
}

const INITIAL_ZOOM = 1.00; // start zoomed OUT so the whole diagram roughly fits
const MAX_ZOOM = 3;
const MIN_ZOOM = 0.3;
const MAX_OFFSET = 250; // limit how far you can drag

export function DiagramLightbox({ diagram, onClose }: DiagramLightboxProps) {
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(
    null
  );

  // When you open a diagram (or switch diagrams), always reset
  useEffect(() => {
    if (diagram) {
      setZoom(INITIAL_ZOOM);
      setOffset({ x: 0, y: 0 });
      setIsPanning(false);
      setPanStart(null);
    }
  }, [diagram?.id]);

  if (!diagram) return null;

  const clampZoom = (value: number) =>
    Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));

  const clampOffset = (x: number, y: number) => ({
    x: Math.min(MAX_OFFSET, Math.max(-MAX_OFFSET, x)),
    y: Math.min(MAX_OFFSET, Math.max(-MAX_OFFSET, y)),
  });

  const handleZoomIn = () =>
    setZoom((z) => clampZoom(z + 0.2));

  const handleZoomOut = () =>
    setZoom((z) => clampZoom(z - 0.2));

  const handleReset = () => {
    setZoom(INITIAL_ZOOM);
    setOffset({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setZoom((z) => clampZoom(z + delta));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsPanning(true);
    setPanStart({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanning || !panStart) return;
    const nextX = e.clientX - panStart.x;
    const nextY = e.clientY - panStart.y;
    setOffset(clampOffset(nextX, nextY));
  };

  const endPan = () => {
    setIsPanning(false);
    setPanStart(null);
  };

  return (
    <div className="diagram-backdrop" onClick={onClose}>
      <div
        className="diagram-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="diagram-header">
          <div className="diagram-title">{diagram.label}</div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-neutral-100 transition-colors"
            aria-label="Close diagram"
          >
            <X size={16} />
          </button>
        </header>

        <div className="diagram-body">
          {diagram.description && (
            <p className="diagram-description">{diagram.description}</p>
          )}

          <div
            className={
              "diagram-canvas " + (isPanning ? "diagram-canvas--panning" : "")
            }
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={endPan}
            onMouseLeave={endPan}
          >
            <div
              className="diagram-inner"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                transformOrigin: "center center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={diagram.imageSrc}
                alt={diagram.label}
                className="diagram-image"
              />
            </div>
          </div>

          <div className="diagram-controls">
            <button
              type="button"
              className="diagram-control-btn"
              onClick={handleZoomOut}
            >
              <ZoomOut size={14} />
            </button>
            <button
              type="button"
              className="diagram-control-btn"
              onClick={handleZoomIn}
            >
              <ZoomIn size={14} />
            </button>
            <button
              type="button"
              className="diagram-control-btn"
              onClick={handleReset}
            >
              <RotateCcw size={14} />
            </button>
            <span className="ml-1 text-[11px]">
              {(zoom * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
