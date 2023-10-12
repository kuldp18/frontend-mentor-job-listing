import { renderListing } from './dom.js';

const renderJobs = async () => {
  try {
    const res = await fetch('../data.json');
    const jobs = await res.json();

    jobs.forEach((job) => {
      renderListing(job, job.new, job.featured);
    });

    const tagElems = document.querySelectorAll('.tag');

    console.log(tagElems);
  } catch (error) {
    console.log(error);
  }
};

renderJobs();
