// useCourse.js
import { useState } from 'react';

export const useCourse = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return {
    selectedCourse,
    selectCourse: setSelectedCourse
  };
};
