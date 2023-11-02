export class Square {
    //The x and y cordinates of the square
    public _x: number;
    public _y: number;
    //Information for a each square
    public _squareLength: number;
    public _color: string;
    //Inormation about the size of the Canvas
    public _canvasHeight: number;
    public _canvasWidth: number;
  
    constructor(x: number, y: number, length: number, color: string) {
      this._x = x;
      this._y = y;
      this._squareLength = length;
      this._color = color;
    }
  }
  