import Polygon from './Polygon';


export default class Random extends Polygon {

  _draw() {
    const vertices = this.settings.vertices;
    this.moveTo(vertices[0].x, vertices[0].y);
    let vertex;
    for (vertex = 1; vertices.length > vertex; vertex += 2) {
      const pVertex = vertices[vertex];
      this._drawSide(pVertex, vertex, vertices);
    }
  }

  _drawSide(pVertex, vertex, vertices) {
    this.quadraticCurveTo(
      pVertex.x,
      pVertex.y,
      vertices[vertex + 1].x,
      vertices[vertex + 1].y,
    );
  }
}