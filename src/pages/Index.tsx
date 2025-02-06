import { useState } from "react";
import { HealthDataCarousel } from "@/components/home/HealthDataCarousel";
import { DateNavigation } from "@/components/home/DateNavigation";
import { ProgressTracker } from "@/components/home/ProgressTracker";
import { TabNavigation } from "@/components/home/TabNavigation";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'tasks' | 'goals' | 'projects'>('tasks');

  console.log('Home page rendered with date:', selectedDate, 'and tab:', activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-background p-4 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">AI To-Do Agent</h1>
      
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
      
      {/* Content area will be implemented in the next iteration */}
      <div className="flex-1 rounded-lg border border-border p-4">
        <p className="text-muted-foreground">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content will be displayed here
        </p>
      </div>
    </div>
  );
};

export default Index;