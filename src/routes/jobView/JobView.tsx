import { useState } from "react";
import JobViewList from "./JobViewList";
import SingleJobView from "./SingleJobView";

export enum ViewType {
  ALL_JOBS = 'allJobs',
  SINGLE_JOB = 'singleJob',
}


const JobView = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.ALL_JOBS)
  const [jobId, setJobId] = useState<string>('')

  const ViewRenderer = ({ viewType }: { viewType: string }) => {
    switch (viewType) {
      case ViewType.ALL_JOBS:
        return <JobViewList setID={setJobId} action={setCurrentView}  />;
      case ViewType.SINGLE_JOB:
        return <SingleJobView ID={jobId}  action={setCurrentView}/>;
      default:
        return <JobViewList setID={setJobId} action={setCurrentView}/>; // Fallback for unknown views
    }
  };
  return (
    <div className='h-full w-full lg:w-screen flex flex-col lg:flex-row items-start lg:gap-20 gap-5 py-10 lg:px-8 px-5 '>
          {/* ASIDE AREA */}
          <div className="lg:w-[350px] w-full flex flex-col gap-10 bg-black text-white p-5 rounded-md">
            <p>
            We are always seeking talented people. In case you cannot find your desired position here,
            please send us your LinkedIn profile and give us your contact information.
            We will be in touch. 
            </p>
  
            <h1 className="w-max p-2 underline text-primary px-4">
              Careers@amelsusan.com
            </h1>
          </div>

          <ViewRenderer viewType={currentView} />
   </div>
  )
}

export default JobView;