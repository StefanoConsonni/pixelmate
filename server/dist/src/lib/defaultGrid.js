"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultGrid = void 0;
const color_1 = require("./color");
const fs = __importStar(require("fs"));
const GRID_SIZE = 80;
const GRID_CENTER = (GRID_SIZE - 1) / 2;
const RADIUS = GRID_CENTER;
const USERS = ["florent", "swann", "theo", "nicolas", "daminou21", "stefano"];
const createDefaultGrid = () => {
  const grid = {};
  for (let x = 0; x < GRID_SIZE; x += 1) {
    for (let y = 0; y < GRID_SIZE; y += 1) {
      const shouldHavePixel =
        Math.pow(x - GRID_CENTER, 2) + Math.pow(y - GRID_CENTER, 2) < Math.pow(GRID_CENTER, 2);
      if (!shouldHavePixel) {
        continue;
      }
      let [, phi] = (0, color_1.xy2polar)(x - GRID_CENTER, y - GRID_CENTER);
      let hue = (0, color_1.rad2deg)(phi);
      let saturation =
        Math.sqrt(Math.pow(x - GRID_CENTER, 2) + Math.pow(y - GRID_CENTER, 2)) / RADIUS;
      let value = 1.0;
      let [red, green, blue] = (0, color_1.hsv2rgb)(hue, saturation, value);
      grid[`${x}-${y}`] = {
        user: USERS[Math.floor(Math.random() * USERS.length)],
        // color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        color: `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`,
      };
    }
  }
  return grid;
};
const getDefaultGrid = () => {
  // const grid = createDefaultGrid();
  const grid = JSON.parse(fs.readFileSync("./server/src/db/gridTwo.json", "utf-8").toString());
  return grid;
};
exports.getDefaultGrid = getDefaultGrid;
