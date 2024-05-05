export async function jsonToTypeScript(jsonObj: object, typeName: string, indentLevel = 1) {
  const indent = "  ".repeat(indentLevel);
  let typeDefinition = `export type ${typeName} = {\n`;

  for (const [key, value] of Object.entries(jsonObj)) {
    if (Array.isArray(value)) {
      const arrayTypes = value.map((v) => {
        if (typeof v === "object" && v !== null) {
          return jsonToTypeScript(v, capitalize(key) + "Item", indentLevel + 1);
        }
        return typeof v;
      });

      typeDefinition += `${indent}${key}: ${arrayTypes[0]}[];\n`;
    } else if (typeof value === "object" && value !== null) {
      const nestedTypeName = capitalize(key);
      typeDefinition += `${indent}${key}: ${nestedTypeName};\n`;
      typeDefinition += jsonToTypeScript(
        value,
        nestedTypeName,
        indentLevel + 1
      );
    } else {
      typeDefinition += `${indent}${key}: ${typeof value};\n`;
    }
  }

  typeDefinition += "};\n";
  return typeDefinition;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
