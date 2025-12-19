import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const tabs = [
  {
    name: 'Front Board',
    value: 'explore',
    
  },
  {
    name: 'Side Board',
    value: 'favorites',
   
  },
  {
    name: 'Rear Board',
    value: 'surprise',
    
  },
  {
    name: 'Internal Board',
    value: 'surprises',
    
  }
]

const TabsSoftPillsDemo = () => {
  return (
    <div className='w-full max-w-md'>
      <Tabs defaultValue='explore' className='gap-4'>
        <TabsList className='bg-background gap-1 border p-1' >
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className=' data-[state=active]:bg-primary/20 data-[state=active]:text-primary dark:data-[state=active]:text-primary dark:data-[state=active]:bg-primary/20 data-[state=active]:shadow-none dark:data-[state=active]:border-transparent'
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
