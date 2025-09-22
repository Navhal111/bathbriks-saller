export default function getDirtyValues<
  DirtyFields extends Record<string, any>,
  Values extends Record<string, any>
>(dirtyFields: DirtyFields, values: Values): Partial<Values> {
  const dirtyValues: Partial<Record<keyof Values, any>> = {};

  Object.keys(dirtyFields).forEach((key) => {
    const dirtyField = dirtyFields[key];
    const value = values[key];

    if (!dirtyField) return;

    if (Array.isArray(dirtyField) && Array.isArray(value)) {
      const filteredArray = dirtyField
        .map((df, index) => {
          const val = value[index];
          if (!df) return null;

          const nestedDirty = getDirtyValues(df, val);
          if (Object.keys(nestedDirty).length > 0) {
            // 🟢 If any nested field is dirty, return full object from `value`
            return val;
          }
          return null;
        })
        .filter(Boolean); // remove nulls (i.e., unchanged items or removed)

      if (filteredArray.length > 0) {
        dirtyValues[key as keyof Values] = filteredArray;
      }
    } else if (typeof dirtyField === 'object' && dirtyField !== null) {
      const nestedDirty = getDirtyValues(dirtyField, value);
      if (Object.keys(nestedDirty).length > 0) {
        dirtyValues[key as keyof Values] = value; // return full object
      }
    } else {
      dirtyValues[key as keyof Values] = value;
    }
  });

  return dirtyValues;
}