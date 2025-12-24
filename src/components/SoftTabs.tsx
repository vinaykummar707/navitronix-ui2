import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useTabsStore from '@/stores/useTabsStore' // <-- added

const tabs = [
  { name: 'Front Board', value: 'front' },
  { name: 'Side Board', value: 'side' },
  { name: 'Rear Board', value: 'rear' },
  { name: 'Internal Board', value: 'internal' }
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
        <TabsList className=' '>
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              
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