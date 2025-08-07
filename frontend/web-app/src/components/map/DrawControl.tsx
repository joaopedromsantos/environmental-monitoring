import { useProjectsContext } from '@/contexts/ProjectsContext';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useEffect, useRef } from 'react';
import circle from '@turf/circle';
import L from 'leaflet';
import { DefaultIcon } from '@/utils/defaultLeafletIcon'


export function DrawControl() {
  const { isDrawingOnMap, setIsDrawingOnMap, setDrawnGeometry, drawnGeometry } =
    useProjectsContext();
  const featureGroupRef = useRef<L.FeatureGroup>(null);

  useEffect(() => {
    if (!drawnGeometry && featureGroupRef.current) {
      featureGroupRef.current.clearLayers();
    }
  }, [drawnGeometry]);

  const handleCreated = (e: L.DrawEvents.Created) => {
    console.log(e);
    const { layer, layerType } = e;
    let newGeometry;

    if (layerType === 'circle') {
      const circleLayer = layer as L.Circle;
      const center = circleLayer.getLatLng();
      const radius = circleLayer.getRadius();
      
      const options = { steps: 64, units: 'meters' as const };
      const circlePolygon = circle([center.lng, center.lat], radius, options);
      newGeometry = circlePolygon.geometry;

    } else {
      newGeometry = layer.toGeoJSON().geometry;
    }
    setDrawnGeometry(newGeometry);
    setIsDrawingOnMap(false);
  };

  return (
    <FeatureGroup ref={featureGroupRef}>
      {isDrawingOnMap && (
        <EditControl
          position="topright"
          onCreated={handleCreated}
          draw={{
            rectangle: false,
            circle: true,
            marker: {
                icon: DefaultIcon,
            },
            polygon: true,
            polyline: false,
            circlemarker: false,
          }}
          edit={{ edit: false, remove: false }}
        />
      )}
    </FeatureGroup>
  );
}
