//리팩토링 전
class Persion {
  get course() {
    return this._course;
  }
  set courses(aList) {
    this._course = aList;
  }
}
//리팩토링 후
class Persion {
  get course() {
    return this._course.slice();
  }
  addCourse(aCourse) {
    this._course.push(aCourse);
  }
  removeCourse(
    aCourse,
    fnIfAbsent = () => {
      throw new RangeError();
    },
  ) {
    const index = this._courses.indexOf(aCourse);
    if (index === -1) fnIfAbsent();
    else this._courses.splice(index, 1);
  }
}
