import React from 'react'
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

// concept remaining how it is select and from where this selected boolean state coming?
const Tabs = ({tabs,setSelected,children}) => {
    // we deperop the tabs ,setSelcted state function,
    // children will include any elements or components that you nest inside the Tabs component where i used in Tasks.jsx file...
return (
    <div className='w-full px-1 sm:px-0'>
        <Tab.Group>
            <Tab.List className="flex space-x-6 p-1 rounded-xl">
                {tabs.map((tab,index) => (
                    // here tabs has 2 element which has the Board View and List View and we run a loop
                    // on this tabs array..and render the <Tab> element provided by the headless UI..
                    // and also this <Tab> provided the {selected} state  which is different from one we pass as a prop in this Tabs.jsx file
                    // this selected state is handled by the headless UI..when it is true then we apply some css like make the text color blue and border color blue
                    // and based on this we also call the setSelected(index) component...so when user click on the boardview so it's index is
                    // zero so it make the selected=0 this component which is i created in the Tasks.jsx file differnt from the headless UI's selected component..
                    // when user selected listView then selected=1 this value of the selected state component updated in the Tasks.jsx file..
                    <Tab 
                        key={tab.title}
                        onClick={() => setSelected(index)}
                        className={({selected}) => clsx("w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 shadow-lg rounded-xl bg-white",
                        selected ? "text-blue-700 border-b-2 border-blue-600" : "text-gray-800 hover:text-blue-800")
                    }>
                        {tab.icon} {/* render the ICON and the title */}
                        <span>{tab.title}</span>
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels className="w-full mt-2">
                {children} {/* the whole component which is inside the <Tabs> component in the Tasks.jsx file */}
            </Tab.Panels>
        </Tab.Group>
    </div>
)
}

export default Tabs