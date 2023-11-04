namespace CPS691BlazorApp.Models
{
    public class Square
    {
        public double X { get; private set; }
        public double Y { get; private set; }
        public string Color { get; private set; }
        public float Opacity { get; private set; }

        public Square(double x, double y, string color, float opacity)
        {
            (X, Y, Color, Opacity) = (x, y, color, opacity);
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
    }
}