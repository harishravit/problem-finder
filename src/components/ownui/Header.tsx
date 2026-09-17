import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import AvtartTest from "@/assets/Avatar_test.png"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {User,LogOut,Bell} from "lucide-react"
const Header = () => {
    return (
        <header className="flex items-center justify-between bg-neutral-100 border border-neutral-300 shadow-xs px-6 py-3 rounded-4xl">
            <h1 className="text-2xl text-orange-600 font-bold tracking-tighter">ProblemHub</h1>
            <Input className="bg-white text-base outline-none w-xl px-4 py-3 rounded-4xl border border-neutral-200 placeholder:tracking-wider placeholder:text-neutral-400 placeholder:text-sm" type="search" placeholder="Search your problem statements..." />
            <div className="flex items-center gap-x-5">
                <div className="flex gap-x-2.5 items-center">
                    <span className="size-8 overflow-hidden relative">
                        <span className="absolute size-2.5 bg-red-500 rounded-full right-1.5 top-0"></span>
                            <Bell className="cursor-pointer size-7 mt-1" />
                    </span>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src={AvtartTest} alt="test_avtart" />
                                <AvatarFallback>HR</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="cursor-pointer"  align="end">
                            <DropdownMenuItem className="cursor-pointer">
                                Profile
                                <DropdownMenuShortcut><User /></DropdownMenuShortcut>
                            </DropdownMenuItem >
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" className="cursor-pointer ">
                                Sign out
                                <DropdownMenuShortcut ><LogOut className="text-destructive" /></DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
export default Header