/// <reference path="./jquery-zoom/jquery-zoom.d.ts"/>

/**
 * Method require().
 */
declare interface IRequire {
  (string): string;
  context: (directory: string, useSubdirectories: boolean, regExp: RegExp) => IRequire;
  resolve: (path: string) => IRequire;
}
declare let require: IRequire;
