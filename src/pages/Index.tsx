import { useState } from "react";
import { HealthDataCarousel } from "@/components/home/HealthDataCarousel";
import { DateNavigation } from "@/components/home/DateNavigation";
import { ProgressTracker } from "@/components/home/ProgressTracker";
import { TabNavigation } from "@/components/home/TabNavigation";
import { TaskList } from "@/components/tasks/TaskList";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'tasks' | 'goals' | 'projects'>('tasks');
  const { theme, setTheme } = useTheme();

  console.log('Home page rendered with date:', selectedDate, 'and tab:', activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-background p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">AI To-Do Agent</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="rounded-full"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
      
      <HealthDataCarousel />
      
      <DateNavigation 
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      
      <ProgressTracker />
      
      <TabNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      {activeTab === 'tasks' && <TaskList />}
      
      {(activeTab === 'goals' || activeTab === 'projects') && (
        <div className="flex-1 rounded-lg border border-border p-4">
          <p className="text-muted-foreground">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content will be displayed here
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;