import {
  renderListing,
  renderFilter,
  renderFilterList,
  fetchAllJobs,
  renderAllJobs,
} from './dom.js';

let tagArr = [];

let jobs = await fetchAllJobs();

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

      // filter  jobs
      jobs = jobs.filter((job) =>
        getTagsList(job).includes(e.target.innerText)
      );

      // re-render new jobs
      renderAllJobs(jobs);
    }
  }
});

// delete and clear all filters (clear button)
document.querySelector('.clear').addEventListener('click', async (e) => {
  let parent = document.querySelector('.filters');
  if (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  // fetch all jobs
  jobs = await fetchAllJobs();
  // re render all jobs
  renderAllJobs(jobs);

  tagArr = [];
  document.querySelector('#filtersContainer').style.display = 'none';
});

// delete one specific filter
document.querySelector('.filters').addEventListener('click', (e) => {
  if (
    e.target.classList.contains('remove') ||
    e.target.classList.contains('cross')
  ) {
    let closest = e.target.previousElementSibling;
    tagArr = tagArr.filter((tag) => tag !== closest.innerText);
    if (tagArr.length === 0) {
      document.querySelector('#filtersContainer').style.display = 'none';
    }
    renderFilterList(tagArr);
  }
});

function isSubset(array1, array2) {
  return array1.every((item) => array2.includes(item));
}

const getTagsList = (job) => {
  return [job.role, job.level, ...job.languages, ...job.tools];
};
