import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, subDays } from "date-fns";

interface DateNavigationProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const DateNavigation = ({ selectedDate, onDateChange }: DateNavigationProps) => {
  console.log('Rendering date navigation with date:', selectedDate);

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onDateChange(subDays(selectedDate, 1))}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <div className="text-lg font-medium text-foreground min-w-[120px] text-center">
        {format(selectedDate, 'MMM d, yyyy')}
      </div>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onDateChange(addDays(selectedDate, 1))}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};