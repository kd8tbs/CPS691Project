namespace CPS691BlazorApp.Models
{
    public class Square
    {
        public double X { get; private set; }
        public double Y { get; private set; }
        public string Color { get; private set; }
        public float Opacity { get; private set; }

        private bool decreaseOpacity = true;

        public Square(double x, double y, string color, float opacity)
        {
            (X, Y, Color, Opacity) = (x, y, color, opacity);
        }

        public void StepForward()
        { 
            if (decreaseOpacity)
            {
                Opacity -= .05f;
            }
            else
            {
                Opacity += .05f;
            }

            if (Opacity <= 0)
            {
                decreaseOpacity = false;
            }
            else if (Opacity >= 1)
            {
                decreaseOpacity = true;
            }
        }
    }
}