import { Button } from "@/components/ui/button";
import { CheckCircle, Target, Briefcase } from "lucide-react";

interface TabNavigationProps {
  activeTab: 'tasks' | 'goals' | 'projects';
  onTabChange: (tab: 'tasks' | 'goals' | 'projects') => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  console.log('Rendering tab navigation with active tab:', activeTab);

  const tabs = [
    { id: 'tasks' as const, label: 'Tasks', icon: CheckCircle },
    { id: 'goals' as const, label: 'Goals', icon: Target },
    { id: 'projects' as const, label: 'Projects', icon: Briefcase },
  ];

  return (
    <div className="flex justify-between gap-2">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "outline"}
          className="flex-1"
          onClick={() => onTabChange(tab.id)}
        >
          <tab.icon className="w-4 h-4 mr-2" />
          {tab.label}
        </Button>
      ))}
    </div>
  );
};