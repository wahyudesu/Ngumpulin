import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabDemo() {
  return (
    <Tabs defaultValue="tab-1" orientation="vertical" className="flex w-full gap-2">
      <TabsList className="flex-col gap-1 bg-transparent py-0">
        <TabsTrigger
          value="tab-1"
          className="w-full justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="tab-2"
          className="w-full justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none"
        >
          Projects
        </TabsTrigger>
        <TabsTrigger
          value="tab-3"
          className="w-full justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none"
        >
          Packages
        </TabsTrigger>
      </TabsList>
      <div className="grow rounded-lg border border-border text-start">
        <TabsContent value="tab-1">
          <p className="px-4 py-1.5 text-xs text-muted-foreground">Content for Tab 1</p>
        </TabsContent>
        <TabsContent value="tab-2">
          <p className="px-4 py-1.5 text-xs text-muted-foreground">Content for Tab 2</p>
        </TabsContent>
        <TabsContent value="tab-3">
          <p className="px-4 py-1.5 text-xs text-muted-foreground">Content for Tab 3</p>
        </TabsContent>
      </div>
    </Tabs>
  );
}
