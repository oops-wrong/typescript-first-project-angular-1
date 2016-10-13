/// <reference path="./jquery-zoom/jquery-zoom.d.ts"/>

declare interface IRequire {
  (string): string;
  context: (directory: string, useSubdirectories: boolean, regExp: RegExp) => IRequire;
  resolve: (path: string) => IRequire;
}
declare let require: IRequire;
