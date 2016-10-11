/// <reference path="./jquery-zoom/jquery-zoom.d.ts"/>

declare interface IDeclare {
  (string): string;
  context: (directory: string, useSubdirectories: boolean, regExp: RegExp) => IDeclare;
  resolve: (path: string) => IDeclare;
}
declare let require: IDeclare;
