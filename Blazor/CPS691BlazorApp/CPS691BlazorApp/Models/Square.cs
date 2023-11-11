namespace CPS691BlazorApp.Models
{
    public class Square
    {
        public double X { get; private set; }
        public double Y { get; private set; }
        public double Width { get; private set; }
        public double Height { get; private set; }
        public string Color { get; private set; }
        public float Opacity { get; private set; }

        private float initialSize = 20;

        private bool isShrinking = true;

        private int redInt = 16711425;

        private int blueInt = 255;

        public Square(double x, double y, string color, float opacity, double width, double height)
        {
            (X, Y, Color, Opacity, Width, Height) = (x, y, color, opacity, width, height);
        }

        public void StepForward(double width, double height)
        {
            Opacity -= .04f;            

            if (Opacity <= 0)
            {
                Random rand = new Random();
                X = width * rand.NextDouble();
                Y = height * rand.NextDouble();
                Opacity = 1;
            }            
        }

        public void NextPulse()
        {
            if (Width <= 0)
            {
                isShrinking = false;
            }
            
            if (Width >= initialSize)
            {
                isShrinking = true;
            }

            if (isShrinking)
            {
                Width -= 1f;
                Height -= 1f;
                Color = "#0000ff";                
            }
            else
            {
                Width += 1f;
                Height += 1f;
                Color = "#ff0000";
            }
        }
    }
}