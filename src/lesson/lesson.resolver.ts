import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';

import { LessonType } from './lesson.type';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  @Query(() => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
  }

  @Query(() => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Mutation(() => LessonType)
  createLesson(@Args('input') input: CreateLessonInput) {
    return this.lessonService.createLesson(input);
  }
}
