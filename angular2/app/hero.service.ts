import {Injectable} from 'angular2/core';
import {HEROES} from './mock-heroes'
import {Hero} from './hero'

// The HeroService doesn't have any dependencies at the moment.
// Add the decorator anyway. It is a "best practice" to apply the @Injectable()
// decorator ​from the start​ both for consistency and for future-proofing.
@Injectable()

export class HeroService {
  getHeroes() {
    return Promise.resolve(HEROES)
  }

  getHeroesSlowly() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(() => resolve(HEROES), 2000)
    );
  }
}
