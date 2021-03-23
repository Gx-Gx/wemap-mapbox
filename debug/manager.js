
export default class Manager extends TMap.ModelPlugin {
  constructor(opts = {}) {
    super(opts);
    this.map = opts.map;
  }


  _onAddToMap({ canvas, camera }) {
    this.container = canvas.parentElement;
    console.log("test");
    const lat = this.map.getCenter().lat;
    const lng = this.map.getCenter().lng;
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvcmdlZ3VhbiIsImEiOiJja2xicmhyZXgwbm4zMm9xdDhtaXFkejh1In0.ezeFiXzrqQX1J-_27lm1DA';
     const mbMap = new mapboxgl.Map({
      container: this.container,
      zoom: 3,
      center: [lng, lat],
      // style: 'mapbox://styles/mapbox/streets-v10',
      style: './style.json',
    });

    // mbMap.on('load', function() {
    //
    //   mbMap.addLayer({
    //     "id": "mapillary",
    //     "type": "line",
    //     "source": {
    //       "type": "vector",
    //       "tiles": ["https://d25uarhxywzl1j.cloudfront.net/v0.1/{z}/{x}/{y}.mvt"],
    //       "minzoom": 6,
    //       "maxzoom": 14
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
    //   }, 'waterway-label');
    // });

    this.mbMap = mbMap;
  }

  _onRemoveFromMap() {

  }

  _onDraw() {
    const { map, mbMap } = this;
    const center = map.getCenter();
    const zoom = map.getZoom() - 1;
    const rotation = map.getRotation();
    const pitch = map.getPitch();
    mbMap.setCenter([center.lng, center.lat]);
    mbMap.setZoom(zoom);
    mbMap.setBearing(-rotation);
    mbMap.setPitch(pitch);
    // console.log(this.gl.frameBuffer._object);
    mbMap._render(this.gl.frameBuffer._object);
  }

}
