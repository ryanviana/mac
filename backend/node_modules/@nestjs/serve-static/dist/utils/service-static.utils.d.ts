export declare function loadPackage<T = any>(
  packageName: string,
  context: string,
  loaderFn?: () => T
): T;
