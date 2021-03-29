import {ElementType, ElementSubType, RoadMarkingType} from './element.js'
export default function addLayer(mbMap) {
const layerPrefix = "roadnetwork_";
const sourceLayerPrefix = "high_high_network_";
const hideRoadBackground = false;

  mbMap.addSource('roadNetwork', {
    type: "vector",
    scheme: "tms",
    tiles: ["http://58.211.179.194:5673/geoserver2/gwc/service/tms/1.0.0/high:high_high@EPSG:900913@pbf/{z}/{x}/{y}.pbf"],
    pixelRatio: 2,
  });

// 绘制面图层：底图
  mbMap.addLayer({
    "id": layerPrefix + "bg",
    "type": "fill",
    "minzoom": 15,
    "source": "roadNetwork",
    "source-layer": sourceLayerPrefix ? sourceLayerPrefix + "polygon" : "",
    "paint": {
      // "fill-color": ["get", getProp("color")],
      "fill-color": hideRoadBackground ? "transparent" : ["get", getProp("color")],
      "fill-outline-color": "transparent",

    },
    "filter": ["any", ["==", getProp("elType"), ElementType.INTERSECTION], ["==", getProp("elType"), ElementType.ROAD], ["==", getProp("elType"), ElementType.CONNECT_ROAD]],
  });

// 绘制文本图层
  mbMap.addLayer({
    "id": layerPrefix + "text",
    "type": "symbol",
    "minzoom": 17,
    "source": "roadNetwork",
    "source-layer": sourceLayerPrefix ? sourceLayerPrefix + "symbol" : "",
    "paint": {
      "text-color": ["get", getProp("color")],
      "text-opacity": 1,
      "text-halo-color": "#262626",
      "text-halo-width": 1,
    },
    "layout": {
      "text-field": ["get", getProp("text")],
      "text-font": ["Microsoft YaHei"],
      // "text-size": 30,
      "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        17,
        6,
        22,
        ["get", getProp("size")],
      ],

      "text-rotate": ["to-number", ["get", getProp("radian")]],
      "text-anchor": ["get", getProp("position")],
      "text-rotation-alignment": "mbMap",
      // "text-writing-mode": ["horizontal"],
    },
    "filter": ["==", getProp("elType"), ElementType.ROAD_NAME],
  });

// 线条
  const layer = {
    "id": layerPrefix + "lines",
    "type": "line",
    "minzoom": 15,
    "source": "roadNetwork",
    "source-layer": sourceLayerPrefix ? sourceLayerPrefix + "line" : "",
    "paint": {
      "line-width": [
        "interpolate",
        ["linear"],
        ["zoom"],
        17,
        1,
        22,
        ["to-number", ["get", getProp("width")]],
      ],
      "line-color": ["get", getProp("color")],
    },
    "filter": ["any",
      ["==", getProp("elType"), ElementType.STOP_LINE],
      ["==", getProp("subtype"), ElementSubType.SOLID_LINE],
      ["==", getProp("subtype"), ElementSubType.DASH_LINE],
      ["==", getProp("subtype"), ElementSubType.DOUBLE_YELLOW_LINE],
      ["==", getProp("subtype"), ElementSubType.SINGLE_YELLOW_LINE],
      ["==", getProp("subtype"), ElementSubType.GUARD],
      ["==", getProp("elType"), ElementType.ZEBRA_LINE],
      ["==", getProp("elType"), ElementType.TRANSFER_AREA],
    ],
  };
// if (!sourceLayerPrefix) { layer.filter = ["==", "single", false]; }
  mbMap.addLayer(layer);

// 箭头
  mbMap.addLayer({
    "id": layerPrefix + "arrow",
    "type": "fill",
    "minzoom": 15,
    "source": "roadNetwork",
    "source-layer": sourceLayerPrefix ? sourceLayerPrefix + "polygon" : "",
    "paint": {
      "fill-color": ["get", getProp("color")],
      "fill-outline-color": "transparent",
    },
    "filter": ["any", ["==", getProp("elType"), ElementType.ARROW], ["==", getProp("subtype"), RoadMarkingType.ARROW]],
  });

// 绿化带
  mbMap.addLayer({
    "id": layerPrefix + "green",
    "type": "fill-extrusion",
    "minzoom": 15,
    "source": "roadNetwork",
    "source-layer": sourceLayerPrefix ? sourceLayerPrefix + "polygon" : "",
    "paint": {
      "fill-extrusion-color": "transparent",
      "fill-extrusion-pattern": "meadow",
      "fill-extrusion-height": 1,
      "fill-extrusion-opacity": 1
    },
    "filter": ["==", getProp("subtype"), ElementSubType.GREEN],
  });

// 绿化上的人行道
  mbMap.addLayer({
    "id": layerPrefix + "green_walk",
    "type": "fill",
    "minzoom": 15,
    "source": "roadNetwork",
    "source-layer": sourceLayerPrefix ? sourceLayerPrefix + "polygon" : "",
    "paint": {
      "fill-color": hideRoadBackground ? "transparent" : ["get", getProp("color")],
      "fill-outline-color": "transparent",

    },
    "filter": ["==", getProp("subtype"), ElementSubType.RIGHT_TURN_WALK],
  });

// 绿化上的人行道上的白线
  mbMap.addLayer({
    "id": layerPrefix + "walk_lines",
    "type": "line",
    "minzoom": 15,
    "source": "roadNetwork",
    "source-layer": sourceLayerPrefix ? sourceLayerPrefix + "line" : "",
    "paint": {
      "line-width": [
        "interpolate",
        ["linear"],
        ["zoom"],
        17,
        1,
        22,
        ["to-number", ["get", getProp("width")]],
      ],
      "line-color": ["get", getProp("color")],
    },
    "filter": ["==", getProp("grade"), "4"],
  });

// 马路牙子
  mbMap.addLayer({
    "id": layerPrefix + "curb",
    "type": "fill-extrusion",
    "minzoom": 15,
    "source": "roadNetwork",
    "source-layer": sourceLayerPrefix ? sourceLayerPrefix + "polygon" : "",
    "paint": {
      "fill-extrusion-pattern": "roadnetwork-curb",
      "fill-extrusion-height": 0.5,
    },
    "filter": ["==", getProp("grade"), "5"],
  });
}
function getProp(prop) {
  return prop.toUpperCase();
}