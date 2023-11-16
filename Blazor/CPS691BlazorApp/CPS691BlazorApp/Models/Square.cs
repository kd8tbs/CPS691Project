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
        public float Speed { get; private set; }

        private float initialSize = 25;

        private bool isShrinking = true;

        public Square(double x, double y, string color, float opacity, double width, double height)
        {
            (X, Y, Color, Opacity, Width, Height) = (x, y, color, opacity, width, height);
        }

        public void StepForward(double width, double height, float speed)
        {
            Opacity -= .04f / speed;            

            if (Opacity <= 0)
            {
                Random rand = new Random();
                X = width * rand.NextDouble();
                Y = height * rand.NextDouble();
                Opacity = 1;
            }            
        }

        public void NextPulse(float speed)
        {
            if (Width <= initialSize)
            {
                isShrinking = false;
            }
            
            if (Width >= initialSize * 2)
            {
                isShrinking = true;
            }

            if (isShrinking)
            {
                Width -= 2f / speed;
                Height -= 2f / speed;
                Color = "#0000ff";                
            }
            else
            {
                Width += 2f / speed;
                Height += 2f / speed;
                Color = "#ff0000";
            }
        }
    }
}