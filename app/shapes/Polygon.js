import {AShape} from "./AShape";


export default class Polygon extends AShape {

  _approveSettings(options) {
    this.settings = Object.assign({
      vertices: [],
      color: 0xFFFF0B
    }, options);
  }

  _draw() {
    const vertices = this.settings.vertices;

    this.moveTo(vertices[0].x, vertices[0].y);
    let iVertex;
    for (iVertex = 1; vertices.length > iVertex; iVertex++) {
      const pVertex = vertices[iVertex];
      this._drawSide(pVertex, iVertex, vertices);
    }
  }

  _drawSide(pVertex, iVertex, vertices) {
    this.lineTo(
      pVertex.x,
      pVertex.y
    );
  }
}