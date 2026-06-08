declare module '*.yml' {
  const data: unknown;
  export default data;
}

declare module '*.yaml' {
  const data: unknown;
  export default data;
}

declare module 'js-yaml' {
  export function load(input: string): unknown;
}
