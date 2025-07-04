import _ from 'lodash'

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)))

  return keys.flatMap((key) => {
    if (!_.has(obj2, key)) {
      return { type: 'removed', key, value: obj1[key] }
    }
    if (!_.has(obj1, key)) {
      return { type: 'added', key, value: obj2[key] }
    }

    const value1 = obj1[key]
    const value2 = obj2[key]

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'nested', key, children: buildDiff(value1, value2) }
    }

    if (!_.isEqual(value1, value2)) {
      return [
        { type: 'removed', key, value: value1 },
        { type: 'added', key, value: value2 }
      ]
    }

    return { type: 'unchanged', key, value: value1 }
  })
}

export default buildDiff
