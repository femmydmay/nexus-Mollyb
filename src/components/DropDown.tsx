'use client'
import * as React from "react";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "@/hooks";
import { emptyUser } from "@/redux/reducers/userReducers";

export default function BasicMenu() {
  const router = useRouter();
    const dispatch = useAppDispatch();
    const logout = async () => {
      try {
        const response = await axios.post("/api/logout", {});
        if (response.status === 200) {
          toast.success('logged out')
                 dispatch(emptyUser());
             setTimeout(() => (window.location.href = "/"), 500);
        }
      } catch (error) {
   
      }
    };
  return (
    <Dropdown>
      <MenuButton>Dashboard</MenuButton>
      <Menu>
        <MenuItem>
          <Link href="/dashboard/profile">Profile</Link>
        </MenuItem>
        <MenuItem>
        
          <Link href="/dashboard">My account</Link>
        </MenuItem>
        <MenuItem><button onClick={logout}>Logout</button></MenuItem>
      </Menu>
    </Dropdown>
  );
}