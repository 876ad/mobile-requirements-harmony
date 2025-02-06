import { Progress } from "@/components/ui/progress";

export const ProgressTracker = () => {
  // Mock progress data - will be connected to real data in future iterations
  const progress = {
    tasks: 75,
    goals: 60,
    projects: 45,
  };

  console.log('Rendering progress tracker with values:', progress);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-foreground mb-2">Overall Progress</h2>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-muted-foreground">Tasks</span>
            <span className="text-sm text-muted-foreground">{progress.tasks}%</span>
          </div>
          <Progress value={progress.tasks} />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-muted-foreground">Goals</span>
            <span className="text-sm text-muted-foreground">{progress.goals}%</span>
          </div>
          <Progress value={progress.goals} />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-muted-foreground">Projects</span>
            <span className="text-sm text-muted-foreground">{progress.projects}%</span>
          </div>
          <Progress value={progress.projects} />
        </div>
      </div>
    </div>
  );
};