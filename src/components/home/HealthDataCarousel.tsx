import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Heart, Moon } from "lucide-react";

export const HealthDataCarousel = () => {
  const healthMetrics = [
    {
      title: "Heart Rate",
      value: "72 BPM",
      icon: Heart,
      color: "text-red-500",
    },
    {
      title: "Sleep",
      value: "7h 30m",
      icon: Moon,
      color: "text-blue-500",
    },
    {
      title: "Activity",
      value: "8,432 steps",
      icon: Activity,
      color: "text-green-500",
    },
  ];

  console.log('Rendering health metrics carousel');

  return (
    <Carousel className="w-full max-w-xs mx-auto">
      <CarouselContent>
        {healthMetrics.map((metric, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <metric.icon className={`w-8 h-8 ${metric.color} mb-2`} />
                <h3 className="font-medium text-foreground">{metric.title}</h3>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};