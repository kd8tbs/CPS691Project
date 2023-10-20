export class Ball {
    //The x and y cordinates of the ball
    public _x: number;
    public _y: number;
    //The velocity of the x and y cordinates
    public _xVel: number;
    public _yVel: number;
    //Information for a each ball
    public _radius: number;
    public _color: string;
  
    constructor(x: number, y: number, xVel: number, yVel: number, radius: number, color: string) {
      this._x = x;
      this._y = y;
      this._xVel = xVel;
      this._yVel = yVel;
      this._radius = radius;
      this._color = color;
    }
  
    /**
     * This function dictates the movement of the balls. 
     * @param width - The Width of the canvas
     * @param height - The Height of the canvas
     */
    public stepForward(width: number, height: number) {
      this._x += this._xVel;
      this._y += this._yVel;
  
      //Change the direction of the velocity if the ball hits the left or right corners of the canvas
      if (this._x < 0 || this._x > width) {
        this._xVel *= -1;
      }
  
      //Change the direction of the velocity if the ball hits the top or bottom corners of the canvas
      if (this._y < 0 || this._y > height) {
        this._yVel *= -1;
      }
  
      this._x = Math.max(this._radius, Math.min(this._x, width - this._radius));
      this._y = Math.max(this._radius, Math.min(this._y, height - this._radius));
    }
  }
  