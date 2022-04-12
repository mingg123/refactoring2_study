//리팩토링 전
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (aPlan.withinRange(low, high));

//리팩토링 후
if (aPlan.withinRange(aRoom.daysTempRange)) {
}
