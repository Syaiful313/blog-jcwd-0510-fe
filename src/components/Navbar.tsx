"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ToogleDarkMode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  const logout = () => {
    localStorage.removeItem("blog-storage");
    dispatch(logoutAction());
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/" className="font-serif text-2xl font-bold">
            BlogHub
          </Link>

          <div className="hidden cursor-pointer items-center gap-8 font-sans font-semibold md:flex">
            <Link href="/">Home</Link>
            <Link href="/">Profile</Link>

            {!user.id && <Link href="/login">Sign In</Link>}
            {!!user.id && (
              <>
                <p onClick={() => router.push("/write")}>Write</p>
                <p onClick={logout}>Logout</p>
              </>
            )}
            <ModeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/">Profile</Link>
                </DropdownMenuItem>
                {!user.id && (
                  <DropdownMenuItem>
                    <Link href="/login">Sign In</Link>
                  </DropdownMenuItem>
                )}
                {!!user.id && (
                  <>
                    <DropdownMenuItem>
                      <p onClick={() => router.push("/write")}>Write</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <p onClick={logout}>Logout</p>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
