//리팩토링 전
// double getValueForPeriod(int periodNumber) {
//     try {
//         return values[periodNumber];
//     } catch(ArrayIndexOutOfBoundsException e) {
//         return 0;
//     }
// }

//리팩토링 후

// doublie getValueForPeriod(int periodumber) {
//     return (periodNumber >= values.length) ? 0 : values[periodNumber];
// }
