import _ from 'lodash'

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)))
  
  return keys.map((key) => {
    if (!_.has(obj2, key)) {
      return { key, value: obj1[key], type: 'removed' }
    }
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], type: 'added' }
    }
    
    const value1 = obj1[key]
    const value2 = obj2[key]
    
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, children: buildDiff(value1, value2), type: 'nested' }
    }
    
    if (!_.isEqual(value1, value2)) {
      return { 
        key, 
        oldValue: value1, 
        newValue: value2, 
        type: 'changed' 
      }
    }
    
    return { key, value: value1, type: 'unchanged' }
  })
}

export default buildDiff