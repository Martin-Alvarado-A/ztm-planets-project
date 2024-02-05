const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

const isHabitablePlanet = (planet) => {
  const planetConfirmed = planet['koi_disposition'] === 'CONFIRMED';
  const solarFlux = planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11;
  const planetRadii = planet['koi_prad'] < 1.6;

  return planetConfirmed && solarFlux && planetRadii;
};

fs.createReadStream('kepler_data.csv')
  .pipe(
    parse({
      comment: '#',
      columns: true,
    })
  )
  .on('data', (data) => {
    if (isHabitablePlanet(data)) habitablePlanets.push(data);
  })
  .on('error', (err) => {
    console.log(`🔎 | index | error | ERROR:`, err);
  })
  .on('end', () => {
    console.log(
      `🔎 | index | end | ${habitablePlanets.length} habitable planets found!`
    );
  });
