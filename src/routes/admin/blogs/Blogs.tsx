import { useState } from "react";
import CreateBlogs from "./CreateBlogs";
import BlogList from "./BlogList";
import SingleBlog from "./SingleBlog";


export enum ViewType {
    ALL_BLOGS = 'allblogs',
    CREATE_BLOG = 'createBlog',
    SINGLE_BLOG = 'singleBlog',
}
  
  const Blogs = () => {
    const [currentView, setCurrentView] = useState<ViewType>(ViewType.CREATE_BLOG)
    const [jobId, setJobId] = useState<string>('')
  
    const ViewRenderer = ({ viewType }: { viewType: string }) => {
      switch (viewType) {
        case ViewType.ALL_BLOGS:
          return <BlogList setID={setJobId} action={setCurrentView}  />;
        case ViewType.CREATE_BLOG:
          return <CreateBlogs action={setCurrentView} />;
        case ViewType.SINGLE_BLOG:
          return <SingleBlog ID={jobId}  action={setCurrentView}/>;
        default:
            return <BlogList setID={setJobId} action={setCurrentView}  />;
      }
    };
    return (
      <div className='w-full h-screen overflow-y-scroll flex items-start gap-8'>
         <ViewRenderer viewType={currentView} />
      </div>
    )
  }
  
export default Blogs