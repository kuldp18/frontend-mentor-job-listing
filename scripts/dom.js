const renderListing = (jobData, isNew = false, isFeatured = false) => {
  const { company, logo, position, role, level, postedAt, contract, location } =
    jobData;
  const tags = [role, level, ...jobData.languages, ...jobData.tools];
  const range = document.createRange();
  const jobListing = range.createContextualFragment(`

    ${
      isNew && isFeatured
        ? '<div class="job-item new-listing">'
        : '<div class="job-item">'
    }

        <div class="job-about">
          <div class="logo">
            <img src="${logo}" alt="${company}" />
          </div>
          <div class="info">
            <div class="job-name">
              <span class="company">${company}</span>

              <div class="more-info">

                ${isNew ? '<span class="more-tag new-tag">New!</span>' : ''}
                ${
                  isFeatured
                    ? '<span class="more-tag featured-tag">Featured</span>'
                    : ''
                }
               
                
              </div>


            </div>
            <div class="position">
              <span>${position}</span>
            </div>
            <div class="details">
              <span>${postedAt}</span>
              <span>${contract}</span>
              <span>${location}</span>
            </div>
          </div>
        </div>
        <div class="job-tags">
        ${createTags(tags)}
        </div>
    </div>
  `);

  document.querySelector('#container').appendChild(jobListing);
};

const renderAllJobs = (jobs) => {
  // clear existing jobs
  let parent = document.querySelector('#container');
  for (let child of parent.children) {
    if (child.classList.contains('job-item')) {
      child.style.display = 'none';
    }
  }

  // render new jobs

  jobs.forEach((job) => {
    renderListing(job, job.new, job.featured);
  });
};

const createTags = (tags) => {
  let html = '';
  tags.forEach((value) => {
    html += `<div class="tag">${value}</div>`;
  });
  return html;
};

const renderFilter = (tag) => {
  const range = document.createRange();
  const filterElem = range.createContextualFragment(`
       <div class="filter">
            <div class="filter-name">${tag}</div>
            <div class="remove">
              <img src="./images/icon-remove.svg" alt="remove" class="cross" />
            </div>
        </div>
    `);

  document.querySelector('.filters').appendChild(filterElem);

  if (document.querySelector('#filtersContainer').style.display !== 'flex') {
    document.querySelector('#filtersContainer').style.display = 'flex';
  }
};

const renderFilterList = (filterArr) => {
  // clear existing filters
  let parent = document.querySelector('.filters');
  if (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  filterArr.forEach((tag) => {
    renderFilter(tag);
  });
};

const fetchAllJobs = async () => {
  try {
    const response = await fetch('../data.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {
  renderListing,
  renderFilter,
  renderFilterList,
  fetchAllJobs,
  renderAllJobs,
};
