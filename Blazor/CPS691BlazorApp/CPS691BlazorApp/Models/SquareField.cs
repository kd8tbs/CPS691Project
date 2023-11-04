﻿namespace CPS691BlazorApp.Models
{
    public class SquareField
    {
        public readonly List<Square> Squares = new List<Square>();
        public double Width { get; private set; }
        public double Height { get; private set; }

        public void Resize(double width, double height) =>
            (Width, Height) = (width, height);

        public void StepForward()
        {
            foreach (Square square in Squares)
                square.StepForward(Width, Height);
        }        

        public void AddRandomSquares(int count = 10)
        {
            Random rand = new Random();

            for (int i = 0; i < count; i++)
            {
                Squares.Add(
                    new Square(
                        x: Width * rand.NextDouble(),
                        y: Height * rand.NextDouble(),
                        color: "#0000FF",
                        opacity: 1
                    )
                );
            }
        }
    }
}
