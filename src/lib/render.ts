/**
 * Simple template engine allowing to replace %var% expressions.
 * @param template The string template.
 * @param variables The replace variables.
 */
export default (template: string, variables: Record<string, any>) => {
  return Object.entries(variables).reduce((acc, [key, val]) => {
    return acc.replace(new RegExp(`%${key}%`, 'g'), val.toString());
  }, template);
};
