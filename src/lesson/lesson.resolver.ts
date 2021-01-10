import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { StudentService } from 'src/student/student.service';
import { Lesson } from './lesson.entity';

import { CreateLessonInput, AssignStudentInput } from './lesson.input';
import { LessonService } from './lesson.service';

import { LessonType } from './lesson.type';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private service: LessonService,
    private studentService: StudentService,
  ) {}

  @Query(() => [LessonType])
  async lessons() {
    return this.service.getLessons();
  }

  @Query(() => LessonType)
  async lesson(@Args('id') id: string) {
    return this.service.getLesson(id);
  }

  @Mutation(() => LessonType)
  async createLesson(@Args('input') input: CreateLessonInput) {
    return this.service.createLesson(input);
  }

  @Mutation(() => LessonType)
  async assignStudent(@Args('input') input: AssignStudentInput) {
    return this.service.assignStudent(input);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getStudents(lesson.students);
  }
}
