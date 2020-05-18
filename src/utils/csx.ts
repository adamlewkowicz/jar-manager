type StaticClassName = string | boolean | undefined | null;

interface ClassNameMap {
  [key: string]: boolean | undefined;
}

const getClassNamesFromMap = (classNameMap: ClassNameMap): string[] =>
  Object.keys(classNameMap).filter(
    (className) => classNameMap[className] === true,
  );

export const csx = (
  ...args: (StaticClassName | ClassNameMap)[]
): string =>
  args
    .flatMap<string>((classNameOrMap) => {
      if (classNameOrMap == null) {
        return [];
      }
      if (typeof classNameOrMap === 'string') {
        return classNameOrMap;
      }
      if (typeof classNameOrMap === 'object') {
        return getClassNamesFromMap(classNameOrMap);
      }
      return [];
    })
    .join(' ');
