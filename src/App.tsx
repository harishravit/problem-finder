import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Header from "./components/ownui/Header";
import AvatarImg from "@/assets/Avatar_test.png"
import {EllipsisVertical} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const App=()=>{
  return(
    <main className="w-4/5 pt-3 h-screen mx-auto flex flex-col gap-y-6">
      <Header/>
      <section className="w-[90%] mx-auto h-11/12 rounded-4xl flex flex-col gap-y-2">
      <h3 className="text-xl font-bold tracking-tighter">Recommended</h3>
      <div className="content_holder">
        <div className="post max-w-xl text-balance leading-5.5 flex flex-col gap-y-1.5">
          <div className="post_header flex gap-x-2 items-center">
          <Avatar>
            <AvatarImage src={AvatarImg}/>
          </Avatar>
          <div className="header_Details flex flex-col gap-y-1 mt-0.5 " >
          <span className="user_name text-lg font-medium tracking-tight leading-3.5">Harish R</span>
          <span className="user_role text-sm leading-3.5">@software engineer</span>
          </div>
          <div className="post_options size-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <EllipsisVertical className="size-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer">
                  Report
                  <DropdownMenuShortcut></DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          </div>
          <div className="post_content">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint temporibus sit in minima enim perferendis vero omnis minus vel debitis.</p>
          </div>
        </div>
      </div>
      </section>
      <footer className="absolute bottom-10 h-15 w-60 px-2 overflow-hidden left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center border rounded-4xl border-neutral-200 bg-white">
        <div className="w-full flex items-center justify-around gap-x-3 ">
          <button className="cursor-pointer hover:bg-neutral-200/60 active:bg-neutral-200 px-4 py-2.5 w-1/2 text-center rounded-4xl" >
            Create
          </button>
          <button className="cursor-pointer hover:bg-neutral-200/60 active:bg-neutral-200 px-4 py-2.5 w-1/2 text-center rounded-4xl">
            Explore
          </button>
        </div>
      </footer>
    </main>
  )
}
export default App;