// src/tunes.js
export const stranger_tune = `
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')

setcpm({$CPM})

drums: stack(
  s("bd").struct("[bd ~ ~ bd ~ bd ~ ~]").postgain(0.9),
  s("sd").struct("[~ ~ sd ~]*2").postgain(0.7).hpf(100),
  s("cp").struct("[~ ~ cp ~]*2").postgain(0.4).room(0.05), 
  s("hh").struct("[hh hh hh hh hh hh hh hh]").postgain(0.3).room(0.1).lpf(8000) 
).log()

bassline: note("[a1 ~ a1 g1 ~ c2 ~ c2] [f1 ~ f1 f1 ~ ~ ~ ~]")
  .sound("bass") 
  .lpf(500)     
  .room(0.1)
  .postgain(0.9).log()

melody: note("[~ ~ e4 ~ c4 ~ g4 ~] [~ ~ f4 ~ e4 ~ d4 ~]")
  .sound("pluck") 
  .adsr("0.01:0.1:0.3:0.2")
  .postgain(0.4)
  .delay(0.25)    
  .delaytime(0.75) 
  .room(0.3)
  .lpf(2000).log()

groove: stack(
  s("perc").struct("[~ ~ perc ~ ~ perc ~ perc]").postgain(0.3).lpf(3000),
  s("cb").struct("[~ cb ~ ~]*2").postgain(0.4).room(0.2).log()
)


all(x => x.gain({$VOLUME}).room(0.25))
`;
