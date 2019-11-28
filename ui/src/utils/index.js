/**
 * Clones object.
 *
 * @param {*} x -- the object
 */
export const clone = (x) => JSON.parse(JSON.stringify(x))

/**
 * Generates random UUID
 */
export const generateGUID = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
}

/**
 * Indicates if the object is blank.
 *
 * Options:
 *    - "null"
 *    - "undefined"
 *    - blank strings
 *    - empty arrays
 *    - empty objects
 *    - "false" is not blank.
 *
 * @param {*} value -- the object
 */
export const isEmpty = (value) => (
  value === null ||
  value === undefined ||
  JSON.stringify(value) === '{}' ||
  value.toString().trim() === ''
)

/**
 * Replaces the given object in the list, identified by the `id`
 *
 * @param {Array}   list
 * @param {Object}  obj
 */
export const replaceItemInList = (list, obj) => (
  (list || []).map(item => item.id === obj.id ? obj : item)
)

/**
 * Removes the given object in the list, identified by the `id`
 *
 * @param {Array}   list
 * @param {Object}  obj
 */
export const removeItemFromList = (list, obj) => (
  (list || []).filter(item => item.id !== obj.id)
)

export const dataToSelectOptions = data => {
    return data.map(d => (
        {
            value: d.id,
            label: d.name
        }
    ))
}
