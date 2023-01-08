function addKeys<T extends { [key: string]: any }>(arr: T[], childField: string, parentKey?: string): T[] {
  return arr.map((obj, i) => {
    const key = parentKey ? `${parentKey}-${i}` : `${i}`;
    if (obj[childField]) {
      return { ...obj, key, [childField]: addKeys(obj[childField], childField, key) };
    }
    return { ...obj, key };
  });
}


export { addKeys };

