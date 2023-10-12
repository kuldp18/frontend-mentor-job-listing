import { renderListing, renderFilter } from './dom.js';

let tagArr = [];

const renderJobs = async () => {
  try {
    const res = await fetch('../data.json');
    const jobs = await res.json();

    jobs.forEach((job) => {
      renderListing(job, job.new, job.featured);
    });
  } catch (error) {
    console.log(error);
  }
};

renderJobs();

// storing and rendering tags or filters
document.querySelector('#container').addEventListener('click', (e) => {
  if (e.target.classList.contains('tag')) {
    if (!tagArr.includes(e.target.innerText)) {
      tagArr.push(e.target.innerText);
      renderFilter(e.target.innerText);
    }
    console.log(tagArr);
  }
});
