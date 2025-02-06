import { useState } from "react";
import { Task, TaskGroup } from "@/types/task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Plus, X, FolderPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState<string>("NO_GROUP");
  const [newGroupName, setNewGroupName] = useState("");
  const [showNewGroupInput, setShowNewGroupInput] = useState(false);

  console.log('Rendering TaskList with tasks:', tasks, 'and groups:', taskGroups);

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTaskTitle,
      completed: false,
      dueDate: new Date(),
      groupId: selectedGroupId === "NO_GROUP" ? undefined : selectedGroupId,
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const addGroup = () => {
    if (!newGroupName.trim()) return;

    const newGroup: TaskGroup = {
      id: crypto.randomUUID(),
      name: newGroupName,
      tasks: [],
    };

    setTaskGroups([...taskGroups, newGroup]);
    setNewGroupName("");
    setShowNewGroupInput(false);
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getTasksByGroup = () => {
    const ungroupedTasks = tasks.filter(task => !task.groupId);
    const groupedTasks = taskGroups.map(group => ({
      group,
      tasks: tasks.filter(task => task.groupId === group.id),
    }));

    return { ungroupedTasks, groupedTasks };
  };

  const { ungroupedTasks, groupedTasks } = getTasksByGroup();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add a new task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <Select value={selectedGroupId} onValueChange={setSelectedGroupId}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NO_GROUP">No group</SelectItem>
                {taskGroups.map(group => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addTask}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {showNewGroupInput ? (
              <>
                <Input
                  placeholder="New group name..."
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addGroup()}
                />
                <Button onClick={addGroup}>Add Group</Button>
                <Button variant="ghost" onClick={() => setShowNewGroupInput(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setShowNewGroupInput(true)}>
                <FolderPlus className="h-4 w-4 mr-2" />
                New Group
              </Button>
            )}
          </div>

          <div className="space-y-6">
            {/* Ungrouped tasks */}
            {ungroupedTasks.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Ungrouped Tasks</h3>
                {ungroupedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-2 rounded-lg border"
                  >
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleTask(task.id)}
                      >
                        <Check className={`h-4 w-4 ${task.completed ? 'text-green-500' : 'text-gray-300'}`} />
                      </Button>
                      <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                        {task.title}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTask(task.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Grouped tasks */}
            {groupedTasks.map(({ group, tasks }) => (
              <div key={group.id} className="space-y-2">
                <h3 className="text-sm font-medium">{group.name}</h3>
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-2 rounded-lg border"
                  >
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleTask(task.id)}
                      >
                        <Check className={`h-4 w-4 ${task.completed ? 'text-green-500' : 'text-gray-300'}`} />
                      </Button>
                      <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                        {task.title}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTask(task.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};