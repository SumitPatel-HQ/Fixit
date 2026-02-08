"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
   ZoomIn,
   ZoomOut,
   RotateCcw,
   Tag,
   Square,
   Maximize2,
   X,
   ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   Visualization,
   LocalizationResult,
   ComponentStatus,
} from "@/types/api-response";

interface ARImageCanvasProps {
   imageUrl: string;
   visualizations: Visualization[];
   localizationResults: LocalizationResult[];
   onComponentClick?: (component: Visualization | LocalizationResult) => void;
}

const STATUS_COLORS: Record<ComponentStatus, { border: string; bg: string; text: string }> = {
   found: {
      border: "stroke-emerald-500",
      bg: "bg-emerald-500/20",
      text: "text-emerald-400",
   },
   not_visible: {
      border: "stroke-amber-500",
      bg: "bg-amber-500/20",
      text: "text-amber-400",
   },
   not_present: {
      border: "stroke-blue-500",
      bg: "bg-blue-500/20",
      text: "text-blue-400",
   },
   ambiguous: {
      border: "stroke-orange-500",
      bg: "bg-orange-500/20",
      text: "text-orange-400",
   },
};

export function ARImageCanvas({
   imageUrl,
   visualizations,
   localizationResults,
   onComponentClick,
}: ARImageCanvasProps) {
   const containerRef = useRef<HTMLDivElement>(null);
   const [zoom, setZoom] = useState(1);
   const [position, setPosition] = useState({ x: 0, y: 0 });
   const [isDragging, setIsDragging] = useState(false);
   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
   const [showLabels, setShowLabels] = useState(true);
   const [showBoxes, setShowBoxes] = useState(true);
   const [isFullscreen, setIsFullscreen] = useState(false);
   const [selectedComponent, setSelectedComponent] = useState<
      Visualization | LocalizationResult | null
   >(null);
   const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

   // Get consolidated components (visualizations + localization results)
   const allComponents = [
      ...visualizations.map((v) => ({
         ...v,
         status: "found" as ComponentStatus,
         isVisualization: true,
      })),
   ];

   // Calculate component position in percentage
   const getComponentStyle = (bbox: { x_min: number; y_min: number; x_max: number; y_max: number }) => {
      if (!imageDimensions.width || !imageDimensions.height) return {};

      return {
         left: `${bbox.x_min * 100}%`,
         top: `${bbox.y_min * 100}%`,
         width: `${(bbox.x_max - bbox.x_min) * 100}%`,
         height: `${(bbox.y_max - bbox.y_min) * 100}%`,
      };
   };

   const handleZoomIn = () => {
      setZoom((prev) => Math.min(prev + 0.25, 3));
   };

   const handleZoomOut = () => {
      setZoom((prev) => Math.max(prev - 0.25, 0.5));
   };

   const handleReset = () => {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
   };

   const handleMouseDown = (e: React.MouseEvent) => {
      if (zoom > 1) {
         setIsDragging(true);
         setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      }
   };

   const handleMouseMove = (e: React.MouseEvent) => {
      if (isDragging && zoom > 1) {
         setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
         });
      }
   };

   const handleMouseUp = () => {
      setIsDragging(false);
   };

   const handleWheel = useCallback((e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom((prev) => Math.min(Math.max(prev + delta, 0.5), 3));
   }, []);

   useEffect(() => {
      const container = containerRef.current;
      if (container) {
         container.addEventListener("wheel", handleWheel, { passive: false });
         return () => container.removeEventListener("wheel", handleWheel);
      }
   }, [handleWheel]);

   const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      setImageDimensions({
         width: img.naturalWidth,
         height: img.naturalHeight,
      });
   };

   const handleComponentClick = (comp: Visualization | LocalizationResult) => {
      setSelectedComponent(comp);
      onComponentClick?.(comp);
   };

   const toggleFullscreen = () => {
      setIsFullscreen((prev) => !prev);
   };

   const getStatusFromComponent = (
      comp: Visualization | LocalizationResult
   ): ComponentStatus => {
      if ("status" in comp) {
         return comp.status;
      }
      return "found";
   };

   return (
      <>
         {/* Main Canvas Container */}
         <div className="space-y-3">
            {/* Section Title */}
            <div className="flex items-center justify-between">
               <h3 className="text-lg font-semibold text-white/90">Visual Analysis</h3>
               <span className="text-xs text-white/50">
                  {visualizations.length} component{visualizations.length !== 1 ? "s" : ""} detected
               </span>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2 pb-2">
               <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={handleZoomIn}
                     className="h-8 w-8"
                     title="Zoom In"
                  >
                     <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={handleZoomOut}
                     className="h-8 w-8"
                     title="Zoom Out"
                  >
                     <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={handleReset}
                     className="h-8 w-8"
                     title="Reset View"
                  >
                     <RotateCcw className="w-4 h-4" />
                  </Button>
               </div>

               <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
                  <Button
                     variant={showLabels ? "default" : "ghost"}
                     size="sm"
                     onClick={() => setShowLabels(!showLabels)}
                     className="h-8 gap-1.5"
                  >
                     <Tag className="w-3.5 h-3.5" />
                     <span className="hidden sm:inline text-xs">Labels</span>
                  </Button>
                  <Button
                     variant={showBoxes ? "default" : "ghost"}
                     size="sm"
                     onClick={() => setShowBoxes(!showBoxes)}
                     className="h-8 gap-1.5"
                  >
                     <Square className="w-3.5 h-3.5" />
                     <span className="hidden sm:inline text-xs">Boxes</span>
                  </Button>
               </div>

               <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullscreen}
                  className="h-8 w-8 ml-auto"
                  title="Fullscreen"
               >
                  <Maximize2 className="w-4 h-4" />
               </Button>
            </div>

            {/* Image Canvas */}
            <div
               ref={containerRef}
               className={`
            relative overflow-hidden rounded-xl border border-border bg-black/40
            ${isFullscreen ? "fixed inset-0 z-50 rounded-none" : "w-full"}
            ${zoom > 1 ? "cursor-grab" : "cursor-default"}
            ${isDragging ? "cursor-grabbing" : ""}
          `}
               style={{
                  aspectRatio: isFullscreen
                     ? undefined
                     : imageDimensions.width && imageDimensions.height
                        ? `${imageDimensions.width} / ${imageDimensions.height}`
                        : "16 / 9",
                  maxHeight: isFullscreen ? "100vh" : "80vh"
               }}
               onMouseDown={handleMouseDown}
               onMouseMove={handleMouseMove}
               onMouseUp={handleMouseUp}
               onMouseLeave={handleMouseUp}
            >
               {/* Zoom Indicator */}
               <div className="absolute top-3 left-3 z-20 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-white/70">
                  {Math.round(zoom * 100)}%
               </div>

               {/* Fullscreen Close Button */}
               {isFullscreen && (
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={toggleFullscreen}
                     className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-sm"
                  >
                     <X className="w-5 h-5" />
                  </Button>
               )}

               {/* Image Layer */}
               <div
                  className="relative w-full h-full transition-transform duration-150 ease-out"
                  style={{
                     transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                  }}
               >
                  <img
                     src={imageUrl}
                     alt="Device under analysis"
                     className="w-full h-full object-contain"
                     onLoad={handleImageLoad}
                     draggable={false}
                  />

                  {/* AR Overlay Layer */}
                  {showBoxes && (
                     <div className="absolute inset-0">
                        {visualizations.map((viz, index) => {
                           const status = getStatusFromComponent(viz);
                           const colors = STATUS_COLORS[status];
                           const style = getComponentStyle(viz.bounding_box);

                           return (
                              <motion.div
                                 key={viz.overlay_id || index}
                                 initial={{ opacity: 0, scale: 0.9 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 transition={{ delay: index * 0.1 }}
                                 className={`
                        absolute border-2 rounded-lg cursor-pointer
                        transition-all duration-300
                        hover:border-4 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:z-10
                        ${colors.border.replace("stroke-", "border-")}
                        ${colors.bg}
                      `}
                                 style={style}
                                 onClick={() => handleComponentClick(viz)}
                              >
                                 {/* Label */}
                                 {showLabels && (
                                    <div
                                       className={`
                            absolute -top-8 left-0 px-3 py-1 rounded-full text-xs font-bold tracking-wide
                            whitespace-nowrap backdrop-blur-md shadow-lg border border-white/20
                            ${colors.bg} ${colors.text}
                          `}
                                    >
                                       {viz.label}
                                    </div>
                                 )}

                                 {/* Confidence indicator */}
                                 <div
                                    className={`
                          absolute -bottom-6 left-0 text-[10px] font-mono font-bold px-1 py-0.5 rounded bg-black/50 backdrop-blur-sm
                          ${colors.text}
                        `}
                                 >
                                    {Math.round(viz.confidence * 100)}%
                                 </div>
                              </motion.div>
                           );
                        })}

                        {/* Arrow hints */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                           {visualizations
                              .filter((v) => v.arrow_hint)
                              .map((viz, index) => (
                                 <motion.line
                                    key={`arrow-${index}`}
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ delay: index * 0.1 + 0.5 }}
                                    x1={`${viz.arrow_hint!.from.x * 100}%`}
                                    y1={`${viz.arrow_hint!.from.y * 100}%`}
                                    x2={`${viz.arrow_hint!.to.x * 100}%`}
                                    y2={`${viz.arrow_hint!.to.y * 100}%`}
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeDasharray="4 4"
                                    opacity="0.7"
                                    markerEnd="url(#arrowhead)"
                                 />
                              ))}
                           <defs>
                              <marker
                                 id="arrowhead"
                                 markerWidth="10"
                                 markerHeight="7"
                                 refX="9"
                                 refY="3.5"
                                 orient="auto"
                              >
                                 <polygon points="0 0, 10 3.5, 0 7" fill="white" opacity="0.7" />
                              </marker>
                           </defs>
                        </svg>
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* Component Detail Slide-out Panel */}
         <AnimatePresence>
            {selectedComponent && (
               <>
                  {/* Backdrop */}
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                     onClick={() => setSelectedComponent(null)}
                  />

                  {/* Panel */}
                  <motion.div
                     initial={{ x: "100%" }}
                     animate={{ x: 0 }}
                     exit={{ x: "100%" }}
                     transition={{ type: "spring", damping: 30, stiffness: 300 }}
                     className="fixed rounded-4xl top-3 right-0 bottom-3 w-full max-w-md z-50 bg-[#0c0c0c] border-l border-white/10 shadow-2xl overflow-y-auto"
                  >
                     <div className="p-8 space-y-8">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                           <div className="space-y-2">
                              <h2 className="text-2xl font-display font-bold text-white">
                                 {"label" in selectedComponent
                                    ? selectedComponent.label
                                    : selectedComponent.target}
                              </h2>
                              <div
                                 className={`
                        inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border
                        ${STATUS_COLORS[getStatusFromComponent(selectedComponent)].bg}
                        ${STATUS_COLORS[getStatusFromComponent(selectedComponent)].text}
                        ${STATUS_COLORS[getStatusFromComponent(selectedComponent)].border.replace("stroke-", "border-")}
                      `}
                              >
                                 {getStatusFromComponent(selectedComponent) === "found" && "✓ Found"}
                                 {getStatusFromComponent(selectedComponent) === "not_visible" && "⚠ Not Visible"}
                                 {getStatusFromComponent(selectedComponent) === "not_present" && "✗ Not Present"}
                                 {getStatusFromComponent(selectedComponent) === "ambiguous" && "? Ambiguous"}
                              </div>
                           </div>
                           <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedComponent(null)}
                              className="text-white/50 hover:text-white"
                           >
                              <X className="w-6 h-6" />
                           </Button>
                        </div>

                        {/* Details Grid */}
                        <div className="space-y-6">
                           {/* Location & Landmark Section */}
                           <div className="grid gap-6 p-5 rounded-2xl bg-white/5 border border-white/10">
                              {"spatial_description" in selectedComponent && selectedComponent.spatial_description && (
                                 <div>
                                    <h4 className="text-xs uppercase tracking-widest font-bold text-white/40 mb-2">Location</h4>
                                    <div className="flex items-start gap-2 text-white/90">
                                       <div className="p-1 rounded bg-white/10 mt-0.5">
                                          <Maximize2 className="w-3 h-3" />
                                       </div>
                                       {selectedComponent.spatial_description}
                                    </div>
                                 </div>
                              )}

                              {"landmark_description" in selectedComponent && selectedComponent.landmark_description && (
                                 <div>
                                    <h4 className="text-xs uppercase tracking-widest font-bold text-white/40 mb-2">Landmark</h4>
                                    <div className="flex items-start gap-2 text-white/90">
                                       <div className="p-1 rounded bg-white/10 mt-0.5">
                                          <Tag className="w-3 h-3" />
                                       </div>
                                       {selectedComponent.landmark_description}
                                    </div>
                                 </div>
                              )}
                           </div>

                           {/* Analysis / Reasoning */}
                           {"reasoning" in selectedComponent && selectedComponent.reasoning && (
                              <div>
                                 <h4 className="text-sm font-semibold text-white/70 mb-2">Analysis</h4>
                                 <p className="text-white/80 leading-relaxed text-sm">{selectedComponent.reasoning}</p>
                              </div>
                           )}

                           {/* Suggested Action - Highlighted */}
                           {"suggested_action" in selectedComponent && selectedComponent.suggested_action && (
                              <div className="bg-accent/10 border border-accent/20 rounded-xl p-5">
                                 <h4 className="text-sm font-bold text-accent mb-2 flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4" />
                                    Suggested Action
                                 </h4>
                                 <p className="text-accent/90 pl-6">{selectedComponent.suggested_action}</p>
                              </div>
                           )}

                           {/* Confidence Bar */}
                           {"confidence" in selectedComponent && (
                              <div>
                                 <h4 className="text-xs uppercase tracking-widest font-bold text-white/40 mb-2">AI Confidence</h4>
                                 <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                       initial={{ width: 0 }}
                                       animate={{ width: `${selectedComponent.confidence * 100}%` }}
                                       transition={{ duration: 1, ease: "easeOut" }}
                                       className={`absolute h-full rounded-full ${selectedComponent.confidence >= 0.8
                                          ? "bg-emerald-500"
                                          : selectedComponent.confidence >= 0.5
                                             ? "bg-amber-500"
                                             : "bg-red-500"
                                          }`}
                                    />
                                 </div>
                                 <p className="text-xs text-right text-white/40 mt-1.5 font-mono">
                                    {Math.round(selectedComponent.confidence * 100)}% Match
                                 </p>
                              </div>
                           )}
                        </div>

                        {/* Bottom Actions */}
                        <div className="pt-4 mt-auto">
                           <Button
                              variant="outline"
                              className="w-full h-12 text-base font-medium border-white/10 hover:bg-white/5"
                              onClick={() => setSelectedComponent(null)}
                           >
                              Close Details
                           </Button>
                        </div>
                     </div>
                  </motion.div>
               </>
            )}
         </AnimatePresence>
      </>
   );
}
