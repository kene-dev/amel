import { useState } from 'react';
import JobList from './JobList';
import CreateJob from './CreateJob';
import SingleJob from './SingleJob';


export enum ViewType {
  ALL_JOBS = 'allJobs',
  POST_JOB = 'postJob',
  SINGLE_JOB = 'singleJob',
}


const Jobs = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.POST_JOB)
  const [jobId, setJobId] = useState<string>('')

  const ViewRenderer = ({ viewType }: { viewType: string }) => {
    switch (viewType) {
      case ViewType.ALL_JOBS:
        return <JobList setID={setJobId} action={setCurrentView}  />;
      case ViewType.POST_JOB:
        return <CreateJob action={setCurrentView} />;
      case ViewType.SINGLE_JOB:
        return <SingleJob ID={jobId}  action={setCurrentView}/>;
      default:
        return <JobList setID={setJobId} action={setCurrentView}/>; // Fallback for unknown views
    }
  };
  return (
    <div className='w-full h-screen flex items-start gap-8'>
       <ViewRenderer viewType={currentView} />
    </div>
  )
}

export default Jobs