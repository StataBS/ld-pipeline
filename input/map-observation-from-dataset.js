const p = require('barnard59')

const terms = {
  dataSet: p.rdf.namedNode('http://purl.org/linked-data/cube#dataSet'),
  observation: p.rdf.namedNode('http://purl.org/linked-data/cube#observation')
}

function mapObservationFromDataset (quad) {
  const quads = [quad]

  if (quad.predicate.equals(terms.dataSet)) {
    quads.push(p.rdf.quad(quad.object, terms.observation, quad.subject))
  }

  return quads
}

module.exports = mapObservationFromDataset
