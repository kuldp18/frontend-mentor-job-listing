import { renderListing } from './dom.js';

const getJobData = async () => {
  try {
    const res = await fetch('../data.json');
    const jobs = await res.json();
    console.log(jobs);

    jobs.forEach((job) => {
      renderListing(job, job.new, job.featured);
    });
  } catch (error) {
    console.log(error);
  }
};
getJobData();
