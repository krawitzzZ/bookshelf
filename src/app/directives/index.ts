import { PreventClickEventDirective } from './prevent-click-event/prevent-click-event.directive';
import { MinValueDirective, minValueValidator } from './min-value/min-value.directive';
import { MaxValueDirective, maxValueValidator } from './max-value/max-value.directive';
import { IsbnDirective, isbnValidator } from './isbn/isbn.directive';

export const DirectivesProvider = [
  PreventClickEventDirective,
  MinValueDirective,
  MaxValueDirective,
  IsbnDirective,
];

export {
  PreventClickEventDirective,
  MinValueDirective,
  minValueValidator,
  MaxValueDirective,
  maxValueValidator,
  IsbnDirective,
  isbnValidator,
};
