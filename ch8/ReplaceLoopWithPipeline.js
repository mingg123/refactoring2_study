//리팩토링 전
const names = [];
for (const i of input) {
  if (i.job === 'programmer') names.push(i.names);
}
//리팩토링 후
const names = input.filter((i) => i.job === 'programmer').map((i) => i.name);

//리팩토링 전
function acquireData(input) {
  const lines = input.split('\n');
  let firstLine = true;
  const result = [];
  for (const line of lines) {
    if (firstLine) {
      firstLine = false;
      continue;
    }
    if (line.trim() === '') continue;
    const record = line.split(',');
    if (record[1].trim() === 'India') {
      result.push({ city: record[0].trim(), phone: record[2].trim() });
    }
  }
  return result;
}

//리팩토링 후
function acquireData(input) {
  const lines = input.split('\n');
  const result = lines
    .slice(1)
    .filter((line) => line.trim() !== '')
    .map((line) => line.split(','))
    .filter((record) => record[1].trim() === 'India')
    .map((record) => ({ ity: record[0].trim(), phone: record[2].trim() }));
  return result;
}
