import addLayer from "./taizhou.js";
import {ElementSubType, ElementType, RoadMarkingType} from "./element.js";
// import mapboxgl from '../dist/mapbox-gl-dev.js'
export default class Manager extends TMap.ModelPlugin {
  constructor(opts = {}) {
    window.mapboxgl.accessToken = opts.mbToken;
    super(opts);
    this.map = opts.map;
  }


  onAddToMap({ canvas, camera }) {
    this.container = canvas.parentElement;

    const { map } = this;
    this.center = map.getCenter();
    this.zoom = map.getZoom() - 1;
    this.rotation = -map.getRotation();
    this.pitch = map.getPitch();

     const mbMap = this.mbMap = new mapboxgl.Map({
      container: this.container,
      zoom: this.zoom,
      center: [center.lng, center.lat],
       pitch: this.pitch,
       bearing: this.rotation,
      // style: 'mapbox://styles/mapbox/streets-v10',
      style: './style1.json',
      // style: './taizhou.json',
       attributionControl: false,

    });
     addLayer()
    // mbMap.on('load', function() {
    //   this.render = true;
    //   mbMap.addLayer({
    //     "id": "mapillary",
    //     "type": "line",
    //     "source": {
    //       "type": "vector",
    //       "tiles": ["https://d25uarhxywzl1j.cloudfront.net/v0.1/{z}/{x}/{y}.mvt"],
    //       "minzoom": 3,
    //       "maxzoom": 15
    //     },
    //     "source-layer": "mapillary-sequences",
    //     "layout": {
    //       "line-cap": "round",
    //       "line-join": "round"
    //     },
    //     "paint": {
    //       "line-opacity": 0.6,
    //       "line-color": "rgb(53, 175, 109)",
    //       "line-width": 2
    //     }
    //   });
    // });


//     mbMap.on('load', function() {
//       // addLayer(mbMap);
//       const layerPrefix = "roadnetwork_";
//       const sourceLayerPrefix = "high_high_network_";
//       const hideRoadBackground = false;
//
//       mbMap.addSource('high_pre', {
//         "type": "vector",
//         "scheme": "tms",
//         "tiles": [
//           "http://58.211.179.194:5673/geoserver/gwc/service/tms/1.0.0/sz:sz_mb@EPSG:900913@pbf/{z}/{x}/{y}.pbf",
//           "http://58.211.179.194:5673/geoserver2/gwc/service/tms/1.0.0/high:high_high@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
//         ],
//         "pixelRatio": 2
//       });
//
//       mbMap.addLayer({
//         "id": "roadnetwork_polygons",
//         "type": "fill",
//         "minzoom": 15,
//         "source": "high_pre",
//         "source-layer": "high_high_network_polygon",
//         "paint": {
//           "fill-color": ["get", "COLOR"],
//           "fill-outline-color": "transparent",
//
//         },
//         "filter": ["==", "GRADE", "0"],
//       });
//       mbMap.addLayer({
//         "id": "roadnetwork_lines",
//         "type": "line",
//         "minzoom": 15,
//         "source": "high_pre",
//         "source-layer": "high_high_network_line",
//         "paint": {
//           "line-width": [
//             "interpolate",
//             ["linear"],
//             ["zoom"],
//             17,
//             1,
//             22,
//             ["to-number", ["get", "WIDTH"]],
//           ],
//           "line-color": ["get", "COLOR"],
//         },
//       });
//       mbMap.addLayer({
//         "id": "roadnetwork_text",
//         "type": "symbol",
//         "minzoom": 17,
//         "source": "high_pre",
//         "source-layer": "high_high_network_symbol",
//         "paint": {
//           "text-color": ["get", "COLOR"],
//           "text-opacity": 1,
//           "text-halo-color": "#262626",
//           "text-halo-width": 1,
//         },
//         "layout": {
//           "text-field": ["get", "TEXT"],
//           "text-font": ["Microsoft YaHei"],
//           "text-size": ["get", "SIZE"],
//           "text-rotate": ["get", "RADIAN"],
//           "text-anchor": ["get", "POSITION"],
//           "text-rotation-alignment": "map",
//         },
//       });
//       mbMap.addLayer({
//         "id": "roadnetwork_polygons1",
//         "type": "fill",
//         "minzoom": 15,
//         "source": "high_pre",
//         "source-layer": "high_high_network_polygon",
//         "paint": {
//           "fill-color": ["get", "COLOR"],
//           "fill-outline-color": "transparent",
//
//         },
//         "filter": ["all", [">=", "GRADE", "1"], ["!=", "COLOR", "#27DF1D"]],
//       });
//       mbMap.addLayer({
//         "id": "roadnetwork_polygons_green",
//         "type": "fill-extrusion",
//         "minzoom": 15,
//         "source": "high_pre",
//         "source-layer": "high_high_network_polygon",
//         "paint": {
//           "fill-extrusion-color": "transparent",
//           "fill-extrusion-pattern": "meadow",
//           "fill-extrusion-height": 1,
//           "fill-extrusion-opacity": 1
//         },
//         "filter": ["==", "COLOR", "#27DF1D"],
//       });
//
// // 绘制面图层：底图
// //       mbMap.addLayer({
// //         "id": layerPrefix + "bg",
// //         "type": "fill",
// //         "minzoom": 15,
// //         "source": "roadNetwork",
// //         "source-layer": sourceLayerPrefix ? sourceLayerPrefix + "polygon" : "",
// //         "paint": {
// //           // "fill-color": ["get", getProp("color")],
// //           "fill-color": hideRoadBackground ? "transparent" : ["get", getProp("color")],
// //           "fill-outline-color": "transparent",
// //
// //         },
// //         "filter": ["any", ["==", getProp("elType"), ElementType.INTERSECTION], ["==", getProp("elType"), ElementType.ROAD], ["==", getProp("elType"), ElementType.CONNECT_ROAD]],
// //       });
// //
// // // 绘制文本图层
// //       mbMap.addLayer({
// //         "id": layerPrefix + "text",
// //         "type": "symbol",
// //         "minzoom": 17,
// //         "source": "roadNetwork",
// //         "source-layer": sourceLayerPrefix ? sourceLayerPrefix + "symbol" : "",
// //         "paint": {
// //           "text-color": ["get", getProp("color")],
// //           "text-opacity": 1,
// //           "text-halo-color": "#262626",
// //           "text-halo-width": 1,
// //         },
// //         "layout": {
// //           "text-field": ["get", getProp("text")],
// //           "text-font": ["Microsoft YaHei"],
// //           // "text-size": 30,
// //           "text-size": [
// //             "interpolate",
// //             ["linear"],
// //             ["zoom"],
// //             17,
// //             6,
// //             22,
// //             ["get", getProp("size")],
// //           ],
// //
// //           "text-rotate": ["to-number", ["get", getProp("radian")]],
// //           "text-anchor": ["get", getProp("position")],
// //           "text-rotation-alignment": "map",
// //           // "text-writing-mode": ["horizontal"],
// //         },
// //         "filter": ["==", getProp("elType"), ElementType.ROAD_NAME],
// //       });
// //
// // // 线条
// //       const layer = {
// //         "id": layerPrefix + "lines",
// //         "type": "line",
// //         "minzoom": 15,
// //         "source": "roadNetwork",
// //         "source-layer": sourceLayerPrefix ? sourceLayerPrefix + "line" : "",
// //         "paint": {
// //           "line-width": [
// //             "interpolate",
// //             ["linear"],
// //             ["zoom"],
// //             17,
// //             1,
// //             22,
// //             ["to-number", ["get", getProp("width")]],
// //           ],
// //           "line-color": ["get", getProp("color")],
// //         },
// //         "filter": ["any",
// //           ["==", getProp("elType"), ElementType.STOP_LINE],
// //           ["==", getProp("subtype"), ElementSubType.SOLID_LINE],
// //           ["==", getProp("subtype"), ElementSubType.DASH_LINE],
// //           ["==", getProp("subtype"), ElementSubType.DOUBLE_YELLOW_LINE],
// //           ["==", getProp("subtype"), ElementSubType.SINGLE_YELLOW_LINE],
// //           ["==", getProp("subtype"), ElementSubType.GUARD],
// //           ["==", getProp("elType"), ElementType.ZEBRA_LINE],
// //           ["==", getProp("elType"), ElementType.TRANSFER_AREA],
// //         ],
// //       };
// // // if (!sourceLayerPrefix) { layer.filter = ["==", "single", false]; }
// //       mbMap.addLayer(layer);
// //
// // // 箭头
// //       mbMap.addLayer({
// //         "id": layerPrefix + "arrow",
// //         "type": "fill",
// //         "minzoom": 15,
// //         "source": "roadNetwork",
// //         "source-layer": sourceLayerPrefix ? sourceLayerPrefix + "polygon" : "",
// //         "paint": {
// //           "fill-color": ["get", getProp("color")],
// //           "fill-outline-color": "transparent",
// //         },
// //         "filter": ["any", ["==", getProp("elType"), ElementType.ARROW], ["==", getProp("subtype"), RoadMarkingType.ARROW]],
// //       });
// //
// // // 绿化带
// //       mbMap.addLayer({
// //         "id": "roadnetwork_polygons_green",
// //         "type": "fill-extrusion",
// //         "minzoom": 15,
// //         "source": "roadNetwork",
// //         "source-layer": "high_high_network_polygon",
// //         "paint": {
// //           "fill-extrusion-color": "transparent",
// //           "fill-extrusion-pattern": "meadow",
// //           "fill-extrusion-height": 1,
// //           "fill-extrusion-opacity": 1
// //         },
// //         "filter": ["==", "COLOR", "#27DF1D"],
// //       });
// //
// // // 绿化上的人行道
// //       mbMap.addLayer({
// //         "id": layerPrefix + "green_walk",
// //         "type": "fill",
// //         "minzoom": 15,
// //         "source": "roadNetwork",
// //         "source-layer": sourceLayerPrefix ? sourceLayerPrefix + "polygon" : "",
// //         "paint": {
// //           "fill-color": hideRoadBackground ? "transparent" : ["get", getProp("color")],
// //           "fill-outline-color": "transparent",
// //
// //         },
// //         "filter": ["==", getProp("subtype"), ElementSubType.RIGHT_TURN_WALK],
// //       });
// //
// // // 绿化上的人行道上的白线
// //       mbMap.addLayer({
// //         "id": layerPrefix + "walk_lines",
// //         "type": "line",
// //         "minzoom": 15,
// //         "source": "roadNetwork",
// //         "source-layer": sourceLayerPrefix ? sourceLayerPrefix + "line" : "",
// //         "paint": {
// //           "line-width": [
// //             "interpolate",
// //             ["linear"],
// //             ["zoom"],
// //             17,
// //             1,
// //             22,
// //             ["to-number", ["get", getProp("width")]],
// //           ],
// //           "line-color": ["get", getProp("color")],
// //         },
// //         "filter": ["==", getProp("grade"), "4"],
// //       });
// //
// // // 马路牙子
// //       mbMap.addLayer({
// //         "id": layerPrefix + "curb",
// //         "type": "fill-extrusion",
// //         "minzoom": 15,
// //         "source": "roadNetwork",
// //         "source-layer": sourceLayerPrefix ? sourceLayerPrefix + "polygon" : "",
// //         "paint": {
// //           "fill-extrusion-pattern": "roadnetwork-curb",
// //           "fill-extrusion-height": 0.5,
// //         },
// //         "filter": ["==", getProp("grade"), "5"],
// //       });
//     });

    // this.mbMap = mbMap;
  }

  onRemoveFromMap() {

  }

  onDraw() {
    const { map, mbMap } = this;
    const center = map.getCenter();
    const zoom = map.getZoom() - 1;
    const rotation = -map.getRotation();
    const pitch = map.getPitch();

    if (center !== this.center || zoom !== this.zoom || rotation !== this.rotation || pitch !== this.pitch) {
      mbMap.jumpTo({
        center: center,
        zoom: zoom,
        bearing: rotation,
        pitch: pitch
      })
      this.center = center;
      this.zoom = zoom;
      this.rotation = rotation;
      this.pitch = pitch;
    }

    mbMap._render(this.gl.frameBuffer._object);
  }

  static addLayer(container) {
    container.on('load', function() {
      container.addLayer({
        "id": "mapillary",
        "type": "line",
        "source": {
          "type": "vector",
          "tiles": ["https://d25uarhxywzl1j.cloudfront.net/v0.1/{z}/{x}/{y}.mvt"],
          "minzoom": 3,
          "maxzoom": 15
        },
        "source-layer": "mapillary-sequences",
        "layout": {
          "line-cap": "round",
          "line-join": "round"
        },
        "paint": {
          "line-opacity": 0.6,
          "line-color": "rgb(53, 175, 109)",
          "line-width": 2
        }
      });
    });
  }
}
function getProp(prop) {
  return prop.toUpperCase();
}