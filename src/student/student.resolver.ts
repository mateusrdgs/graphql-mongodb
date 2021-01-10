import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateStudentInput } from './student.input';

import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private service: StudentService) {}

  @Query(() => [StudentType])
  async students() {
    return this.service.getStudents();
  }

  @Query(() => StudentType)
  async student(@Args('id') id: string) {
    return this.service.getStudent(id);
  }

  @Mutation(() => StudentType)
  async createStudent(@Args('input') input: CreateStudentInput) {
    return this.service.create(input);
  }
}
