import type { PostData } from "@/_test_data/Post.data";
import { postData } from "@/_test_data/Post.data";
import Header from "@/components/ownui/Header";
import Post, {
  PostContent,
  PostFooter,
  PostHeader,
} from "@/components/ownui/Post";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bookmark,
  EllipsisVertical,
  MessagesCircle,
  Share2,
} from "lucide-react";
// 1. Recursive Render Function for Post + Nested Comments
const RenderPostItem = ({
  post,
  depth = 0,
}: {
  post: PostData;
  depth?: number;
}) => {
  const hasChildren = post.children && post.children.length > 0;
  return (
    <div
      style={{ paddingLeft: ((depth * 32) / depth) * 1 }}
      className={`flex flex-col gap-y-2`}
    >
      <Post>
        <div className="relative thread_groups flex flex-col gap-y-0.5 w-full flex-1">
          {depth != 0 && (
            <div className="h-8 absolute -left-4 -mt-4 invisable_thread-straight w-full">
              <div className="absolute  bottom-0 right-4  w-4 h-8 rounded-es-full thread_horizantal border-b-2 border-b-gray-400"></div>
              <div className="absolute w-5 h-full -mt-0.5 rounded-b-full thread_horizantal border-l-2 border-l-gray-400"></div>
            </div>
          )}
          <div className="avatar">
            <Avatar>
              <AvatarImage src={post.userProfile as string} />
            </Avatar>
          </div>
          <div className="thread h-full w-full relative ">
            {hasChildren && (
              <div className="absolute  w-full left-4 h-full thread_vertical border-l-2 border-l-gray-400"></div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-1.5">
          <PostHeader>
            <div className="post_header relative overflow-hidden flex gap-x-2 items-center">
              <div className="header_Details flex flex-col gap-y-1.5 mt-0.5">
                <span className="user_name text-lg font-medium tracking-tight leading-3.5">
                  {post.userName}
                </span>
                <span className="user_role text-sm leading-3.5">
                  @{post.userRole}
                </span>
              </div>
              <div className="post_options size-8 absolute right-0 top-1.5">
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
          </PostHeader>
          <PostContent>{post.content}</PostContent>
          <PostFooter>
            <div className="[&_button]:cursor-pointer [&_button]:transition-colors w-full h-auto flex gap-x-6 ">
              <button className="group text-sm text-gray-700 hover:text-gray-950 flex gap-x-1 items-center">
                <MessagesCircle className="size-5 -mt-0.5" />
                Discuss
                <span className="group-hover:text-gray-950 font-medium text-base text-gray-800 ml-0.5">
                  {post.children ? post.children.length : 0}
                </span>
              </button>
              <button className="text-sm text-gray-700 hover:text-gray-950 flex gap-x-1 items-center">
                <Bookmark className="size-5 -mt-0.5" />
                Save
              </button>
              <button className="text-sm text-gray-700 hover:text-gray-950 flex gap-x-1 items-center">
                <Share2 className="size-5 -mt-0.5" />
                Share
              </button>
            </div>
          </PostFooter>
        </div>
      </Post>
      {post.children && post.children.length > 0 && (
        <div className="flex flex-col gap-y-2">
          {post.children.map((childPost: any, childIndex: number) => (
            <RenderPostItem
              key={childIndex}
              post={childPost}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
const App = () => {
  return (
    <main className="w-3/5 pt-3 h-screen mx-auto flex flex-col gap-y-6">
      <Header />
      <section className="w-[90%] mx-auto flex-1 overflow-hidden  flex flex-col gap-y-2">
        <h3 className="text-xl font-bold tracking-tighter">Recommended</h3>
        <div className="content_holder max-w-full overflow-y-auto pr-2 flex flex-col gap-y-4">
          {postData.length > 0 &&
            postData.map((post, index) => (
              <RenderPostItem key={index} post={post} depth={0} />
            ))}
        </div>
      </section>

      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 h-15 w-60 px-2 overflow-hidden flex items-center border rounded-4xl border-neutral-200 bg-white shadow-sm">
        <div className="w-full flex items-center justify-around gap-x-3">
          <button className="cursor-pointer hover:bg-neutral-200/60 active:bg-neutral-200 px-4 py-2.5 w-1/2 text-center rounded-4xl">
            Create
          </button>
          <button className="cursor-pointer hover:bg-neutral-200/60 active:bg-neutral-200 px-4 py-2.5 w-1/2 text-center rounded-4xl">
            Explore
          </button>
        </div>
      </footer>
    </main>
  );
};

export default App;
