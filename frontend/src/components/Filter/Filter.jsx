import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Filter = ({ setAddFilter }) => {
  const [filter, setFilter] = useState('');
  const [filterBy, setFilterBy] = useState('');





  // useEffect(() => {
  //   const fetchSessions = async () => {
  //     try {
  //       const response = await axios.get(filterApi, {
  //         headers: {
  //           Authorization: "Bearer " + token
  //         }
  //       });
  //       setData(response.data.data);
  //      // setFilteredSessions(response.data.data); 
  //     } catch (error) {
  //       console.error('Error fetching sessions:', error);
  //     }
  //   };

  //   fetchSessions();
  // }, [filterApi]);

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setFilter(filterValue);
    if (filterBy === '') {
      setAddFilter('');
    } else {
      setAddFilter(`?filter[${filterBy}]=${filterValue}`);
    }
  };

  const handleFilterByChange = (e) => {
    setFilterBy(e.target.value);
    if (e.target.value === '') {
      setAddFilter('');
    }
  };

  return (
    <div className="container my-4 p-4 bg-light rounded shadow">
      <div className="mb-3">
        <input
          type="text"
          placeholder={`Filter by ${filterBy}...`}
          value={filter}
          onChange={handleFilterChange}
          className="form-control"
        />
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value=""
          checked={filterBy === ''}
          onChange={handleFilterByChange}
        />
        <label className="form-check-label">All</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="name"
          checked={filterBy === 'name'}
          onChange={handleFilterByChange}
        />
        <label className="form-check-label">Name</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="id"
          checked={filterBy === 'id'}
          onChange={handleFilterByChange}
        />
        <label className="form-check-label">ID</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="createdAt"
          checked={filterBy === 'createdAt'}
          onChange={handleFilterByChange}
        />
        <label className="form-check-label">Created At</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="updatedAt"
          checked={filterBy === 'updatedAt'}
          onChange={handleFilterByChange}
        />
        <label className="form-check-label">Updated At</label>
      </div>
    </div>
  );
};

export default Filter;
