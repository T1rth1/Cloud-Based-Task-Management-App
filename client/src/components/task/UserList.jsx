import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { summary } from "../../assets/data";
import clsx from "clsx";
import { getInitials } from "../../utils";
import { MdCheck } from "react-icons/md";
import react from "react";
import { useGetTeamListQuery } from "../../redux/api/userApiSlice";

const UserList = ({ setTeam, team}) => {
    const { data, isLoading } = useGetTeamListQuery(); // it is used to fetch all the users from the data base its name is GetTeamList but it fetch the all users..
    // console.log(data);
    const[selectedUsers,setSelectedUsers] = useState([]);
    // const data = summary?.users;
    const handleChange = (el) => {
      setSelectedUsers(el);
      setTeam(el?.map((u) => u._id));
    };
    // console.log("team from userlist",team);

  // const {data,isLoading} = useGetDashboardStatsQuery();
//  { console.log("data from userList",data)}
//  {console.log(selectedUsers)}
    useEffect(() => {
      // this useEffect is triggered when the page reload because we set the condition of empty array []..and in this useEffect
      // we check if the team legth == 0 then if data exist then set the state selectedUsers by the data[0]...
      // otherwise if the team length is not zero means > 1 then set the state array selectedUsers by that "team" array...
      // this team array passed from the AddTask.jsx file where this component is used...
      if (team?.length < 1) {
        data && setTeam([data[0]]); // this data is coming from above "getTeamListQUery" mutation
        data && setSelectedUsers([data[0]]); // also set the setSelectedUsers array as the first user in the data base..so this selectedUsers passed to 
        // the listbox to show the first by default selected user so that's why if we click on the add new task then this first user should select by default that's why
        // we update this state array "selectedUsers"
      } else {
        setSelectedUsers(team);
      }
    }, [isLoading]);
  return (
    <div>
    {/**  css for this all component are the same as headless UI provided just little bit change..as per my need */}
        <p className='text-gray-900'>Assign Task To:</p> {/* title of the field */}
        <Listbox  // this ListBox component come from the headless UI..
            value={selectedUsers} // value of this List is all users which is there inside the selctedUsers state array
            onChange={(el) => handleChange(el)} // onChange of this list we trigger the handleChange function..in which we set add the current selected user into the "selctedUsers state" array
            multiple // means multiple options(users) can be selected in this listBox..
        >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-3 pl-3 pr-10 px-3 text-left shadow-lg border border-gray-300 sm:text-md">
            <span className="block truncate">{selectedUsers?.map((user) => user.name).join(", ")}</span> {/* to show the all selected users separated by the comma(,)..so we map over the selctedUsers array..
            here also team.length < 1 for dummy data so it set the selectedUsers state array with the data[0] which is the first user..by default it show first user selected that's why */}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              /> {/* button for to show this is the list you can select the any many users from this */}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          > {/* transition to show when this list is opened */}
            <Listbox.Options className=" z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
             {/* this is the option when the list drop down menu is opened then inside that what should we want to show */}
              {data?.map((user, index) => (
                // we map over the users array and render the all users with it's icon and name...
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  } // this active useState is provided by the headless UI when the any option get selcted means set the active==true and for that we render the some differnt css like bg color and text-color..
                  value={user}
                >
                  {({ selected }) => (
                    // also this "selected" useState also provided by the headless UI..which is used to check the which element is selcted from the List..
                    // and when it selected we use differnt styles for that element(user)
                    <>
                      <div className={clsx("flex items-center gap-2 truncate",selected ? "font-medium" : "font-normal")}> {/* like wise here we check if the current user is selected from the list 
                      for this we use the selected state provided by the headless UI if selected then we 
                      make the font-medium and otherwise we make the font-normal */}
                        <div className="w-6 h-6 rounded-full text-white flex items-center justify-center bg-violet-600">
                          <span className="text-center text-[10px]">
                            {getInitials(user.name)} {/* render the ICON with the user's name first two letter */}
                          </span>
                        </div>
                        <span>{user?.name}</span> {/* user's name */}
                      </div>
                      {/* if user from the list is selcted then we render the <Mdcheck> icon other wise null..and this icon's color is amber-600 */}
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <MdCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
        </Listbox>
    </div>
  )
}

export default UserList