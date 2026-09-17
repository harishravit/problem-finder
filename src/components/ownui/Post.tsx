const Post = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`max-w-xl p-1 flex gap-x-2 ${className}`}>{children}</div>
  );
};
export const PostHeader = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
export const PostContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[92%] h-auto  ">
      <p className="text-pretty leading-5.5 ">{children}</p>
    </div>
  );
};
export const PostFooter = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
export default Post;
