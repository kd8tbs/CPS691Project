﻿namespace CPS691BlazorApp.Models
{
    public class Field
    {
        public readonly List<Ball> Balls = new List<Ball>();
        public double Width { get; private set; }
        public double Height { get; private set; }
        public double Speed { get; private set; }

        public void Resize(double width, double height) =>
            (Width, Height) = (width, height);

        public void StepForward()
        {
            foreach (Ball ball in Balls)
                ball.StepForward(Width, Height);
        }

        private double RandomVelocity(Random rand, double min, double max)
        {
            double v = min + (max - min) * rand.NextDouble();
            if (rand.NextDouble() > .5)
                v *= -1;
            return v;
        }

        public void AddRandomBalls(int count = 10, double speed = 5)
        {
            double minSpeed = speed;
            double maxSpeed = speed;
            double radius = 10;
            Random rand = new Random();

            for (int i = 0; i < count; i++)
            {
                Balls.Add(
                    new Ball(
                        x: Width * rand.NextDouble(),
                        y: Height * rand.NextDouble(),
                        xVel: RandomVelocity(rand, minSpeed, maxSpeed),
                        yVel: RandomVelocity(rand, minSpeed, maxSpeed),
                        radius: radius,
                        color: "#0000FF"
                    )
                );
            }
        }        
    }
}
