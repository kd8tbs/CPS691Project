namespace CPS691BlazorApp.Models
{
    public class Square
    {
        public double X { get; private set; }
        public double Y { get; private set; }
        public string Color { get; private set; }
        public double Opacity { get; private set; }

        public Square(double x, double y, string color, double opacity)
        {
            (X, Y, Color, Opacity) = (x, y, color, opacity);
        }

        public void StepForward(double width, double height)
        {
            
        }
    }
}