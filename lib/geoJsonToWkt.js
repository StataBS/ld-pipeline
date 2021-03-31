const namespace = require('@rdfjs/namespace')
const rdf = require('rdf-ext')
const wellknown = require('wellknown')

const ns = {
  geo: namespace('http://www.opengis.net/ont/geosparql#'),
  rdf: namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
}

function geoJsonToWkt (quad) {
  if (!quad.predicate.equals(ns.geo.hasGeometry)) {
    return [quad]
  }

  const geometry = rdf.namedNode(`${quad.subject.value}/geometry`)
  const wkt = rdf.literal(wellknown.stringify(JSON.parse(quad.object.value)), ns.geo.wktLiteral)

  return [
    rdf.quad(quad.subject, ns.geo.hasGeometry, geometry),
    rdf.quad(geometry, ns.rdf.type, ns.geo.Geometry),
    rdf.quad(geometry, ns.geo.asWKT, wkt)
  ]
}

module.exports = geoJsonToWkt