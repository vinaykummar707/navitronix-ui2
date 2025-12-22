import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useTabsStore from '@/stores/useTabsStore' // <-- added

const tabs = [
  { name: 'Front Board', value: '41' },
  { name: 'Side Board', value: '42' },
  { name: 'Rear Board', value: '43' },
  { name: 'Internal Board', value: '44' }
]

const TabsSoftPillsDemo = () => {
  // Zustand state
  const { selectedTab, setSelectedTab } = useTabsStore();

  return (
    <div className='w-full max-w-md'>
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className='gap-4'
      >
        <TabsList className='bg-sidebar rounded-none h-11  p-0'>
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className='bg-sidebar data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none'
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}

export default TabsSoftPillsDemo