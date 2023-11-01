"use client";
import { KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import DashNav from "@/components/DashNav";
import Sidebar from "@/components/Sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getUser } from "@/redux/reducers/userReducers";
import { setLogin } from "@/redux/reducers/authReducers";
import DashDrawer from "@/components/DashDrawer";

const Dash = ({ children }: { children: React.ReactNode }) => {
  const [collapse, setCollapse] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducers);

  useEffect(() => {
    dispatch(getUser());
    if (user) {

      setLogin({ loggedin: true });
    }
  }, [user, dispatch]);

    const [open, setOpen] = useState(false);
    const toggleDrawer =
      (inOpen: boolean) => (event: KeyboardEvent | MouseEvent) => {
        if (
          event.type === "keydown" &&
          ((event as KeyboardEvent).key === "Tab" ||
            (event as KeyboardEvent).key === "Shift")
        ) {
          return;
        }

        setOpen(inOpen);
      };
  return (
    <section className="flex relative w-[60rem]">
      <aside
        className={` ${
          collapse ? "w-0" : "w-80"
        } aside h-screen overflow-x-hidden transition-all ease-in-out duration-500 max-lg:hidden`}
      >
        <Sidebar state={{ collapse, setCollapse }} />
      </aside>

      <aside className="lg:hidden">
        <DashDrawer open={open} toggleDrawer={toggleDrawer} />
      </aside>

      <div className="min-h-screen flex  flex-col    bg-slate-100 pb-5 flex-1   overflow-y-auto">
        <DashNav state={{ collapse, setCollapse, toggleDrawer }} />

        {children}
      </div>
    </section>
  );
};

export default Dash;
